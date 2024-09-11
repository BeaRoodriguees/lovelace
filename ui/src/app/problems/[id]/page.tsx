'use client';
import Navbar, { NavbarStatus } from '@/components/navbar/navbar';
import {
  Box,
  Code,
  Container,
  Divider,
  Flex,
  Table,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import { problemMock } from '@/mocks/problem';
import { IconNews } from '@tabler/icons-react';
import classes from './page.module.css';

export interface TestCase {
  id: number;
  input: string;
  output: string;
}

export interface ProblemDetail {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  author: string;
  createdAt: string;
  topics: string[];
  input: string;
  output: string;
  testcases: TestCase[];
}

export default function Problem() {
  const session = useSession();
  const user = session.data?.user;

  const problem: ProblemDetail = problemMock;

  return (
    <>
      {user == undefined && <Navbar status={NavbarStatus.HOME} />}
      {user && <Navbar status={NavbarStatus.LOGGED} />}
      <Tabs
        defaultValue={'description'}
        variant="outline"
        classNames={{
          root: classes.tabs,
          list: classes.tabsList,
          tab: classes.tab,
        }}
        mt={'xl'}
      >
        <Box ml={32} mr={32}>
          <Tabs.List>
            <Tabs.Tab
              value="description"
              leftSection={<IconNews size={'18'} />}
            >
              Descrição
            </Tabs.Tab>
          </Tabs.List>
        </Box>
        <Divider mb={'xl'} />
        <Tabs.Panel value="description" mt={'sm'} m={'xl'}>
          <Container>
            <Flex justify={'center'}>
              <Box>
                <div>
                  <Title order={1}>{problem.title}</Title>
                  <Flex
                    justify="space-between"
                    align="flex-end"
                    style={{ marginBottom: '1rem' }}
                  >
                    <span>
                      Criado por{' '}
                      <span style={{ fontWeight: 800 }}>{problem.author}</span>{' '}
                      em {problem.createdAt}
                    </span>
                    <Flex direction={'column'}>
                      <span>Tópicos: {problem.topics.join(', ')}</span>
                      <span>
                        Tempo limite:{' '}
                        <span style={{ fontWeight: 800 }}>
                          {problem.timeLimit}s{' '}
                        </span>
                        | Memória limite:{' '}
                        <span style={{ fontWeight: 800 }}>
                          {problem.memoryLimit} MB
                        </span>{' '}
                      </span>
                    </Flex>
                  </Flex>
                </div>
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
                <Text>Saída: {problem.output}</Text>

                {/* Examples */}
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
                      const countLinesOfInput =
                        testcase.input.split('\n').length;
                      const countLinesOfOutput =
                        testcase.output.split('\n').length;
                      const maxLines = Math.max(
                        countLinesOfInput,
                        countLinesOfOutput,
                      );

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
              </Box>
            </Flex>
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
