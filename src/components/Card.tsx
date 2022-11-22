import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';

import { DocumentUser } from '@/types/item';

type CardProps = {
  item: DocumentUser;
};

export default function Card({ item }: CardProps) {
  const router = useRouter();

  return (
    <div
      className='flex h-[295px] w-full min-w-[300px] flex-1 cursor-pointer flex-col rounded-lg bg-white p-7'
      onClick={() =>
        router.push(
          {
            pathname: `/users/detail/${item.id}`,
          },
          `/users/detail/${item.id}`
        )
      }
    >
      <div className='relative h-2/3 rounded-lg bg-gray-300'>
        <Image
          src={`data:image/png;base64,${item.path}`}
          alt={`${item.jenis_dokumen}_${item.verifikasi}`}
          layout='fill'
          objectFit='cover'
        />
        <div className='absolute bottom-3 left-3 flex h-8 items-center justify-between space-x-2 rounded-lg bg-white p-2'>
          <p className='text-xs'>{item.verifikasi}</p>
          <div
            className={`h-3 w-3 rounded-sm ${
              item.verifikasi === 'Terverifikasi'
                ? 'bg-green-500'
                : item.verifikasi === 'Tertolak'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
          />
        </div>
      </div>
      <div className='flex h-1/3 flex-col justify-end'>
        <h4>{item.jenis_dokumen}</h4>
        <div className='mt-2 flex justify-between'>
          <div className='flex items-center space-x-1'>
            <AiOutlineUser className='text-lg' />
            <p className='text-sm'>{item.pihak} Pihak</p>
          </div>
          <div className='flex items-center space-x-1'>
            <TiDocumentText className='text-lg' />
            <p className='text-sm'>{item.permohonan} Permohonan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
