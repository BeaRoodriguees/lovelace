'use client';

import { Problem } from '@/lib/types';
import { Code, Table, Title } from '@mantine/core';

export default function TestCase({ problem }: { problem: Problem }) {
  return (
    <div>
      <Title pt={'md'} order={2}>
        Casos de teste
      </Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Exemplo de Entrada</Table.Th>
            <Table.Th>Exemplo de Saída</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {problem.testcases.map((testcase) => {
            const countLinesOfInput = testcase.input.split('\n').length;
            const countLinesOfOutput = testcase.output.split('\n').length;
            const maxLines = Math.max(countLinesOfInput, countLinesOfOutput);

            return (
              <Table.Tr key={testcase.id}>
                <Table.Td>
                  <Code block>
                    {testcase.input +
                      '\n'.repeat(maxLines - countLinesOfInput + 1)}
                  </Code>
                </Table.Td>
                <Table.Td>
                  <Code block>
                    {testcase.output +
                      '\n'.repeat(maxLines - countLinesOfOutput + 1)}
                  </Code>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
}
