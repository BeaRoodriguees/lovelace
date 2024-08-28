import { ReactNode } from 'react';
import classes from './LovelaceCardContent.module.css';

interface LovelaceCardContentProps {
  children: ReactNode;
}

export default function LovelaceCardContent({
  children,
}: LovelaceCardContentProps) {
  return <div className={classes.content}>{children}</div>;
}
