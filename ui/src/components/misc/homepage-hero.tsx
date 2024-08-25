'use client';

import { Container, Text, Button, Group } from '@mantine/core';
import classes from './homepage-hero.module.css';
import Link from 'next/link';

export function HomePageHero() {
  return (
    <div className={classes.wrapper}>
      <Container size={900} className={classes.inner}>
        <h1 className={classes.title}>
          Aprender{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: '#222c71', to: '#0c7f98', deg: 90 }}
            inherit
          >
            programação
          </Text>{' '}
          de forma prática e interativa
        </h1>

        <Text className={classes.description} c="dimmed">
          Inspirado por Ada Lovelace, a primeira programadora da história, o
          Lovelace é um espaço dedicado ao aprendizado e aprimoramento das
          habilidades de programação.
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            size="md"
            href="/register"
            variant="gradient"
          >
            Comece!
          </Button>
        </Group>
      </Container>
    </div>
  );
}
