import { z } from 'zod';

// 聯絡表單資料驗證 schema
export const contactFormSchema = z.object({
  email: z.string().min(1, '請輸入電子郵件').email('請輸入有效的電子郵件格式'),
  subject: z.string().min(1, '請輸入標題').max(200, '標題不能超過 200 字元'),
  message: z.string().max(5000, '訊息內容不能超過 5000 字元'),
});

// 聯絡表單資料型別
export type ContactFormData = z.infer<typeof contactFormSchema>;

// API 回應型別
export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}
