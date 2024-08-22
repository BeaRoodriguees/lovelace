'use client';
import RegistrationForm from '@/components/auth/register-form';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';

export default function RegisterPage() {
  return (
    <main>
      <Navbar status={NavbarStatus.AUTH} />
      <RegistrationForm></RegistrationForm>;
    </main>
  );
}
