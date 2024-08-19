'use client';

import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  // Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './register-form.module.css';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { IconCircleX, IconCircleCheck } from '@tabler/icons-react';
import GrayBackground from '@/components/misc/gray-background';
import { IconLovelace } from '@/components/misc/icon-lovelace';

import Link from 'next/link';

interface RegistrationCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export default function RegistrationForm() {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
    },
  });

  async function handleRegistration(credentials: RegistrationCredentials) {
    if (credentials.password !== credentials.confirmPassword) {
      form.setErrors({
        password: 'Senhas são diferentes',
        confirmPassword: 'Senhas são diferentes',
      });
      return;
    }
    if (!credentials.username) {
      form.setErrors({ username: 'Usuário deve ser informado' });
      return;
    }
    if (!credentials.email) {
      form.setErrors({ email: 'Email deve ser informado' });
      return;
    }
    if (!credentials.password) {
      form.setErrors({ password: 'Senha deve ser informada' });
      return;
    }
    if (!credentials.confirmPassword) {
      form.setErrors({ confirmPassword: 'Confirme sua senha' });
      return;
    }

    if (!credentials.agree) {
      form.setErrors({
        agree: 'Você deve concordar com os termos',
      });
      return;
    }

    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res || res.status >= 500) {
      notifications.show({
        title: 'Algo deu errado!',
        message: 'Não foi possível criar uma conta. Tente novamente depois.',
        color: 'red',
        icon: <IconCircleX />,
      });
      return;
    }

    if (res.status === 400) {
      notifications.show({
        title: 'Credenciais inválidas',
        message: 'Usuário ou Email já estão em uso.',
        color: 'red',
        icon: <IconCircleX />,
      });
      form.setErrors({
        email: 'Usuário já existe',
        username: 'Usuário já existe',
      });
      return;
    }

    if (res.status > 400) {
      notifications.show({
        title: 'Credenciais inválidas',
        message: 'Algo deu errado! Tente mais tarde.',
        color: 'red',
        icon: <IconCircleX />,
      });
      form.setErrors({
        email: 'Credenciais inválidas',
        username: 'Credenciais inválidas',
        password: 'Credenciais inválidas',
        confirmPassword: 'Credenciais inválidas',
      });
      return;
    }

    if (res.ok) {
      notifications.show({
        title: 'Cadastro Completo!',
        message: 'Pode entrar agora.',
        color: 'green',
        icon: <IconCircleCheck />,
      });
      router.push('/register/completed');
    }
  }
  return (
    <GrayBackground>
      <IconLovelace />
      <Container size={420} my={40}>
        <Title size="64px" ta="center" className={classes.title}>
          Bem-Vindo!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Já possui uma conta?{' '}
          <Anchor size="sm" component={Link} href="/login">
            Acesse aqui
          </Anchor>
        </Text>
        <form onSubmit={form.onSubmit((values) => handleRegistration(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Usuário"
              placeholder="AdaLovelace"
              required
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Email"
              placeholder="ada.king@lovelace.com"
              required
              mt="md"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Senha"
              placeholder="$enhaForte123"
              required
              mt="md"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirme sua senha"
              placeholder="$enhaForte123"
              required
              mt="md"
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />
            <Group justify="space-between" mt="lg">
              {/* <Checkbox
                label="Eu concordo com os termos"
                classNames={{ label: classes.label }}
                key={form.key('agree')}
                {...form.getInputProps('agree')}
              /> */}
            </Group>
            <Button fullWidth variant="gradient" mt="lg" type="submit">
              Cadastrar conta
            </Button>
          </Paper>
        </form>
      </Container>
    </GrayBackground>
  );
}
