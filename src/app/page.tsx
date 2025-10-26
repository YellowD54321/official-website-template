'use client';

import Image from 'next/image';
import ServiceBlock from '@/components/home/ServiceBlock';

export default function Home() {
  return (
    <div className='font-sans min-h-screen'>
      <div>
        <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
          <section className='h-screen w-full flex flex-col gap-[32px] items-center justify-center'>
            <h2 className='text-4xl font-bold text-center sm:text-left'>
              專業廠房自動配電與智能控制解決方案
            </h2>
            <p className='text-lg text-gray-600 text-center sm:text-left max-w-2xl'>
              我們專注於提供完整的工業自動化系統，包含自動配電系統設計與安裝、智能控制系統整合、以及工廠能源管理方案。憑藉多年的產業經驗與專業技術，協助企業提升生產效率、降低營運成本，並確保用電安全與穩定性。
            </p>
          </section>

          {/* 滾動觸發的圖片區塊 */}
          <div className='w-full py-20 px-8 sm:px-20'>
            <ServiceBlock />
          </div>
        </main>
        <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              aria-hidden
              src='/file.svg'
              alt='File icon'
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              aria-hidden
              src='/window.svg'
              alt='Window icon'
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className='flex items-center gap-2 hover:underline hover:underline-offset-4'
            href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              aria-hidden
              src='/globe.svg'
              alt='Globe icon'
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </div>
  );
}
