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
import { Router } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
import { problemsMock } from '@/mocks/problems';

export default function ProblemSetList() {
  const session = useSession();

  const token = session.data?.user?.token;
  console.log(session);
  console.log(token);

  function getData() {
    return problemsMock;
  }

  const data: Array<Problem> = getData();

  return (
    <>
      <Navbar status={NavbarStatus.LOGGED}></Navbar>
      <main>
        <div className={classes.container}>
          <ProblemsetHeader></ProblemsetHeader>
          <Grid grow gutter="sm">
            {data.map((problem, index) => {
              return (
                <Grid.Col key={index} span={{ base: 12, md: 6 }}>
                  <ProblemCard data={problem} />
                </Grid.Col>
              );
            })}
          </Grid>
          <Pagination
            color={'gray.5'}
            autoContrast
            total={1}
            size="md"
            radius="md"
            withEdges
          ></Pagination>
        </div>
      </main>
    </>
  );
}
