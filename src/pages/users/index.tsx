import { Group, Header, Image, Modal, SimpleGrid } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import * as React from 'react';
import { FiSearch } from 'react-icons/fi';
import { GrClose, GrUpload } from 'react-icons/gr';

import Card from '@/components/Card';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { data } from '../../data/documents.data';

export default withAuth(HomePage, 'all');
function HomePage() {
  const [opened, setOpened] = React.useState(false);
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        alt={file.name}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className=''>
          <Header
            height={{ base: 150, md: 110 }}
            p='md'
            top={110}
            className='z-10 mSM:ml-64'
          >
            <div className='mx-3 flex h-full flex-col items-center justify-between mMD:flex-row'>
              <div className='w-full max-w-xs mXS:self-start mMD:self-auto'>
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
                className='inline-flex items-center justify-center self-stretch rounded-xl border border-transparent bg-primary-50 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-offset-2 mXS:self-end mXS:px-24 mMD:self-auto'
                onClick={() => setOpened(true)}
              >
                Tambah Dokumen
              </button>
            </div>
          </Header>
          <div className='mt-32 flex flex-wrap gap-8 mSM:mx-6'>
            {data.map((item, itemIdx) => (
              <Card item={item} index={itemIdx} key={itemIdx} />
            ))}
          </div>

          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            withCloseButton={false}
            size={736}
          >
            <h4 className='text-center'>Tambah Dokumen</h4>
            <div className='space-y-5'>
              <fieldset className='mt-6 space-y-2 bg-white'>
                <legend className='block text-sm font-medium text-gray-700'>
                  Jenis Dokumen
                </legend>
                <div className='mt-1 -space-y-px rounded-md shadow-sm'>
                  <label htmlFor='document' className='sr-only'>
                    document
                  </label>
                  <select
                    id='document'
                    name='document'
                    autoComplete='document-name'
                    className='relative block w-full rounded-md border-gray-300 bg-transparent focus:z-10 focus:border-primary-50 focus:ring-primary-50 sm:text-sm'
                  >
                    <option>Akta Kelahiran</option>
                    <option>Kartu Tanda Penduduk</option>
                    <option>Surat Izin Mengemudi</option>
                  </select>
                </div>
              </fieldset>
              <div className='space-y-2'>
                <label
                  htmlFor='document-number'
                  className='block text-sm font-medium text-gray-700'
                >
                  Nomor Dokumen
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='document-number'
                    id='document-number'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-50 focus:ring-primary-50 sm:text-sm'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <p className='text-sm'>Upload Dokumen</p>
                <p className='text-sm text-gray-400'>
                  Masukkan bukti online/screenshot dokumen
                </p>
                <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
                  <Group
                    position='center'
                    style={{ minHeight: 168, pointerEvents: 'none' }}
                  >
                    <Dropzone.Accept>
                      <GrUpload className='text-sm' />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <GrClose className='text-sm' />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <p className='text-xs'>
                        Arahkan file ke area ini, atau{' '}
                        <span className='text-blue-400'>cari dokumen</span>
                      </p>
                    </Dropzone.Idle>
                  </Group>
                </Dropzone>

                <SimpleGrid
                  cols={4}
                  breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                  mt={previews.length > 0 ? 'xl' : 0}
                >
                  {previews}
                </SimpleGrid>
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
