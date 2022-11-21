import { Checkbox } from '@mantine/core';
import Link from 'next/link';
import * as React from 'react';

import NextImage from '@/components/NextImage';

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen'>
      <div className='relative hidden w-0 flex-1 lg:block'>
        <NextImage
          imgClassName='absolute inset-0 h-full w-full object-cover'
          src='/images/cover.png'
          alt=''
          width={900}
          height={720}
        />
      </div>
      <div className='flex w-1/2 flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <h2 className='mt-6 text-5xl font-medium text-gray-900'>
              Buat Akun
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Sudah mempunyai akun?{' '}
              <Link href='/auth/login'>
                <span className='font-medium text-blue-400 hover:text-blue-300'>
                  Masuk
                </span>
              </Link>
            </p>
          </div>

          <div className='mt-8 space-y-6'>
            <div className='mt-6'>
              <form action='#' method='POST' className='space-y-6'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Alamat Email
                  </label>
                  <div className='mt-1'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-50 focus:outline-none focus:ring-primary-50 sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    NIK
                  </label>
                  <div className='mt-1'>
                    <input
                      id='nik'
                      name='nik'
                      type='text'
                      required
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-50 focus:outline-none focus:ring-primary-50 sm:text-sm'
                    />
                  </div>
                </div>

                <div className='space-y-1'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>
                  <div className='mt-1'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-50 focus:outline-none focus:ring-primary-50 sm:text-sm'
                    />
                  </div>
                </div>

                <Checkbox
                  color='yellow'
                  label={
                    <p className='text-xs text-gray-500'>
                      Dengan menekan Buat Akun, saya menyetujui bahwa saya telah
                      membaca dan menerima{' '}
                      <span className='text-blue-400'>Privacy Policy</span> dan{' '}
                      <span className='text-blue-400'>Terms of Service</span>{' '}
                      Countract.
                    </p>
                  }
                />

                <button
                  type='submit'
                  className='flex w-full flex-1 justify-center rounded-md border border-transparent bg-primary-50 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
                >
                  Buat Akun
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
