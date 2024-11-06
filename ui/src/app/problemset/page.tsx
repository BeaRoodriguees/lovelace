import { authConfig } from '@/auth.config';
import Navbar from '@/components/navbar/navbar';
import ProblemsetPage from '@/components/problemset/problemsetPage';
import { NavbarStatus, Problem, ProblemStatus } from '@/lib/types';
import { tagsMock } from '@/mocks/problems';
import { getServerSession } from 'next-auth';

interface ProblemsetResponse {
  problem: Problem;
  user_status: ProblemStatus;
}

export default async function ProblemSetList() {
  const session = await getServerSession(authConfig);
  const getProblemData = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/problemset`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch (error) {
      throw new Error('Erro de conexão com o servidor');
    }
  };

  const problems: Array<Problem> = (await getProblemData()).map(
    (data: ProblemsetResponse) => {
      return {
        ...data.problem,
        user_status: data.user_status as ProblemStatus,
      };
    },
  );

  return (
    <>
      <Navbar status={NavbarStatus.LOGGED}></Navbar>
      <ProblemsetPage problemList={problems} tagsList={tagsMock} />
    </>
  );
}
