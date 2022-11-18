import { Header, Modal } from '@mantine/core';
import * as React from 'react';
import { FiSearch } from 'react-icons/fi';

import Card from '@/components/Card';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { data } from '../data';

export default function HomePage() {
  const [opened, setOpened] = React.useState(false);
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className=''>
          <Header
            height={{ base: 110 }}
            p='md'
            top={110}
            className='z-10 ml-64'
          >
            <div
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className='ml-3 w-full max-w-lg lg:max-w-xs'>
                <label htmlFor='search' className='sr-only'>
                  Search
                </label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                    <FiSearch
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>
                  <input
                    id='search'
                    name='search'
                    className='block w-full rounded-md border border-gray-300 bg-white py-2 pr-9 leading-5 placeholder-gray-500 focus:border-primary-50 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-50 sm:text-sm'
                    placeholder='Search'
                    type='search'
                  />
                </div>
              </div>
              <button
                type='button'
                className='mr-3 inline-flex items-center rounded-xl border border-transparent bg-primary-50 px-24 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
                onClick={() => setOpened(true)}
              >
                Tambah Dokumen
              </button>
            </div>
          </Header>
          <div className='mx-6 mt-32 flex flex-wrap gap-8'>
            {data.map((item, itemIdx) => (
              <Card item={item} key={itemIdx} />
            ))}
          </div>

          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            withCloseButton={false}
            size={736}
          >
            <h4 className='text-center'>Tambah Dokumen</h4>

            <div className='flex space-x-5'>
              <button
                type='button'
                className='inline-flex flex-1 justify-center rounded-xl border border-transparent px-24 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
                onClick={() => setOpened(false)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='inline-flex flex-1 justify-center rounded-xl border border-transparent bg-primary-50 px-24 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2'
              >
                Tambah
              </button>
            </div>
          </Modal>
        </section>
      </main>
    </Layout>
  );
}
