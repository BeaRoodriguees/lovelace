import Link from 'next/link';
import { Button } from '@mantine/core';
import classes from './LovelaceCardAction.module.css';
import { ElementType } from 'react';
import { CardType } from '@/lib/types';

interface LoveLaceCardActionProps {
  icon: ElementType;
  href?: string;
  type: CardType;
}

export default function LovelaceCardAction({
  icon: Icon,
  href,
  type,
}: LoveLaceCardActionProps) {
  return (
    <Button
      component={Link}
      href={href ? href : '#'}
      variant="transparent"
      className={classes.action}
      p={2}
      data-type={type}
    >
      <Icon width={40} height={40} />
    </Button>
  );
}
