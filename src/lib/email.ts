import { Resend } from 'resend';

// 郵件資料介面
export interface EmailData {
  from: string; // 寄件者信箱
  subject: string; // 郵件標題
  message: string; // 郵件內容
}

// 建立 Resend 客戶端
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('缺少 RESEND_API_KEY 環境變數');
  }

  return new Resend(apiKey);
};

/**
 * 發送聯絡表單郵件到公司信箱
 * @param emailData 郵件資料（寄件者信箱、標題、內容）
 * @returns Promise<void>
 */
export async function sendContactEmail(emailData: EmailData): Promise<void> {
  try {
    const resend = getResendClient();
    const companyEmail = process.env.COMPANY_EMAIL;

    if (!companyEmail) {
      throw new Error('未設定公司信箱（COMPANY_EMAIL）');
    }

    // 使用 Resend 發送郵件
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend 預設的測試發件地址
      to: companyEmail, // 收件者：公司信箱
      replyTo: emailData.from, // 回覆地址設為表單填寫者的信箱
      subject: `【聯絡表單】${emailData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">聯絡表單訊息</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>來自：</strong> ${emailData.from}</p>
            <p style="margin: 5px 0;"><strong>主旨：</strong> ${emailData.subject}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #555; margin-top: 0;">訊息內容：</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${emailData.message}</p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            此郵件由網站聯絡表單自動發送
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API 錯誤:', error);
      throw new Error('郵件發送失敗，請稍後再試');
    }

    console.log('郵件發送成功:', data?.id);
  } catch (error) {
    console.error('郵件發送失敗:', error);
    throw new Error('郵件發送失敗，請稍後再試');
  }
}
