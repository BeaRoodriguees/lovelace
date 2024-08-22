import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './not-found.module.css';

export function NotFound() {
  return (
    <>
      <Container className={classes.root}>
        <div className={classes.inner}>
          <Illustration className={classes.image} />
          <div className={classes.content}>
            <Title className={classes.title}>Nada a ver aqui!</Title>
            <Text
              c="dimmed"
              size="nd"
              ta="center"
              className={classes.description}
            >
              A página que você está tentando abrir não existe. Você pode ter
              errado o endereço, ou a página foi movida a outro URL. Se você
              achar isso um erro, contate o suporte.
            </Text>
            <Group justify="center">
              <Button variant="gradient" component="a" size="md" href="/">
                Voltar ao Início
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </>
  );
}
