'use client';

import { Problem } from '@/lib/types';
import { Flex, Title } from '@mantine/core';
import { formatDate } from '@/lib/utils';

export default function ProblemHeader({ problem }: { problem: Problem }) {
  return (
    <div>
      <Title order={1}>{problem.name}</Title>
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginBottom: '1rem' }}
      >
        <span>
          Criado por{' '}
          <span style={{ fontWeight: 700 }}>{problem.author.username}</span> em{' '}
          {formatDate(problem.created_at)}
        </span>
        <Flex direction="column">
          <span>
            Tópicos:{' '}
            <span style={{ fontWeight: 700 }}>
              {problem.tags
                .map((tags) => {
                  return tags.name;
                })
                .join(', ')}{' '}
            </span>{' '}
          </span>
          <span>
            Tempo limite:{' '}
            <span
              style={{ fontWeight: 700 }}
              aria-label={problem.time_limit / 1000 + ' segundos'}
            >
              {problem.time_limit / 1000}s{' '}
            </span>
            | Memória limite:{' '}
            <span style={{ fontWeight: 700 }}>
              {problem.memory_limit / 100} MB
            </span>{' '}
          </span>
        </Flex>
      </Flex>
    </div>
  );
}
