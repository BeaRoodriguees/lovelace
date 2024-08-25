import ProblemCard from '@/components/cards/problem-card';
import classes from './playground.module.css';
import ThemeSwitcher from '@/components/misc/theme-switcher';
import { ProblemStatus } from '@/lib/types';

export default function PlaygrondPage() {
  const problems = [
    {
      status: ProblemStatus.TODO,
      title: 'Two Sum',
      tags: ['array', 'hashmap', 'recursion'],
      difficulty: 'easy',
    },
    {
      status: ProblemStatus.TODO,
      title: 'Longest Substring Without Repeating Characters',
      tags: ['string', 'sliding window'],
      difficulty: 'medium',
    },
    {
      status: ProblemStatus.ERROR,
      title: 'Median of Two Sorted Arrays',
      tags: [
        'array',
        'binary search',
        'eof',
        'pointer',
        'array',
        'binary search',
        'eof',
        'pointer',
      ],
      difficulty: 'Muito Difícil',
    },
    {
      status: ProblemStatus.ERROR,
      title: 'Valid Parentheses',
      tags: ['stack', 'string'],
      difficulty: 'easy',
    },
    {
      status: ProblemStatus.DONE,
      title: 'Merge Intervals',
      tags: ['array', 'sorting'],
      difficulty: 'medium',
    },
    {
      status: ProblemStatus.TODO,
      title: 'Em busca do Ouro Branco',
      tags: ['array', 'pointer', 'eof', 'recursion'],
      difficulty: 'hard',
    },
  ];

  const elements = problems.map((problem, index) => {
    return <ProblemCard key={index} data={problem}></ProblemCard>;
  });

  return (
    <div className={classes.container}>
      <ThemeSwitcher></ThemeSwitcher>
      <div>inicio</div>
      {elements}
      <div>fim</div>
    </div>
  );
}
