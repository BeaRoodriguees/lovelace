'use client';

import { Popover, Button, Text, MultiSelect } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { CloseButton } from '@mantine/core';
import classes from './filter-menu.module.css';

export default function FilterDropdownManu() {
  const [opened, setOpened] = useState<boolean>(true);

  function onMenuClose() {
    console.log('fechando...');
    setOpened(false);
  }

  const problemTags = [
    'Array',
    'EOF',
    'Entrada e Saída',
    'Ponteiro',
    'Hash',
    'Pilha',
    'Fila',
    'Lista Encadeada',
    'Recursão',
    'Condicional',
  ];

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      closeOnClickOutside={false}
      shadow="md"
      width={520}
      position="bottom-end"
    >
      <Popover.Target>
        <Button
          onClick={() => setOpened((o) => !o)}
          leftSection={<IconFilter stroke={2} />}
          variant={'lovelace-dark'}
        >
          Filtros
        </Button>
      </Popover.Target>

      <Popover.Dropdown className={classes.menu}>
        <div className={classes.wrapper}>
          <div className={classes.header}>
            <Text size="lg" fw={700} className={classes.title}>
              Filtrar Problemas
            </Text>
            <CloseButton
              onClick={onMenuClose}
              className={classes.close}
              aria-label="Close menu"
            />
            <Text size="sm" fw={400} className={classes.description} lh={'xs'}>
              Use os campos abaixo para filtrar os problemas listados. Selecione
              uma ou mais opções em cada campo e clique em Filtrar para aplicar
              os filtros.
            </Text>
          </div>
          <div className={classes.content}>
            <MultiSelect
              label="Dificuldade"
              placeholder="Selecione uma ou mais dificuldades"
              data={[
                'Muito fácil',
                'Fácil',
                'Intermediário',
                'Difícil',
                'Muito difícil',
              ]}
              classNames={{ pill: classes.pill }}
            />
            <MultiSelect
              label="Tópicos"
              placeholder="Selecione um ou mais tópicos"
              data={problemTags}
              searchable
            />
            <MultiSelect
              label="Status"
              placeholder="Selecione um ou mais opções"
              data={['Feito', 'Para fazer', 'Errado']}
            />
          </div>
          <div className={classes.footer}>
            <Button variant={'lovelace-dark'}>Limpar</Button>
            <Button variant={'lovelace-white'}>Filtrar</Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
