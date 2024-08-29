'use client';
import { LoginForm } from '@/components/auth/auth-form';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

export default function LoginPage() {
  return (
    <>
      <Navbar status={NavbarStatus.AUTH}></Navbar>
      <main>
        <LoginForm />
      </main>
    </>
  );
}
