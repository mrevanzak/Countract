import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from '@mantine/core';
import * as React from 'react';
import { FiBell } from 'react-icons/fi';

import NavbarItems from '@/components/layout/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);
  // Put Header or Footer Here
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={
        <Navbar
          p='lg'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ base: 256 }}
          top={0}
          height='100vh'
          className='flex items-center justify-between'
        >
          <NavbarItems />
          {/* <UpgradePro className='w-full h-48'/> */}
        </Navbar>
      }
      header={
        <Header height={{ base: 110 }} p='md'>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                color={theme.colors.gray[6]}
                mr='xl'
              />
            </MediaQuery>
            <FiBell className='text-2xl' />
            <div className='ml-7 h-12 w-12 rounded-full bg-gray-300'></div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
