'use client';

import { Card } from '@mantine/core';
import classes from './LovelaceCardRoot.module.css';
import { ReactNode } from 'react';
import { CardType } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface LovelaceCardRootProps {
  children: ReactNode;
  type: CardType;
  href?: string;
  clickable?: boolean;
}

export default function LovelaceCardRoot({
  children,
  type,
  href,
  clickable,
}: LovelaceCardRootProps) {
  const { push } = useRouter();
  return (
    <Card
      onClick={() => (href ? push(href) : null)}
      radius="md"
      className={classes.card}
      shadow="xs"
      data-type={type}
      data-clickable={clickable}
    >
      <div className={classes.inner}>{children}</div>
    </Card>
  );
}
