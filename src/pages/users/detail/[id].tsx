import { useRouter } from 'next/router';
import * as React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { TiDocumentText } from 'react-icons/ti';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { Item } from '@/types/item';

const lastAccess = [
  {
    name: 'Shoppe Pay',
    date: '10/10/2022',
    time: '10:00',
  },
  {
    name: 'Investree',
    date: '10/10/2022',
    time: '10:00',
  },
  {
    name: 'Jenius',
    date: '10/10/2022',
    time: '10:00',
  },
  {
    name: 'Polsek Sukolilo',
    date: '10/10/2022',
    time: '10:00',
  },
];

export default withAuth(DetailPage, 'all');
function DetailPage() {
  const router = useRouter();
  const item: Item = JSON.parse(router.query.item as string);

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
          <div className='flex space-x-6'>
            <div className='flex h-[512px] w-2/3 flex-col justify-between overflow-clip rounded-lg bg-white'>
              <div className='h-[calc(66.66%-16px)] bg-gray-300'></div>
              <div className='flex flex-col space-y-4 p-7'>
                <h2>{item.name}</h2>
                <div className='flex items-center space-x-3'>
                  <div className='h-8 w-8 rounded-full bg-gray-300'></div>
                  <p className='text-xs'>Emerson Siphron</p>
                </div>
                <div className='mt-2 flex justify-between'>
                  <div className='flex items-center space-x-6'>
                    <div className='flex space-x-1'>
                      <AiOutlineUser className='text-lg' />
                      <p className='text-sm'>{item.totalApplication} Pihak</p>
                    </div>
                    <div className='flex space-x-1'>
                      <TiDocumentText className='text-lg' />
                      <p className='text-sm'>{item.totalRequest} Permohonan</p>
                    </div>
                  </div>
                  <div className='flex h-8 items-center justify-between space-x-2 rounded-lg bg-white p-2'>
                    <p className='text-xs'>{item.status}</p>
                    <div
                      className={`h-3 w-3 rounded-sm ${
                        item.status === 'Terverifikasi'
                          ? 'bg-green-500'
                          : item.status === 'Tertolak'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/3 space-y-6 self-start rounded-2xl bg-white p-7'>
              <div className='flex items-center justify-between'>
                <h4>Pihak Berakses Terakhir</h4>
                <p className='text-xs text-gray-400'>
                  {item.totalApplication} Pihak
                </p>
              </div>
              {lastAccess.map(({ name, date, time }, index) => (
                <div
                  key={`${name}${date}${time}`}
                  className='flex items-center space-x-4'
                >
                  <div className='flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs'>
                    {index + 1}
                  </div>
                  <div className='flex flex-1 items-center justify-between space-y-1'>
                    <p className='text-sm'>{name}</p>
                    <div className='text-end'>
                      <p className='text-xs text-gray-400'>{date}</p>
                      <p className='text-xs text-gray-400'>{time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-xl border border-transparent px-24 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
              >
                Pihak Lainnya
              </button>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-xl border border-transparent bg-primary-50 px-24 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
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
