'use client';

import { Button } from '@mantine/core';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';
import classes from './page.module.css';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import ProblemCard from '@/components/cards/problem-card';
import { Problem, ProblemStatus } from '@/lib/types';
import ProblemsetHeader from '@/components/problemset/problemset-header';

export default function ProblemSetList() {
  const session = useSession();

  const token = session.data?.user?.token;
  console.log(session);
  console.log(token);

  return (
    <>
      <Navbar status={NavbarStatus.LOGGED}></Navbar>
      <main className={classes.container}>
        <div className={classes.content}>
          <h1>PROBLEMSET</h1>
          <p>{token}</p>
          <p>Username: {session.data?.user.username}</p>
          <p>id: {session.data?.user.id}</p>
          <p>role: {session.data?.user.role}</p>
          {/* <Button variant="filled" onClick={() => handleSummit()}>Get started</Button> */}
          <Button
            variant="filled"
            onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
          >
            Signout
          </Button>
        </div>
      </main>
    </>
  );
}
