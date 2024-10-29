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
  IconLogout2,
  IconSearch,
  IconTerminal,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import AvatarMenu from './AvatarMenu';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export enum NavbarStatus {
  HOME = 'HOME',
  LOGGED = 'LOGGED',
  AUTH = 'AUTH',
}

function NavbarAuthOptions() {
  return null;
}

function NavbarLoggedOptions() {
  const session = useSession();
  const user = session.data?.user;

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
          <Burger aria-label="Menu de Navegação" hiddenFrom="sm" size="sm" />
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
            href={`/profile/${user?.username}`}
            leftSection={
              <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Perfil
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={() => signOut()}
            color="red"
            leftSection={
              <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Sair da Conta
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

function NavbarUnloggedOptions() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Group visibleFrom="sm">
        <Button component="a" href="/register" variant="default">
          Cadastrar
        </Button>
        <Button component="a" href="/login" variant="gradient" autoContrast>
          Entrar
        </Button>
      </Group>

      <Group align="right" hiddenFrom="sm">
        <Menu
          opened={opened}
          onClose={() => setOpened(false)}
          onOpen={() => setOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <Burger
              opened={opened}
              onClick={() => setOpened((prev: boolean) => !prev)}
              aria-label="Abrir menu de navegação"
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              <Button
                variant="transparent"
                fullWidth
                component="a"
                href="/register"
              >
                Cadastro
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                variant="transparent"
                fullWidth
                component="a"
                href="/login"
              >
                Login
              </Button>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
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
