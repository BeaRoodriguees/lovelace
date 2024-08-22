'use client';
import { LoginForm } from '@/components/auth/auth-form';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

export default function LoginPage() {
  return (
    <main>
      <Navbar status={NavbarStatus.AUTH}></Navbar>
      <LoginForm></LoginForm>
    </main>
  );
}
