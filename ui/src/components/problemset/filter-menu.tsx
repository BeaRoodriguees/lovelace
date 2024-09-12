'use client';

import { Popover, Button, Text, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FocusTrap } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { CloseButton } from '@mantine/core';
import classes from './filter-menu.module.css';

export default function FilterDropdownManu() {
  const [opened, setOpened] = useState<boolean>(false);
  const [active, { toggle }] = useDisclosure(false);

  function onMenuClose() {
    console.log('fechando...');
    setOpened(false);
    toggle();
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
      closeOnEscape={false}
    >
      <Popover.Target>
        <Button
          onClick={() =>
            setOpened((o) => {
              toggle();
              return !o;
            })
          }
          leftSection={<IconFilter stroke={2} />}
          variant={'lovelace-secondary'}
        >
          Filtros
        </Button>
      </Popover.Target>

      <Popover.Dropdown className={classes.menu}>
        <FocusTrap>
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
              <Text
                size="sm"
                fw={400}
                className={classes.description}
                lh={'xs'}
              >
                Use os campos abaixo para filtrar os problemas listados.
                Selecione uma ou mais opções em cada campo e clique em Filtrar
                para aplicar os filtros.
              </Text>
            </div>
            <div className={classes.content}>
              <FocusTrap.InitialFocus />
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
                // tabIndex={opened ? 2 : -1}
              />
              <MultiSelect
                label="Tópicos"
                placeholder="Selecione um ou mais tópicos"
                data={problemTags}
                searchable
                // tabIndex={opened ? 2 : -1}
              />
              <MultiSelect
                label="Status"
                placeholder="Selecione um ou mais opções"
                data={['Feito', 'Para fazer', 'Errado']}
                // tabIndex={opened ? 2 : -1}
              />
            </div>
            <div className={classes.footer}>
              <Button variant={'lovelace-secondary'}>Limpar</Button>
              <Button variant={'lovelace-primary'}>Filtrar</Button>
            </div>
          </div>
        </FocusTrap>
      </Popover.Dropdown>
    </Popover>
  );
}
