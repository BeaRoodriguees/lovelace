'use client';

import { SessionProvider } from 'next-auth/react';
import {
  Button,
  createTheme,
  Input,
  MantineProvider,
  MultiSelect,
} from '@mantine/core';
import { Session } from 'next-auth';
import { Notifications } from '@mantine/notifications';
import classes from '@/app/custom.module.css';
import textInputClasses from '@/app/styles/input.module.css';
import multiSelectClasses from '@/app/styles/multiselect.module.css';

const theme = createTheme({
  defaultGradient: {
    from: '#222c71',
    to: '#0c7f98',
    deg: 90,
  },
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
    Input: Input.extend({
      classNames: textInputClasses,
    }),
    MultiSelect: MultiSelect.extend({
      classNames: multiSelectClasses,
    }),
  },
});

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications />
      <SessionProvider session={session}>{children}</SessionProvider>
    </MantineProvider>
  );
}
