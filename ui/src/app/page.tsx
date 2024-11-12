'use client';
import { useSession } from 'next-auth/react';
import classes from './page.module.css';
import { HomePageHero } from '@/components/misc/homepage-hero';
import Navbar from '@/components/navbar/navbar';
import { NavbarStatus } from '@/lib/types';

export default function Home() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className={classes.container}>
      {user == undefined && <Navbar status={NavbarStatus.HOME} />}
      {user && <Navbar status={NavbarStatus.LOGGED} />}

      <main className={classes.wrapper}>
        <HomePageHero />
      </main>
    </div>
  );
}
