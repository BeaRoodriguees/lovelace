'use client';

// import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Grid } from '@mantine/core';
import { Pagination } from '@mantine/core';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';
import ProblemCard from '@/components/cards/problem-card';
import ProblemsetHeader from '@/components/problemset/problemset-header';
import { Problem, ProblemSetFilterData } from '@/lib/types';
import classes from './page.module.css';

import { problemsMock, tagsMock } from '@/mocks/problems';

export default function ProblemSetList() {
  // const session = useSession();
  // const token = session.data?.user?.token;

  function getData() {
    return problemsMock;
  }
  const problemData = getData();
  // Isso é necessário, pois a ação de paginação vai requerer informações dos
  // filtros ativos. Imagine que o usuário quer visualizar apenas os problemas
  // fáceis. Se ele clica para ir para a página 2, ele espera que ainda sejam
  // só problemas fáceis. Ou seja, a requisição sempre tem informações da
  // página e dos filtros
  const [filters, setFilters] = useState<ProblemSetFilterData>({
    tags: [],
    difficulties: [],
    status: [],
  });
  const [problems, setProblems] = useState<Array<Problem>>(problemData);

  function applyFilters(filterData: ProblemSetFilterData) {
    // Funcionamento desejado com backend:
    // 1. UI entra em estado de loading
    // 2. Requisição é feita ao backend: novo conjunto de problemas
    // 3. O useState dos problemas é atualizado com os novos problemas
    // 4. A url é atualizada para conter os parâmetros dde filtro
    // 5. O estado de loading é removido

    // Mock filters
    setFilters(filterData);
    const filteredProblems = problemData.filter((problem) => {
      const tagsMatch = filterData.tags.every((tag) =>
        problem.tags.includes(tag),
      );
      const statusMatch =
        filterData.status.length > 0
          ? filterData.status.includes(problem.status)
          : true;

      const difficultyMatch =
        filterData.difficulties.length > 0
          ? filterData.difficulties.includes(problem.difficulty)
          : true;

      return tagsMatch && statusMatch && difficultyMatch;
    });
    setProblems(filteredProblems);
  }

  return (
    <>
      <Navbar status={NavbarStatus.LOGGED}></Navbar>
      <main>
        <div className={classes.container}>
          <ProblemsetHeader
            applyFilters={applyFilters}
            currentFilters={filters}
            tags={tagsMock}
          />
          <Grid grow gutter="sm">
            {problems.map((problem, index) => {
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
