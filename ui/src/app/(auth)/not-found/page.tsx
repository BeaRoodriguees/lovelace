'use client';
import { NotFound } from '@/components/error/not-found';
import classes from './page.module.css';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

export default function NotFoundPage() {
  return (
    <>
      <Navbar status={NavbarStatus.AUTH}></Navbar>
      <main className={classes.container}>
        <NotFound></NotFound>
      </main>
    </>
  );
}
