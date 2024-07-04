import { Button } from '@mantine/core';
import { Navbar } from '@/components/Navbar';

import classes from './page.module.css';
export default function Home() {
  return (
    <main className={classes.container}>
      <Navbar></Navbar>
      <div className={classes.content}>
        <h1>LOVELACE</h1>
        <Button variant="filled">Get started</Button>
      </div>
    </main>
  )
}