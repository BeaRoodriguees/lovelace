import { Text } from '@mantine/core';
import classes from './LovelaceCardSide.module.css';

interface LovelaceCardSideProps {
  label: string;
  text: string;
}
export default function LovelaceCardSide({
  label,
  text,
}: LovelaceCardSideProps) {
  return (
    <div className={classes.side}>
      <Text fz="sm" c="dimmed">
        {label}
      </Text>
      <Text fz="md" className={classes.text}>
        {text}
      </Text>
    </div>
  );
}
