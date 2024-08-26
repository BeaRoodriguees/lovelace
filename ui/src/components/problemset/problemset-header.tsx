'use client';

import classes from './problemset-header.module.css';

import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { Title } from '@mantine/core';
import { IconFilter, IconSearch } from '@tabler/icons-react';

export default function ProblemsetHeader() {
  return (
    <div className={classes.container}>
      <Title order={2} textWrap="wrap">
        Problemas
      </Title>
      <div className={classes.actions}>
        <TextInput
          style={{ width: '450px' }}
          radius="md"
          placeholder="Encontrar um problema"
          leftSection={<IconSearch size={16} />}
        ></TextInput>
        <Button
          variant="lovelace-dark"
          justify="center"
          leftSection={<IconFilter size={16} />}
          radius="md"
        >
          Filtrar
        </Button>
      </div>
    </div>
  );
}
