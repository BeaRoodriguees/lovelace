'use client';

import { problemMock } from '@/mocks/problem';
import { Box, Divider, Title, Text } from '@mantine/core';
import { ProblemDetail } from '@/lib/types';
import ProblemHeader from './ProblemHeader';
import TestCases from './TestCases';

export default function ProblemBody() {
  const problem: ProblemDetail = problemMock;

  return (
    <Box>
      <ProblemHeader problem={problem} />

      <Divider my="md" />

      {problem.description.split('\n').map((paragraph, index) => (
        <Text key={index} pt={'xs'} ta={'justify'}>
          {paragraph}
        </Text>
      ))}

      {/* Entry */}
      <Title pt={'sm'} order={2}>
        Entrada
      </Title>
      <Text>{problem.input}</Text>

      {/* Output */}
      <Title pt={'sm'} order={2}>
        Saída
      </Title>
      <Text>{problem.output}</Text>

      {/* Examples */}
      <TestCases problem={problem} />
    </Box>
  );
}
