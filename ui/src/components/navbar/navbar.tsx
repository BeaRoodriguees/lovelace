'use client';
import {
  Group,
  Button,
  Anchor,
  Input,
  Burger,
  Box,
  rem,
  Menu,
} from '@mantine/core';
import { IconLovelace } from '@/components/misc/icon-lovelace';
import {
  IconSearch,
  IconTerminal,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import AvatarMenu from '../misc/AvatarMenu';

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
    <Box>
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

      <Menu shadow="md" width={250}>
        <Menu.Target>
          <Burger aria-label="Menu burger" hiddenFrom="sm" size="sm" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item
            component="a"
            href="/problemset"
            leftSection={
              <IconTerminal style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Problemas
          </Menu.Item>
          <Menu.Item
            component="a"
            href="/groupset"
            leftSection={
              <IconUsersGroup style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Turmas
          </Menu.Item>
          <Menu.Item
            component="a"
            href=""
            leftSection={
              <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Perfil
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
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
