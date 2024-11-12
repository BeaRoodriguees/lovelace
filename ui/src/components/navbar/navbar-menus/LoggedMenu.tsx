'use client';

import { Anchor, Box, Burger, Group, Input, Menu, rem } from '@mantine/core';
import {
  IconLogout2,
  IconSearch,
  IconTerminal,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import AvatarMenu from '../AvatarMenu';
import classes from '../navbar.module.css';

export default function LoggedMenu() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Box>
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
            disabled
          >
            Turmas
          </Menu.Item>
          <Menu.Item
            component="a"
            href={`/profile/${user?.username}`}
            leftSection={
              <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
            disabled
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
