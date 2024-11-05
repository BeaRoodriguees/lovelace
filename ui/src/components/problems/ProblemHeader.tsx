'use client';

import { ProblemDetail } from '@/lib/types';
import { Flex, Title } from '@mantine/core';

export default function ProblemHeader({ problem }: { problem: ProblemDetail }) {
  return (
    <div>
      <Title order={1}>{problem.title}</Title>
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginBottom: '1rem' }}
      >
        <span>
          Criado por <span style={{ fontWeight: 800 }}>{problem.author}</span>{' '}
          em {problem.createdAt}
        </span>
        <Flex direction={'column'}>
          <span>
            Tópicos:{' '}
            <span style={{ fontWeight: 800 }}>
              {' '}
              {problem.topics.join(', ')}{' '}
            </span>{' '}
          </span>
          <span>
            Tempo limite:{' '}
            <span
              style={{ fontWeight: 800 }}
              aria-label={problem.timeLimit + ' segundos'}
            >
              {problem.timeLimit}s{' '}
            </span>
            | Memória limite:{' '}
            <span style={{ fontWeight: 800 }}>{problem.memoryLimit} MB</span>{' '}
          </span>
        </Flex>
      </Flex>
    </div>
  );
}
