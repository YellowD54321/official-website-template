'use client';

import Image from 'next/image';
import Header from '../components/Header';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // 當 10% 的元素進入視窗時觸發
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className='font-sans min-h-screen'>
      <Header />
      <div>
        <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
          <section className='h-screen w-full flex flex-col gap-[32px] items-center justify-center'>
            <h2 className='text-4xl font-bold text-center sm:text-left'>
              歡迎來到我們的網站
            </h2>
            <p className='text-lg text-gray-600 text-center sm:text-left max-w-2xl'>
              這是一個使用 Next.js
              建立的官方網站範本。我們致力於提供優質的服務和解決方案。
            </p>
          </section>

          {/* 滾動觸發的圖片區塊 */}
          <div className='w-full py-20 px-8 sm:px-20'>
            <div
              ref={imageRef}
              className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className='text-3xl font-bold text-center mb-8'>
                我們的團隊
              </h2>
              <div className='relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden shadow-2xl'>
                <Image
                  src='/engineers.jpg'
                  alt='工程師團隊'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
                />
              </div>
            </div>
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
