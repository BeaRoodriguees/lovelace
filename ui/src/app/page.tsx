'use client';
import classes from './page.module.css';
import Image from 'next/image';
import { HeroTitle } from '@/components/misc/HeroTitle';
import HeaderSimple from '@/components/navbar/HeaderSimple';

export default function Home() {
  return (
    <main className={classes.container}>
      <HeaderSimple></HeaderSimple>
      <Image
        className={classes.image}
        src="/adaBackground.png"
        alt="Ada Lovelace"
        width={653}
        height={854}
      ></Image>
      <div className={classes.content}>
        <HeroTitle></HeroTitle>
      </div>
    </main>
  );
}
