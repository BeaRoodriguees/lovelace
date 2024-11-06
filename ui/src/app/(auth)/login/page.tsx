'use client';
import { LoginForm } from '@/components/auth/auth-form';
import Navbar from '@/components/navbar/navbar';
import { NavbarStatus } from '@/lib/types';

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
