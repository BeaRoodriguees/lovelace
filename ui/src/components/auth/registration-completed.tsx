import { Text, Title, Button, Container, Paper } from '@mantine/core'
import classes from './registration-completed.module.css'
import Link from 'next/link'
import GrayBackground from '@/components/misc/gray-background'

export function RegistrationCompletedBanner() {
  return (
    <GrayBackground>
      <Container size={625} mt={200}>
        <Paper withBorder shadow="md" py={42} px={52} radius="md">
          <Title ta="center" order={2} className={classes.title}>
            Registration completed!
          </Title>
          <Text fz="md" c="dimmed" ta="center" mt="sm">
            Welcome to our platform. You can now Log in with your credentials.
          </Text>

          <Button
            href="/login"
            component={Link}
            mt="xl"
            fullWidth={true}
            className={classes.control}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </GrayBackground>
  )
}
