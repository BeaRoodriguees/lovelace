'use client';

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './theme-switcher.module.css';

export default function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
    </ActionIcon>
  );
}
