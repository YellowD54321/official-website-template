'use client';

import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo 區域 */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl font-bold text-gray-900'>Logo</h1>
          </div>

          {/* 導航菜單 */}
          <nav className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <a
                href='#'
                className='text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                首頁
              </a>
              <a
                href='#'
                className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                關於我們
              </a>
              <a
                href='#'
                className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                服務項目
              </a>
              <a
                href='#'
                className='text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                聯絡我們
              </a>
            </div>
          </nav>

          {/* 手機版菜單按鈕 */}
          <div className='md:hidden'>
            <button
              type='button'
              onClick={toggleMenu}
              className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 inline-flex items-center justify-center p-2 rounded-md transition-colors'
              aria-expanded={isMenuOpen}
            >
              <span className='sr-only'>
                {isMenuOpen ? '關閉主菜單' : '打開主菜單'}
              </span>
              {/* 漢堡菜單圖標 */}
              {!isMenuOpen ? (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 手機版導航菜單 */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-b-0'
        }`}
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <a
            href='#'
            className='text-gray-900 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors'
            onClick={toggleMenu}
          >
            首頁
          </a>
          <a
            href='#'
            className='text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors'
            onClick={toggleMenu}
          >
            關於我們
          </a>
          <a
            href='#'
            className='text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors'
            onClick={toggleMenu}
          >
            服務項目
          </a>
          <a
            href='#'
            className='text-gray-600 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors'
            onClick={toggleMenu}
          >
            聯絡我們
          </a>
        </div>
      </div>
    </header>
  );
}
