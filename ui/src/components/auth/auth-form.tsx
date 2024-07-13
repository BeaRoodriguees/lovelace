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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  async function handleLogin(credentials: LoginCredentials) {
    if (!credentials.email) {
      form.setErrors({ email: 'Email must be provided.' })
      return
    }
    if (!credentials.password) {
      form.setErrors({ password: 'Password must be provided.' })
      return
    }

    const res = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    })

    if (!res || res.status >= 500) {
      notifications.show({
        title: 'Something went wrong.',
        message: 'It was not possible to log in. Try again later.',
        color: 'red',
        icon: <IconCircleX />,
      })
      return
    }

    if (res.status >= 400) {
      notifications.show({
        title: 'Invalid credentials.',
        message: 'Have you entered the correct credentials?',
        color: 'red',
        icon: <IconCircleX />,
      })
      form.setErrors({
        password: 'Invalid credentials.',
        email: 'Invalid Credentials.',
      })
      return
    }

    if (res.ok) {
      notifications.show({
        title: 'Welcome!',
        message: 'We are thrilled to have you back.',
        color: 'green',
        icon: <IconCircleCheck />,
      })
      router.push(DEFAULT_REDIRECT)
    }
  }

  return (
    <GrayBackground>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor href="/register" size="sm" component={Link}>
            Create account
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="example@example.com"
              required
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="password"
              required
              mt="md"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Flex
              mt="md"
              gap="xs"
              justify="center"
              align="center"
              direction="column"
            >
              <Button fullWidth mt="lg" type="submit">
                Sign in
              </Button>
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Flex>
          </Paper>
        </form>
      </Container>
    </GrayBackground>
  )
}
