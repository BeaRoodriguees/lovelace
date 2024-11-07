'use client';

import { Group, Box } from '@mantine/core';
import { IconLovelace } from '@/components/misc/icon-lovelace';
import classes from './navbar.module.css';
import LoggedMenu from './navbar-menus/LoggedMenu';
import UnloggedMenu from './navbar-menus/UnloggedMenu';
import { NavbarStatus } from '@/lib/types';

function NavbarAuthOptions() {
  return null;
}

export default function Navbar({ status }: { status?: NavbarStatus }) {
  return (
    <Box>
      <nav className={classes.nav}>
        <Group justify="space-between" h="100%">
          <IconLovelace className={classes.logo} />

          {status === NavbarStatus.AUTH && <NavbarAuthOptions />}
          {status === NavbarStatus.LOGGED && <LoggedMenu />}
          {status === NavbarStatus.HOME && <UnloggedMenu />}
        </Group>
      </nav>
    </Box>
  );
}
