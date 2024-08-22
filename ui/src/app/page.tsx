'use client';
import classes from './page.module.css';
import Image from 'next/image';
import { HomePageHero } from '@/components/misc/homepage-hero';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

export default function Home() {
  return (
    <main className={classes.container}>
      <Navbar status={NavbarStatus.HOME}></Navbar>
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
  );
}
