import { NotFound } from '@/components/error/not-found';
import classes from './page.module.css';

export default function NotFoundPage() {
  return (
    <div className={classes.container}>
      <NotFound></NotFound>
    </div>
  );
}
