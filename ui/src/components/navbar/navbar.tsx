'use client';
import {
  Group,
  Button,
  Anchor,
  Input,
  Burger,
  Box,
  Drawer,
  Divider,
  ScrollArea,
  rem,
  NavLink,
} from '@mantine/core';
import { IconLovelace } from '@/components/misc/icon-lovelace';
import { IconHome2, IconSearch } from '@tabler/icons-react';
import classes from './navbar.module.css';
import AvatarMenu from '../misc/AvatarMenu';
import { useDisclosure } from '@mantine/hooks';

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
        <Anchor href="/groupset" c={'dark.1'} fw={600}>
          Turmas
        </Anchor>
      </Group>
      <Input placeholder="Buscar" leftSection={<IconSearch size={16} />} />
      <AvatarMenu />
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
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <nav className={classes.nav}>
        <Group justify="space-between" h="100%">
          <IconLovelace className={classes.logo} />

          {status === NavbarStatus.AUTH && <NavbarAuthOptions />}
          {status === NavbarStatus.LOGGED && <NavbarLoggedOptions />}
          {status === NavbarStatus.HOME && <NavbarUnloggedOptions />}

          <Burger
            aria-label="Menu burger"
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </nav>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        position="right"
        title="Menu"
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <NavLink
            href="/problemset"
            label="Problemas"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          />
          <NavLink
            href="/groupset"
            label="Turmas"
            leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          />

          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
