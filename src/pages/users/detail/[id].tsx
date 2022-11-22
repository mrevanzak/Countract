import { useRouter } from 'next/router';
import * as React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { TiDocumentText } from 'react-icons/ti';
import { useQuery } from 'react-query';

import apiMock from '@/lib/axios-mock';
import { getISODatetoWIB } from '@/lib/date-time';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { DetailDocumentUser } from '@/types/item';

export default withAuth(DetailPage, 'all');
function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery<DetailDocumentUser, Error>(
    'detailDocumentUser',
    async () => {
      const { data } = await apiMock.get(`/dokumen/${id}`);
      return data.data;
    }
  );

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
          <div className='flex flex-col gap-6 lg:flex-row'>
            <div className='flex h-[512px] w-full flex-initial flex-col justify-between overflow-clip rounded-lg bg-white lg:w-2/3'>
              <div className='h-[calc(66.66%-16px)] bg-gray-300'></div>
              <div className='flex flex-col space-y-4 p-7'>
                <h2>{data?.jenis_dokumen}</h2>
                <div className='flex items-center space-x-3'>
                  <div className='h-8 w-8 rounded-full bg-gray-300'></div>
                  <p className='text-xs'>Emerson Siphron</p>
                </div>
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
                  {data?.pihak_berakses.length} Pihak
                </p>
              </div>
              {data?.pihak_berakses.map(
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
              )}
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-xl border border-transparent py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
              >
                Pihak Lainnya
              </button>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-xl border border-transparent bg-primary-50 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
              >
                Tambah Pihak
              </button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
