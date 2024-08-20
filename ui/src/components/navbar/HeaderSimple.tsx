'use client';
import { Group, Button, Box } from '@mantine/core';
import { IconLovelace } from '@/components/misc/icon-lovelace';
import classes from './HeaderSimple.module.css';

export default function HeaderSimple() {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <IconLovelace className={classes.logo} />

          <Group visibleFrom="sm">
            <Button component="a" href="/register" variant="default">
              Cadastrar
            </Button>
            <Button component="a" href="/login" variant="gradient" autoContrast>
              Entrar
            </Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
