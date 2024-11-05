import Navbar from '@/components/navbar/navbar';
import { NavbarStatus } from '@/lib/types';
import ProblemPage from '@/components/problems/problemPage';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';

export default async function Problem({ params }: { params: { id: string } }) {
  const session = await getServerSession(authConfig);

  const getProblem = async () => {
    try {
      const res = await fetch(
        `${process.env.API_URL}/problemset/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch (error) {
      throw new Error('Erro de conexão com o servidor');
    }
  };

  const problem = await getProblem();
  console.log(problem);

  return (
    <>
      <Navbar status={NavbarStatus.LOGGED} />
      <ProblemPage problem={problem} />
    </>
  );
}
