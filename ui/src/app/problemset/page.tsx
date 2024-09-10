'use client';

import { Grid } from '@mantine/core';
import { Button, Container } from '@mantine/core';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';
import { Pagination } from '@mantine/core';

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
    <>
      <Navbar status={NavbarStatus.LOGGED}></Navbar>
      <main>
        <div className={classes.container}>
          <ProblemsetHeader></ProblemsetHeader>
          <Grid grow gutter="sm">
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
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ProblemCard data={data} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <ProblemCard data={data} />
            </Grid.Col>
          </Grid>
          <Pagination total={1} size="md" radius="md" withEdges></Pagination>
        </div>
      </main>
    </>
  );
}
