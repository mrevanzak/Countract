import { LoadingOverlay, Modal } from '@mantine/core';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineUser } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { TiDocumentText } from 'react-icons/ti';
import { useQuery } from 'react-query';

import apiMock from '@/lib/axios-mock';
import { getISODatetoWIB } from '@/lib/date-time';
import logger from '@/lib/logger';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

import { DetailDocumentUser } from '@/types/item';

type AddDocumentAccessData = {
  email: string;
  doc_id: number;
};

type AddDocumentAccessAPIRes = {
  access: number;
  doc_id: number;
  doc_type: string;
  owner_id: number;
  recipient: number;
  sender: number;
};

export default withAuth(DetailPage, 'all');
function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, refetch } = useQuery<DetailDocumentUser, Error>(
    'detailDocumentUser',
    async () => {
      const { data } = await apiMock.get<DetailDocumentUser>(`/dokumen/${id}`);
      return data;
    }
  );

  const [opened, setOpened] = React.useState(false);
  const methods = useForm<AddDocumentAccessData>({
    defaultValues: {
      doc_id: Number(id),
    },
  });
  const { register, handleSubmit, reset } = methods;
  const onSubmit: SubmitHandler<AddDocumentAccessData> = (data) => {
    logger({ data }, 'detail/[id].tsx line 47');

    toast.promise(
      apiMock
        .post<AddDocumentAccessAPIRes>(`/dokumen/give_access`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          reset({
            doc_id: Number(id),
            email: '',
          });
          setOpened(false);
          refetch();
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        error: (err: AxiosError) => err.message,
        success: 'Sukses menambahkan akses dokumen',
      },
      {
        duration: 3000,
      }
    );
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='min-h-main mx-3 mt-3 space-y-6'>
          <BsArrowLeft
            className='cursor-pointer text-2xl'
            onClick={() => router.back()}
          />
          <div className='relative flex flex-col gap-6 lg:flex-row'>
            <LoadingOverlay visible={isLoading} overlayBlur={2} />
            <div className='flex h-[512px] w-full flex-initial flex-col justify-between overflow-clip rounded-lg bg-white lg:w-2/3'>
              <div className='relative h-[calc(66.66%-16px)] bg-gray-300'>
                <Image
                  src={`data:image/png;base64,${data?.path}`}
                  alt={`${data?.jenis_dokumen}_${data?.verifikasi}`}
                  fill
                />
              </div>
              <div className='flex flex-col space-y-4 p-7'>
                <h2>{data?.jenis_dokumen}</h2>
                <div className='mt-2 flex justify-between'>
                  <div className='flex items-center space-x-6'>
                    <div className='flex space-x-1'>
                      <AiOutlineUser className='text-lg' />
                      <p className='text-sm'>{data?.pihak} Pihak</p>
                    </div>
                    <div className='flex space-x-1'>
                      <TiDocumentText className='text-lg' />
                      <p className='text-sm'>{data?.permohonan} Permohonan</p>
                    </div>
                  </div>
                  <div className='flex h-8 items-center justify-between space-x-2 rounded-lg bg-white p-2'>
                    <p className='text-xs'>{data?.verifikasi}</p>
                    <div
                      className={`h-3 w-3 rounded-sm ${
                        data?.verifikasi === 'Terverifikasi'
                          ? 'bg-green-500'
                          : data?.verifikasi === 'Tertolak'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='min-w-[330px] flex-1 space-y-6 rounded-2xl bg-white p-7'>
              <div className='flex items-center justify-between'>
                <h4>Pihak Berakses Terakhir</h4>
                <p className='text-xs text-gray-400'>
                  {data?.pihak_berakses?.length ?? 0} Pihak
                </p>
              </div>
              {data?.pihak_berakses?.map(
                ({ nama_pengakses, tanggal }, index) => (
                  <div key={index} className='flex items-center space-x-4'>
                    <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs'>
                      {index + 1}
                    </div>
                    <div className='flex flex-1 items-center justify-between space-y-1'>
                      <p className='text-sm'>{nama_pengakses}</p>
                      <div className='text-end'>
                        <p className='text-xs text-gray-400'>
                          {getISODatetoWIB(tanggal).split(' ')[0]}
                        </p>
                        <p className='text-xs text-gray-400'>
                          {getISODatetoWIB(tanggal).split(' ')[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) ?? (
                <div className='flex items-center'>
                  <p className='text-sm'>Tidak ada pihak berakses</p>
                </div>
              )}
              <button
                type='button'
                onClick={() => setOpened(true)}
                className='inline-flex w-full justify-center rounded-xl border border-transparent bg-primary-50 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
              >
                Tambah Pihak
              </button>
            </div>
          </div>

          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            withCloseButton={false}
            size={736}
          >
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className='text-center'>Tambah Akses Dokumen</h4>
                <div className='space-y-5'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        id='email'
                        {...register('email')}
                        required
                        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-50 focus:ring-primary-50 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-5 flex space-x-5'>
                  <button
                    type='button'
                    className='inline-flex flex-1 justify-center rounded-xl border border-transparent px-24 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
                    onClick={() => setOpened(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='inline-flex flex-1 justify-center rounded-xl border border-transparent bg-primary-50 px-24 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
                  >
                    Tambah Akses
                  </button>
                </div>
              </form>
            </FormProvider>
          </Modal>
        </section>
        <Toaster />
      </main>
    </Layout>
  );
}
