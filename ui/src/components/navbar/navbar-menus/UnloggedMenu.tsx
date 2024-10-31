'use client';

import { Burger, Button, Group, Menu } from '@mantine/core';
import { useState } from 'react';

export default function UnloggedMenu() {
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
                color="blue.7"
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
                color="blue.7"
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
