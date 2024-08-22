'use client';
import { Group, Button, Box, Avatar, Anchor, Input } from '@mantine/core';
import { IconLovelace } from '@/components/misc/icon-lovelace';
import { IconSearch } from '@tabler/icons-react';
import classes from './navbar.module.css';

export enum NavbarStatus {
  HOME = 'HOME',
  AUTH = 'AUTH',
}

export default function Navbar({ status }: { status?: NavbarStatus }) {
  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Anchor href="/problemset" className={classes.link}>
            <IconLovelace className={classes.logo} />
          </Anchor>

          {(() => {
            switch (status) {
              case NavbarStatus.HOME:
                return (
                  <Group visibleFrom="sm">
                    <Button component="a" href="/register" variant="default">
                      Cadastrar
                    </Button>
                    <Button
                      component="a"
                      href="/login"
                      variant="gradient"
                      autoContrast
                    >
                      Entrar
                    </Button>
                  </Group>
                );
              case NavbarStatus.AUTH:
                return null;
              default:
                return (
                  <Group visibleFrom="sm">
                    <Group>
                      <Anchor href="/problemset" c={'white'} fw={500}>
                        Problemas
                      </Anchor>
                      <Anchor href="/groupset" c={'gray'}>
                        Turmas
                      </Anchor>
                    </Group>
                    <Input
                      placeholder="Buscar"
                      leftSection={<IconSearch size={16} />}
                    />
                    <Avatar></Avatar>
                  </Group>
                );
            }
          })()}
        </Group>
      </header>
    </Box>
  );
}
