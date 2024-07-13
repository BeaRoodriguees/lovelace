'use client'

import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core'
import classes from './register-form.module.css'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { IconCircleX, IconCircleCheck } from '@tabler/icons-react'
import GrayBackground from '@/components/misc/gray-background'

import Link from 'next/link'

interface RegistrationCredentials {
  username: string
  email: string
  password: string
  confirmPassword: string
  agree: boolean
}

export default function RegistrationForm() {
  const router = useRouter()
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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  async function handleRegistration(credentials: RegistrationCredentials) {
    if (credentials.password !== credentials.confirmPassword) {
      form.setErrors({
        password: 'Passwords are different.',
        confirmPassword: 'Passwords are different.',
      })
      return
    }
    if (!credentials.username) {
      form.setErrors({ username: 'Username must be provided.' })
      return
    }
    if (!credentials.email) {
      form.setErrors({ email: 'Email must be provided.' })
      return
    }
    if (!credentials.password) {
      form.setErrors({ password: 'Password must be provided.' })
      return
    }
    if (!credentials.confirmPassword) {
      form.setErrors({ confirmPassword: 'Confirm your password.' })
      return
    }

    if (!credentials.agree) {
      form.setErrors({
        agree: 'You must agree >:)',
      })
      return
    }

    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('email', credentials.email)
    formData.append('password', credentials.password)

    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!res || res.status >= 500) {
      notifications.show({
        title: 'Something went wrong.',
        message: 'It was not possible to create an account. Try again later.',
        color: 'red',
        icon: <IconCircleX />,
      })
      return
    }

    if (res.status === 400) {
      notifications.show({
        title: 'Invalid credentials.',
        message: 'Username or Email already in use.',
        color: 'red',
        icon: <IconCircleX />,
      })
      form.setErrors({
        email: 'User already exists.',
        username: 'User already exists.',
      })
      return
    }

    if (res.status > 400) {
      notifications.show({
        title: 'Invalid credentials.',
        message: 'Something went wrong. Try again later.',
        color: 'red',
        icon: <IconCircleX />,
      })
      form.setErrors({
        email: 'Invalid credentials.',
        username: 'Invalid credentials.',
        password: 'Invalid credentials.',
        confirmPassword: 'Invalid credentials.',
      })
      return
    }

    if (res.ok) {
      notifications.show({
        title: 'Registration complete!',
        message: 'You can log in now.',
        color: 'green',
        icon: <IconCircleCheck />,
      })
      router.push('/register/completed')
    }
  }

  return (
    <GrayBackground>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Create an account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} href="/login">
            Sign in
          </Anchor>
        </Text>
        <form onSubmit={form.onSubmit((values) => handleRegistration(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Username"
              placeholder="username"
              required
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
            <TextInput
              label="Email"
              placeholder="example@example.com"
              required
              mt="md"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="your password"
              required
              mt="md"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="your password"
              required
              mt="md"
              key={form.key('confirmPassword')}
              {...form.getInputProps('confirmPassword')}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox
                label="I agree to sell my privacy"
                classNames={{ label: classes.label }}
                key={form.key('agree')}
                {...form.getInputProps('agree')}
              />
            </Group>
            <Button fullWidth mt="lg" type="submit">
              Create your account
            </Button>
          </Paper>
        </form>
      </Container>
    </GrayBackground>
  )
}
