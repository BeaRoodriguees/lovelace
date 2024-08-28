'use client';
import RegistrationForm from '@/components/auth/register-form';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

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
