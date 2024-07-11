'use client'

import { SessionProvider } from 'next-auth/react'
import { MantineProvider } from '@mantine/core';
import { Session } from 'next-auth'
import { Notifications } from '@mantine/notifications';

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <MantineProvider>
      <Notifications />
      <SessionProvider session={session}>{children}</SessionProvider>
    </MantineProvider>
  )
}