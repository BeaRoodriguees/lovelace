'use client';

import { Grid } from '@mantine/core';
import { Button, Container } from '@mantine/core';
import { Navbar } from '@/components/Navbar';

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

  const data: Problem = {
    id: 'some-id-hash',
    status: ProblemStatus.TODO,
    title: 'Em busca do Ouro Branco',
    tags: ['array', 'pointer', 'eof', 'recursion'],
    difficulty: 'hard',
    slug: 'problem-test',
  };

  return (
    <main>
      <div className={classes.container}>
        <ProblemsetHeader></ProblemsetHeader>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProblemCard data={data} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProblemCard data={data} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProblemCard data={data} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProblemCard data={data} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProblemCard data={data} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ProblemCard data={data} />
          </Grid.Col>
        </Grid>
      </div>
    </main>
  );
}
