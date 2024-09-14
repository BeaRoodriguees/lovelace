'use client';

import classes from './problemset-header.module.css';

import { TextInput } from '@mantine/core';
import { Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import FilterDropdownMenu from './filter-menu';
import { ProblemSetFilterData } from '@/lib/types';

interface ProblemsetHeaderProps {
  currentFilters: ProblemSetFilterData;
  applyFilters: (filters: ProblemSetFilterData) => void;
  tags: Array<string>;
}

export default function ProblemsetHeader(props: ProblemsetHeaderProps) {
  return (
    <div className={classes.container}>
      <Title order={2} textWrap="wrap">
        Problemas
      </Title>
      <div className={classes.actions}>
        <TextInput
          radius="md"
          placeholder="Encontrar um problema"
          leftSection={<IconSearch size={16} />}
          className={classes.search}
        ></TextInput>
        <FilterDropdownMenu className={classes.filter} {...props} />
      </div>
    </div>
  );
}
