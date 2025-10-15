import React from 'react';

export default function Header() {
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
              className='text-gray-600 hover:text-gray-900 hover:bg-gray-50 inline-flex items-center justify-center p-2 rounded-md'
              aria-expanded='false'
            >
              <span className='sr-only'>打開主菜單</span>
              {/* 漢堡菜單圖標 */}
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
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
