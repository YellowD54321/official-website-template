'use client';

import { useState } from 'react';
import type { ContactFormData, ApiResponse } from '@/types/contact';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  // 處理輸入變更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除之前的錯誤訊息
    if (submitStatus.type === 'error') {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重複提交
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        // 成功：顯示成功訊息並清空表單
        setSubmitStatus({
          type: 'success',
          message: data.message,
        });
        setFormData({
          email: '',
          subject: '',
          message: '',
        });
      } else {
        // 失敗：顯示錯誤訊息
        setSubmitStatus({
          type: 'error',
          message: data.message || '發送失敗，請稍後再試',
        });
      }
    } catch (error) {
      console.error('提交表單錯誤:', error);
      setSubmitStatus({
        type: 'error',
        message: '網路錯誤，請稍後再試',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto space-y-6'>
      {/* 成功/錯誤訊息 */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg border ${
            submitStatus.type === 'success'
              ? 'bg-green-950/50 border-green-800 text-green-400'
              : 'bg-red-950/50 border-red-800 text-red-400'
          }`}
          role='alert'
        >
          <p className='font-medium'>
            {submitStatus.type === 'success' ? '✓ 發送成功' : '✗ 發送失敗'}
          </p>
          <p className='text-sm mt-1'>{submitStatus.message}</p>
        </div>
      )}

      {/* 電子郵件欄位 */}
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          您的電子郵件 <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='example@email.com'
          className='w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-gray-500'
          disabled={isSubmitting}
        />
      </div>

      {/* 標題欄位 */}
      <div>
        <label
          htmlFor='subject'
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          標題 <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder='請輸入標題'
          maxLength={200}
          className='w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-gray-500'
          disabled={isSubmitting}
        />
      </div>

      {/* 訊息內容欄位 */}
      <div>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-gray-300 mb-2'
        >
          訊息內容 <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
          placeholder='請輸入您的訊息內容...'
          rows={8}
          maxLength={5000}
          className='w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y text-white placeholder:text-gray-500'
          disabled={isSubmitting}
        />
        <p className='text-sm text-gray-500 mt-1'>
          {formData.message.length} / 5000 字元
        </p>
      </div>

      {/* 提交按鈕 */}
      <button
        type='submit'
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
          isSubmitting
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'
        }`}
      >
        {isSubmitting ? (
          <span className='flex items-center justify-center gap-2'>
            <svg
              className='animate-spin h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            發送中...
          </span>
        ) : (
          '發送訊息'
        )}
      </button>
    </form>
  );
}
