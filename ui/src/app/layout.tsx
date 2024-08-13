// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import { authConfig } from '@/auth.config';
import { getServerSession } from 'next-auth';
import { Providers } from './providers';
export const metadata = {
  title: 'Lovelace',
  description: 'I have followed setup instructions carefully',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  return (
    <html lang="pt-br">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
