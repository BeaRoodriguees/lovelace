import { Button } from '@mantine/core';
import classes from './LovelaceCardAction.module.css';
import { ElementType } from 'react';
import { CardType } from '@/lib/types';

interface LoveLaceCardActionProps {
  icon: ElementType;
  type: CardType;
  actionFunc?: () => void;
  ariaLabel?: string;
}

export default function LovelaceCardAction({
  icon: Icon,
  type,
  actionFunc,
  ariaLabel,
}: LoveLaceCardActionProps) {
  return (
    <Button
      variant="transparent"
      className={classes.action}
      p={2}
      data-type={type}
      onClick={actionFunc}
      tabIndex={actionFunc ? 0 : -1}
      aria-label={ariaLabel ? ariaLabel : 'cosmetic icon'}
      aria-hidden={!actionFunc}
    >
      <Icon width={40} height={40} />
    </Button>
  );
}
