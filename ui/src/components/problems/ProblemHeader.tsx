'use client';

import { ProblemDetail } from '@/lib/types';
import { Flex, Title } from '@mantine/core';

export default function ProblemHeader({ problem }: { problem: ProblemDetail }) {
  return (
    <div>
      <Title order={1}>{problem.name}</Title>
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginBottom: '1rem' }}
      >
        {/* <span>
          Criado por <span style={{ fontWeight: 700 }}>{problem.author}</span>{' '}
          em {problem.createdAt}
        </span> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100vw',
          }}
        >
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
        </div>
      </Flex>
    </div>
  );
}
