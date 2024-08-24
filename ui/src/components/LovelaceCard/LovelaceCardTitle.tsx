import { Text } from '@mantine/core';
import classes from './LovelaceCardTitle.module.css';

interface LovelaceCardTitleProps {
  text: string;
}
export default function LovelaceCardTitle({ text }: LovelaceCardTitleProps) {
  return (
    <Text fz="xl" className={classes.title} lineClamp={1}>
      {text}
    </Text>
  );
}
