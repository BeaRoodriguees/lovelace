'use client';

import { Popover, Button, Text, MultiSelect } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FocusTrap } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { CloseButton } from '@mantine/core';
import classes from './filter-menu.module.css';
import { useForm } from '@mantine/form';
import { ProblemSetFilterData, ProblemStatus } from '@/lib/types';

interface FilterDropdownMenuProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  currentFilters: ProblemSetFilterData;
  applyFilters: (filters: ProblemSetFilterData) => void;
  tags: Array<string>;
}

const statusSelectData = [
  { value: ProblemStatus.DONE, label: 'Feito' },
  { value: ProblemStatus.ERROR, label: 'Errado' },
  { value: ProblemStatus.TODO, label: 'Para fazer' },
];

export default function FilterDropdownMenu({
  currentFilters,
  applyFilters,
  tags,
  ...rest
}: FilterDropdownMenuProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [, { toggle: toggleFocusTrap }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: currentFilters,
  });

  function onMenuClose() {
    setOpened(false);
    toggleFocusTrap();
  }

  async function handleApplyFilters(values: ProblemSetFilterData) {
    applyFilters(values);
    setOpened(false);
  }

  async function clearFilters() {
    form.reset();
    applyFilters({
      tags: [],
      difficulties: [],
      status: [],
      titleFragment: '',
    });
    setOpened(false);
  }

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
              toggleFocusTrap();
              return !o;
            })
          }
          leftSection={<IconFilter stroke={2} />}
          variant={'lovelace-secondary'}
          {...rest}
        >
          Filtros
        </Button>
      </Popover.Target>

      <Popover.Dropdown className={classes.menu}>
        <FocusTrap>
          <form
            className={classes.wrapper}
            onSubmit={form.onSubmit((values) => handleApplyFilters(values))}
          >
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
            <FocusTrap.InitialFocus />
            <div className={classes.content}>
              <MultiSelect
                label="Dificuldade"
                placeholder="Selecione uma ou mais dificuldades"
                data={[
                  'Muito Fácil',
                  'Fácil',
                  'Intermediário',
                  'Difícil',
                  'Muito Difícil',
                ]}
                classNames={{ pill: classes.pill }}
                key={form.key('difficulties')}
                {...form.getInputProps('difficulties')}
              />
              <MultiSelect
                label="Tópicos"
                placeholder="Selecione um ou mais tópicos"
                data={tags}
                searchable
                key={form.key('tags')}
                {...form.getInputProps('tags')}
                classNames={{ pill: classes.pill }}
              />
              <MultiSelect
                label="Status"
                placeholder="Selecione um ou mais opções"
                data={statusSelectData}
                key={form.key('status')}
                {...form.getInputProps('status')}
                classNames={{ pill: classes.pill }}
              />
            </div>
            <div className={classes.footer}>
              <Button variant={'lovelace-secondary'} onClick={clearFilters}>
                Limpar
              </Button>
              <Button variant={'lovelace-primary'} type="submit">
                Filtrar
              </Button>
            </div>
          </form>
        </FocusTrap>
      </Popover.Dropdown>
    </Popover>
  );
}
