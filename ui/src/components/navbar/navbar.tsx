'use client';
import { Group, Button, Box, Avatar, Anchor, Input } from '@mantine/core';
import { IconLovelace } from '@/components/misc/icon-lovelace';
import { IconSearch } from '@tabler/icons-react';
import classes from './navbar.module.css';

export enum NavbarStatus {
  HOME = 'HOME',
  LOGGED = 'LOGGED',
  AUTH = 'AUTH',
}

function NavbarAuthOptions() {
  return null;
}

function NavbarLoggedOptions() {
  return (
    <Group visibleFrom="sm" className={classes.menu}>
      <Group>
        <Anchor href="/problemset" c={'gray.0'} fw={700}>
          Problemas
        </Anchor>
        {/* <Anchor href="/groupset" c={'dark.1'} fw={600}>
          Turmas
        </Anchor> */}
      </Group>
      <Input placeholder="Buscar" leftSection={<IconSearch size={16} />} />
      <Avatar></Avatar>
    </Group>
  );
}

function NavbarUnloggedOptions() {
  return (
    <Group visibleFrom="sm">
      <Button component="a" href="/register" variant="default">
        Cadastrar
      </Button>
      <Button component="a" href="/login" variant="gradient" autoContrast>
        Entrar
      </Button>
    </Group>
  );
}

export default function Navbar({ status }: { status?: NavbarStatus }) {
  return (
    <Box>
      <nav className={classes.nav}>
        <Group justify="space-between" h="100%">
          <IconLovelace className={classes.logo} />

          {status === NavbarStatus.AUTH && <NavbarAuthOptions />}
          {status === NavbarStatus.LOGGED && <NavbarLoggedOptions />}
          {status === NavbarStatus.HOME && <NavbarUnloggedOptions />}
        </Group>
      </nav>
    </Box>
  );
}
