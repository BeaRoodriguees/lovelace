import { authConfig } from '@/auth.config';
import Navbar from '@/components/navbar/navbar';
import ProblemsetPage from '@/components/problemset/problemsetPage';
import {
  NavbarStatus,
  Problem,
  ProblemDifficulty,
  ProblemStatus,
  Tags,
} from '@/lib/types';
import { mapToEnum } from '@/lib/utils';
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
        console.log(res.statusText);
        return [];
      }

      const data = await res.json();

      if (!data) {
        return [];
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro de conexão com o servidor');
    }
  };

  const getTags = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/problemset/tags`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (!res.ok) {
        console.log(res.statusText);
        return [];
      }

      const data = await res.json();

      if (!data) {
        return [];
      }

      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro de conexão com o servidor');
    }
  };

  const problems: Array<Problem> = (await getProblemData()).map(
    (data: ProblemsetResponse) => {
      return {
        ...data.problem,
        difficulty: mapToEnum(ProblemDifficulty, data.problem.difficulty),
        user_status: data.user_status as ProblemStatus,
      };
    },
  );

  const tags: Array<Tags> = await getTags();

  return (
    <>
      <Navbar status={NavbarStatus.LOGGED}></Navbar>
      <ProblemsetPage problemList={problems} tagsList={tags} />
    </>
  );
}
