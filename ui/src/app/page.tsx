'use client';
import { useSession } from 'next-auth/react';
import classes from './page.module.css';
import Image from 'next/image';
import { HomePageHero } from '@/components/misc/homepage-hero';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

export default function Home() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <>
      {user == undefined && <Navbar status={NavbarStatus.HOME} />}
      {user && <Navbar status={NavbarStatus.LOGGED} />}

      <main className={classes.container}>
        <Image
          className={classes.image}
          src="/adaBackground.png"
          alt="Ada Lovelace"
          width={653}
          height={854}
        ></Image>
        <div className={classes.content}>
          <HomePageHero></HomePageHero>
        </div>
      </main>
    </>
  );
}
