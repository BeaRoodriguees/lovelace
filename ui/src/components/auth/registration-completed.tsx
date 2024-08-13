import { Text, Title, Button, Container, Paper } from '@mantine/core';
import classes from './registration-completed.module.css';
import Link from 'next/link';
import GrayBackground from '@/components/misc/gray-background';
import { IconLovelace } from '../misc/icon-lovelace';

export function RegistrationCompletedBanner() {
  return (
    <GrayBackground>
      <IconLovelace />
      <Container size={625} mt={200}>
        <Paper withBorder shadow="md" py={42} px={52} radius="md">
          <Title ta="center" order={2} className={classes.title}>
            Cadastro completo!
          </Title>
          <Text fz="md" c="dimmed" ta="center" mt="sm">
            Bem-vindo ao Lovelace. Agora você pode entrar com sua conta.
          </Text>

          <Button
            href="/login"
            component={Link}
            mt="xl"
            fullWidth={true}
            className={classes.button}
          >
            Entrar
          </Button>
        </Paper>
      </Container>
    </GrayBackground>
  );
}
