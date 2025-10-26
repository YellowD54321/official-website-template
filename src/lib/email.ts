import nodemailer from 'nodemailer';

// 郵件資料介面
export interface EmailData {
  from: string; // 寄件者信箱
  subject: string; // 郵件標題
  message: string; // 郵件內容
}

// 建立 nodemailer transporter
const createTransporter = () => {
  // 檢查必要的環境變數
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASSWORD
  ) {
    throw new Error('缺少必要的 SMTP 環境變數設定');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // 如果是 port 465 使用 SSL，587 使用 TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

/**
 * 發送聯絡表單郵件到公司信箱
 * @param emailData 郵件資料（寄件者信箱、標題、內容）
 * @returns Promise<void>
 */
export async function sendContactEmail(emailData: EmailData): Promise<void> {
  try {
    const transporter = createTransporter();
    const companyEmail = process.env.COMPANY_EMAIL;

    if (!companyEmail) {
      throw new Error('未設定公司信箱（COMPANY_EMAIL）');
    }

    // 郵件選項
    const mailOptions = {
      from: process.env.SMTP_USER, // 使用 SMTP 帳號作為寄件者
      to: companyEmail, // 收件者：公司信箱
      replyTo: emailData.from, // 回覆地址設為表單填寫者的信箱
      subject: `【聯絡表單】${emailData.subject}`,
      text: `來自：${emailData.from}\n\n${emailData.message}`,
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
    };

    // 發送郵件
    const info = await transporter.sendMail(mailOptions);
    console.log('郵件發送成功:', info.messageId);
  } catch (error) {
    console.error('郵件發送失敗:', error);
    throw new Error('郵件發送失敗，請稍後再試');
  }
}

/**
 * 驗證 SMTP 連線設定
 * @returns Promise<boolean>
 */
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('SMTP 連線測試成功');
    return true;
  } catch (error) {
    console.error('SMTP 連線測試失敗:', error);
    return false;
  }
}
