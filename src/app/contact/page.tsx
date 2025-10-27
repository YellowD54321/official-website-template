import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: '聯絡我們 | Contact Us',
  description:
    '有任何問題或建議嗎？歡迎透過聯絡表單與我們聯繫，我們會盡快回覆您。',
};

export default function ContactPage() {
  return (
    <main className='min-h-screen'>
      <div className='container mx-auto px-4 py-16 sm:py-24'>
        {/* 頁面標題區 */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4'>聯絡我們</h1>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
            有任何問題或建議嗎？歡迎透過以下表單與我們聯繫
            <br />
            我們會盡快回覆您的訊息
          </p>
        </div>

        {/* 聯絡資訊卡片 */}
        <div className='max-w-2xl mx-auto mb-12'>
          <div className='bg-black/30 rounded-xl border border-gray-800 p-8 hover:border-gray-700 transition-colors'>
            <div className='flex items-start gap-4'>
              <div className='flex-shrink-0'>
                <svg
                  className='w-6 h-6 text-blue-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
              </div>
              <div>
                <h2 className='text-lg font-semibold mb-1'>電子郵件</h2>
                <p className='text-gray-400'>
                  您也可以直接寄信至：
                  <a
                    href='mailto:123@gmail.com'
                    className='text-blue-500 hover:text-blue-400 hover:underline ml-1'
                  >
                    123@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 聯絡表單 */}
        <div className='bg-black/30 rounded-xl border border-gray-800 p-8 sm:p-12 max-w-2xl mx-auto'>
          <ContactForm />
        </div>

        {/* 額外資訊 */}
        <div className='text-center mt-12 text-sm text-gray-500'>
          <p>填寫表單即表示您同意我們的隱私政策</p>
          <p className='mt-1'>我們通常會在 1-2 個工作天內回覆</p>
        </div>
      </div>
    </main>
  );
}
