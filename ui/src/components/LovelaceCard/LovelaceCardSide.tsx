import { Text } from '@mantine/core';
import classes from './LovelaceCardSide.module.css';

interface LovelaceCardSideProps {
  label: string;
  text: string;
  className: string;
}
export default function LovelaceCardSide({
  label,
  text,
  className,
}: LovelaceCardSideProps) {
  return (
    <div className={`${classes.side} ${className}`}>
      <Text fz="sm" className={classes.label}>
        {label}
      </Text>
      <Text fz="md" className={classes.text}>
        {text}
      </Text>
    </div>
  );
}
