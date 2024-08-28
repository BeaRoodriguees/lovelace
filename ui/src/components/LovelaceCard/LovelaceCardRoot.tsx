'use client';

import { Card } from '@mantine/core';
import classes from './LovelaceCardRoot.module.css';
import { ReactNode } from 'react';
import { CardType } from '@/lib/types';
import Link from 'next/link';

interface LovelaceCardRootProps {
  children: ReactNode;
  type: CardType;
  href?: string;
}

export default function LovelaceCardRoot({
  children,
  type,
  href,
}: LovelaceCardRootProps) {
  const prop = href
    ? {
        component: Link,
        href: href,
        'data-clickable': !!href,
      }
    : {};

  return (
    // @ts-expect-error : The error message says href is not a property of div. But
    // the root component of Card is changed to a <Link /> because of the component
    // prop. Typescript is just not able to see it.
    <Card
      {...prop}
      radius="md"
      className={classes.card}
      shadow="xs"
      data-type={type}
    >
      <div className={classes.inner}>{children}</div>
    </Card>
  );
}
