import { CardType } from '@/lib/types';
import { ElementType } from 'react';
import classes from './LovelaceCardStatus.module.css';

interface LovelaceCardStatusProps {
  icon?: ElementType;
  type: CardType;
}

export default function LovelaceCardStatus({
  icon: Icon,
  type,
}: LovelaceCardStatusProps) {
  return (
    <div data-type={type} className={classes.container}>
      {Icon ? (
        <Icon
          data-type={type}
          className={classes.icon}
          width={40}
          height={40}
        />
      ) : (
        ''
      )}
    </div>
  );
}
