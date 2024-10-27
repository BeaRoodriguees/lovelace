'use client';

import classes from './problemset-header.module.css';
import { Button, TextInput } from '@mantine/core';
import { Title } from '@mantine/core';
import { IconFilter, IconSearch } from '@tabler/icons-react';
import FilterDropdownMenu from './filter-menu';
import { ProblemSetFilterData } from '@/lib/types';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

interface ProblemsetHeaderProps {
  currentFilters: ProblemSetFilterData;
  applyFilters: (filters: ProblemSetFilterData) => void;
  tags: Array<string>;
}

export default function ProblemsetHeader(props: ProblemsetHeaderProps) {
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const { applyFilters, currentFilters } = props;
  const isMobile = useMediaQuery('(max-width: 768px)');

  function updateSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);

    clearTimeout(timer);

    // Only is tirggered when the user stops typing
    const newTimer = setTimeout(() => {
      applyFilters({ ...currentFilters, titleFragment: event.target.value });
    }, 1000);

    setTimer(newTimer);
  }

  

  return (
    <div className={classes.container}>
      <Title order={2} textWrap="wrap">
        Problemas
      </Title>
      <div className={classes.actions}>
        {isMobile ? (
          <>
            <Button
              variant="default"
              onClick={() => {
                /* handle search icon click */
              }}
            >
              <IconSearch size={16} />
            </Button>
            <Button
              variant="default"
              onClick={() => {
                /* handle filter icon click */
              }}
            >
              <IconFilter size={16} />
            </Button>
          </>
        ) : (
          <>
            <TextInput
              radius="md"
              placeholder="Encontrar um problema"
              leftSection={<IconSearch size={16} />}
              className={classes.search}
              value={search}
              onChange={updateSearch}
            ></TextInput>
            <FilterDropdownMenu className={classes.filter} {...props} />
          </>
        )}
      </div>
    </div>
  );
}
