import * as React from 'react';
import { MdOutlineDashboard, MdOutlinePeople } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';

import UnstyledLink from '@/components/links/UnstyledLink';

import CountractLogo from '~/svg/logo.svg';

const links = [
  {
    href: '/',
    label: 'Dokumen Saya',
    icon: <MdOutlineDashboard className='text-xl' />,
  },
  {
    href: '/',
    label: 'Riwayat Akses',
    icon: <MdOutlinePeople className='text-xl' />,
  },
  {
    href: '/',
    label: 'Pengaturan',
    icon: <RiListSettingsLine className='text-xl' />,
  },
];

export default function NavbarItems() {
  return (
    <div className=''>
      <CountractLogo className='mb-14 h-11 w-52' />
      <ul className='space-y-4'>
        {links.map(({ href, label, icon }) => (
          <li key={`${href}${label}`} className=''>
            <UnstyledLink
              href={href}
              className='flex w-full items-center rounded-lg p-4 text-sm text-gray-500 hover:bg-gray-100 hover:text-black'
            >
              {icon}
              <span className='ml-5'>{label}</span>
            </UnstyledLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
