'use client'

import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Checkbox,
  Flex,
} from '@mantine/core'
import classes from './auth-form.module.css'
import { useRouter } from 'next/navigation'
import { DEFAULT_REDIRECT } from '@/lib/routes'
import { signIn } from 'next-auth/react'
import { notifications } from '@mantine/notifications'
import { IconCircleX, IconCircleCheck } from '@tabler/icons-react'
import GrayBackground from '@/components/misc/gray-background'
import Link from 'next/link'
import IconLovelace from '@/components/misc/icon-lovelace'

interface LoginCredentials {
  email: string
  password: string
}

export function LoginForm() {
  const router = useRouter()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
    },
  })

  async function handleLogin(credentials: LoginCredentials) {
    if (!credentials.email) {
      form.setErrors({ email: 'Email deve ser informado.' })
      return
    }
    if (!credentials.password) {
      form.setErrors({ password: 'Senha deve ser informada.' })
      return
    }

    const res = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    })

    if (!res || res.status >= 500) {
      notifications.show({
        title: 'Algo deu errado!',
        message: 'Não foi possível fazer o login. Tente mais tarde.',
        color: 'red',
        icon: <IconCircleX />,
      })
      return
    }

    if (res.status >= 400) {
      notifications.show({
        title: 'Credenciais inválidas',
        message: 'Tem certeza que colocou as informações corretas?',
        color: 'red',
        icon: <IconCircleX />,
      })
      form.setErrors({
        password: 'Credencial inválida',
        email: 'Credencial inválida',
      })
      return
    }

    if (res.ok) {
      notifications.show({
        title: 'Bem vindo novamente!',
        message: 'Estamos felizes por ter você de volta.',
        color: 'green',
        icon: <IconCircleCheck />,
      })
      router.push(DEFAULT_REDIRECT)
    }
  }

  return (
    <GrayBackground>
      <IconLovelace />
      
      <Container size={420} my={40}>
        <Title ta="center" size="62px" className={classes.title}>
          Olá de novo!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Não tem uma conta ainda?{' '}
          <Anchor href="/register" size="sm" component={Link}>
            Crie uma.
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="ada.king@lovelace.com"
              required
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

            <Flex
              mt="md"
              gap="xs"
              justify="space-between"
              align="center"
            >
              <Checkbox
                label="Lembre-se de mim"
                radius="xs"
              />
              <Anchor component="button" size="sm" >
                Esqueceu a senha?
              </Anchor>
            </Flex>
              <Button fullWidth mt="lg" type="submit" className={classes.button}>
                Entrar
              </Button>

          </Paper>
        </form>
      </Container>
    </GrayBackground>
  )
}
