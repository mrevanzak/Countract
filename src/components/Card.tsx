import { useRouter } from 'next/router';
import * as React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { TiDocumentText } from 'react-icons/ti';

import { Item } from '@/types/item';

type CardProps = {
  item: Item;
  index: number;
};

export default function Card({ item, index }: CardProps) {
  const router = useRouter();
  return (
    <div
      className='flex h-[295px] w-[354px] cursor-pointer flex-col rounded-lg bg-white p-7'
      onClick={() =>
        router.push(
          {
            pathname: `/users/detail/${index}`,
            query: { item: JSON.stringify(item) },
          },
          `/users/detail/${index}`
        )
      }
    >
      <div className='relative h-2/3 rounded-lg bg-gray-300'>
        <div className='absolute bottom-3 left-3 flex h-8 items-center justify-between space-x-2 rounded-lg bg-white p-2'>
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
      <div className='flex h-1/3 flex-col justify-end'>
        <h4>{item.name}</h4>
        <div className='mt-2 flex justify-between'>
          <div className='flex items-center space-x-1'>
            <AiOutlineUser className='text-lg' />
            <p className='text-sm'>{item.totalApplication} Pihak</p>
          </div>
          <div className='flex items-center space-x-1'>
            <TiDocumentText className='text-lg' />
            <p className='text-sm'>{item.totalRequest} Permohonan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
