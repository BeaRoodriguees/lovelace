import { Card } from '@mantine/core';
import classes from './LovelaceCardRoot.module.css';
import { ReactNode } from 'react';
import { CardType } from '@/lib/types';

interface LovelaceCardRootProps {
  children: ReactNode;
  type: CardType;
}

export default function LovelaceCardRoot({
  children,
  type,
}: LovelaceCardRootProps) {
  return (
    <Card radius="md" className={classes.card} shadow="xs" data-type={type}>
      <div className={classes.inner}>{children}</div>
    </Card>
  );
}
