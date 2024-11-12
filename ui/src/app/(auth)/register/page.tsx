'use client';
import RegistrationForm from '@/components/auth/register-form';
import Navbar from '@/components/navbar/navbar';
import { NavbarStatus } from '@/lib/types';

export default function RegisterPage() {
  return (
    <>
      <Navbar status={NavbarStatus.AUTH} />
      <main>
        <RegistrationForm />
      </main>
    </>
  );
}
