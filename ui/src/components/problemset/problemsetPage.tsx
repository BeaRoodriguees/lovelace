'use client';

import { Grid, Loader } from '@mantine/core';
import ProblemsetHeader from './problemset-header';
import ProblemCard from '../cards/problem-card';
import classes from './problemset-page.module.css';
import { useState } from 'react';
import { Problem, ProblemSetFilterData, Tags } from '@/lib/types';
import { forceDelay } from '@/lib/utils';

interface ProblemsetProps {
  problemList: Array<Problem>;
  tagsList: Array<Tags>;
}

export default function ProblemsetPage(props: ProblemsetProps) {
  const [loading, setLoading] = useState<boolean>(false);
  // Isso é necessário, pois a ação de paginação vai requerer informações dos
  // filtros ativos. Imagine que o usuário quer visualizar apenas os problemas
  // fáceis. Se ele clica para ir para a página 2, ele espera que ainda sejam
  // só problemas fáceis. Ou seja, a requisição sempre tem informações da
  // página e dos filtros
  const [filters, setFilters] = useState<ProblemSetFilterData>({
    tags: [],
    difficulties: [],
    status: [],
    titleFragment: '',
  });
  const [problems, setProblems] = useState<Array<Problem>>(props.problemList);

  async function applyFilters(filterData: ProblemSetFilterData) {
    // Funcionamento desejado com backend:
    // 1. UI entra em estado de loading
    // 2. Requisição é feita ao backend: novo conjunto de problemas
    // 3. O useState dos problemas é atualizado com os novos problemas
    // 4. A url é atualizada para conter os parâmetros dde filtro
    // 5. O estado de loading é removido

    // Mock filters
    setLoading(true);
    await forceDelay(700);
    setFilters(filterData);

    // const filteredProblems = props.problemList.filter((problem) => {
    //   const titleMatch = filterData.titleFragment
    //     ? problem.name
    //         .toLowerCase()
    //         .includes(filterData.titleFragment.toLowerCase())
    //     : true;

    //   const tagsMatch = filterData.tags.every((tag) =>
    //     problem.tags.includes(tag),
    //   );

    //   const statusMatch =
    //     filterData.status.length > 0
    //       ? filterData.status.includes(problem.status)
    //       : true;

    //   const difficultyMatch =
    //     filterData.difficulties.length > 0
    //       ? filterData.difficulties.includes(problem.difficulty)
    //       : true;

    //   return titleMatch && tagsMatch && statusMatch && difficultyMatch;
    // });

    setProblems(props.problemList);
    setLoading(false);
  }

  return (
    <main>
      <div className={classes.container}>
        <ProblemsetHeader
          applyFilters={applyFilters}
          currentFilters={filters}
          tags={props.tagsList}
        />
        {loading ? (
          <Loader color="gray" size="lg" />
        ) : problems.length > 0 ? (
          <Grid gutter="sm" className={classes.problems}>
            {problems.map((problem, index) => {
              return (
                <Grid.Col key={index} span={{ base: 12, lg: 6 }}>
                  <ProblemCard data={problem} />
                </Grid.Col>
              );
            })}
          </Grid>
        ) : (
          <span>Não há problemas.</span>
        )}
        {/*
      <Pagination
        color={'gray.5'}
        autoContrast
        total={1}
        size="md"
        radius="md"
        withEdges
      ></Pagination> */}
      </div>
    </main>
  );
}
