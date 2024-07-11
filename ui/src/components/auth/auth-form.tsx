'use client'

import { useForm } from '@mantine/form';
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
  } from '@mantine/core';
import classes from './auth-form.module.css';
import { useFormState } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { useRouter } from 'next/navigation'
import { DEFAULT_REDIRECT } from '@/lib/routes'

  export function LoginForm() {
    const router = useRouter()
    const [errorMessage, formAction, isPending] = useFormState(
      authenticate,
      undefined,
    );

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        email: '',
        password: '',
      },
  
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
    });

    async function handleLogin(credentials) {
      const formData = new FormData()
      formData.append('email', credentials.email)
      formData.append('password', credentials.password)
      console.log(credentials)
      // formAction(formData)
      await authenticate(undefined, formData)
      router.push(DEFAULT_REDIRECT)
      
    }

    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">

            <TextInput 
              label="Email" 
              placeholder="you@mantine.dev" 
              required 
              key={form.key('email')}
              {...form.getInputProps('email')} />
            <PasswordInput 
              label="Password" 
              placeholder="Your password" 
              required mt="md" 
              key={form.key('password')}
              {...form.getInputProps('password')} />

            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>

            <Button fullWidth mt="xl" type='submit'>
              Sign in
            </Button>

          </Paper>
        </form>
      </Container>
    );
  }