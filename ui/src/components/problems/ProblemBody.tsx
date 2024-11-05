'use client';

import { Box, Divider, Title, Text } from '@mantine/core';
import { ProblemDetail } from '@/lib/types';
import ProblemHeader from './ProblemHeader';
import TestCases from './TestCases';

export default function ProblemBody({ problem }: { problem: ProblemDetail }) {
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
      <Text>{problem.problem_input}</Text>

      {/* Output */}
      <Title pt={'sm'} order={2}>
        Saída
      </Title>
      <Text>{problem.problem_output}</Text>

      {/* Examples */}
      <TestCases problem={problem} />
    </Box>
  );
}
