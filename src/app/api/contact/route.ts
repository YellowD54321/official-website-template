import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/types/contact';
import { sendContactEmail } from '@/lib/email';
import { ZodError } from 'zod';

// Rate limiting 簡易實作（記錄 IP 和最後請求時間）
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 分鐘
const MAX_REQUESTS_PER_WINDOW = 3; // 每分鐘最多 3 次請求

/**
 * 檢查 rate limiting
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const requestTimes = rateLimitMap.get(identifier) || [];

  // 過濾掉超過時間窗口的請求記錄
  const recentRequests = requestTimes.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  // 如果最近的請求次數超過限制，返回 false
  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  // 記錄本次請求
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);

  return true;
}

/**
 * 取得客戶端 IP（用於 rate limiting）
 */
function getClientIdentifier(request: NextRequest): string {
  // 嘗試從各種 header 取得真實 IP
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // 如果都取不到，使用一個預設值（開發環境）
  return 'unknown';
}

/**
 * POST /api/contact
 * 處理聯絡表單提交
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting 檢查
    const clientId = getClientIdentifier(request);
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        {
          success: false,
          message: '請求過於頻繁，請稍後再試',
        },
        { status: 429 }
      );
    }

    // 解析請求資料
    const body = await request.json();

    // 使用 Zod 驗證資料
    const validatedData = contactFormSchema.parse(body);

    // 發送郵件
    await sendContactEmail({
      from: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    });

    // 回傳成功訊息
    return NextResponse.json(
      {
        success: true,
        message: '訊息已成功發送，我們會盡快回覆您！',
      },
      { status: 200 }
    );
  } catch (error) {
    // Zod 驗證錯誤
    if (error instanceof ZodError) {
      const firstError = error.errors[0];
      return NextResponse.json(
        {
          success: false,
          message: firstError.message,
          error: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    // 其他錯誤
    console.error('聯絡表單 API 錯誤:', error);

    return NextResponse.json(
      {
        success: false,
        message: '發送失敗，請稍後再試',
        error: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * 不允許 GET 請求
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}
