import { AxiosError } from 'axios';
import Link from 'next/link';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import apiMock from '@/lib/axios-mock';
import logger from '@/lib/logger';

import ButtonWithLoading from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import useLoadingToast from '@/components/hooks/toasts/useLoadingToast';
import NextImage from '@/components/NextImage';

import useAuthStore from '@/store/useAuthStore';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

import { User } from '@/types/auth';

type LoginData = {
  email: string;
  password: string;
};

type LoginError = {
  message: string;
};

export default withAuth(LoginPage, 'auth');
function LoginPage() {
  const isLoading = useLoadingToast();

  //#region  //*=========== Store ===========
  const login = useAuthStore.useLogin();
  //#endregion  //*======== Store ===========

  //#region  //*============== Form
  const methods = useForm<LoginData>({
    mode: 'onTouched',
  });
  const { register, handleSubmit } = methods;
  //#endregion  //*============== Form

  //#region //*============== Form Submit
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    logger({ data }, 'login.tsx line 36');
    toast.promise(
      apiMock.post<User>(`/user/login`, data).then((res) => {
        logger({ res });
        const user = res.data;
        if (user) {
          login(user);
        }
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        error: (err: AxiosError<LoginError>) =>
          err.response?.data.message ?? 'Error tidak diketahui',
        success: 'Berhasil masuk',
      },
      {
        duration: 3000,
      }
    );

    return;
  };
  //#endregion //*============== Form Submit

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
            <h2 className='mt-6 text-5xl font-medium text-gray-900'>Masuk</h2>
            <p className='mt-2 text-sm text-gray-600'>
              Pengguna baru?{' '}
              <Link
                href='/auth/register'
                className='font-medium text-blue-400 hover:text-blue-300'
              >
                Buat akun baru
              </Link>
            </p>
          </div>

          <div className='mt-8 space-y-6'>
            <div className='mt-6'>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                        // type='email'
                        {...register('email', {
                          required: {
                            value: true,
                            message: `Email harap diisi`,
                          },
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: `Format email tidak valid`,
                          },
                        })}
                        autoComplete='email'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-50 focus:outline-none focus:ring-primary-50 sm:text-sm'
                      />
                    </div>
                    {/* <ErrorMessage
                      errors={errors.email}
                      name='email'
                      render={({ messages }) => 
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type} className='text-sm font-medium text-red-700'>{message}</p>
                        ))
                      }
                    /> */}
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
                        {...register('password', {
                          required: {
                            value: true,
                            message: `Email harap diisi`,
                          },
                        })}
                        type='password'
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-50 focus:outline-none focus:ring-primary-50 sm:text-sm'
                      />
                    </div>
                    {/* <ErrorMessage
                      errors={errors.password}
                      name='password'
                      render={({ message }) => {
                        logger(message)
                        return message && (
                          <p className='text-sm font-medium text-red-700'>{message}</p>
                        )
                      }}
                    /> */}
                  </div>

                  <div className='flex justify-end'>
                    <ButtonWithLoading
                      type='submit'
                      isLoading={isLoading}
                      className='flex w-1/2 justify-center rounded-md border border-transparent bg-primary-50 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
                    >
                      Masuk
                    </ButtonWithLoading>
                  </div>
                </form>
              </FormProvider>
              <Toaster />
            </div>

            <p className='text-xs text-gray-500'>
              Dilindungi dan bagian dari{' '}
              <span className='text-blue-400'>Privacy Policy</span> dan{' '}
              <span className='text-blue-400'>Terms of Service</span> Countract.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
