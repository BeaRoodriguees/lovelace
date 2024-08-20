'use client';

import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { Session } from 'next-auth';
import { Notifications } from '@mantine/notifications';

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        defaultGradient: {
          from: '#222c71',
          to: '#0c7f98',
          deg: 90,
        },
      }}
    >
      <Notifications />
      <SessionProvider session={session}>{children}</SessionProvider>
    </MantineProvider>
  );
}
