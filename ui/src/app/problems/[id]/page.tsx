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
  Button,
  Group,
  rem,
  Select,
  Grid,
} from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import { problemMock } from '@/mocks/problem';
import {
  IconNews,
  IconX,
  IconBrandPython,
  IconBrandCpp,
  IconBrandNodejs,
  IconLetterC,
  IconCloudUpload,
} from '@tabler/icons-react';
import classes from './page.module.css';

export interface TestCase {
  id: number;
  input: string;
  output: string;
}

export interface Language {
  id: number;
  icon: object;
  name: string;
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
  //languages: Language[];
}

export default function Problem(props: Partial<DropzoneProps>) {
  const session = useSession();
  const user = session.data?.user;
  const openRef = useRef<() => void>(null);

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
          <Grid>
            <Grid.Col span={9}>
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
                          <span style={{ fontWeight: 800 }}>
                            {problem.author}
                          </span>{' '}
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
                                    '\n'.repeat(
                                      maxLines - countLinesOfInput + 1,
                                    )}
                                </Code>
                              </Table.Td>
                              <Table.Td>
                                <Code block>
                                  {testcase.output +
                                    '\n'.repeat(
                                      maxLines - countLinesOfOutput + 1,
                                    )}
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
            </Grid.Col>
            <Grid.Col span={3}>
              <Group justify="center" mt="md">
                <Title order={4}>Envie uma solução</Title>
              </Group>
              <Flex
                justify="space-between"
                align="flex-end"
                style={{ marginBottom: '1rem' }}
              ></Flex>
              <Select
                placeholder="Escolha uma linguagem"
                data={['C', 'C++', 'Javascript', 'Python']}
              />
              <Flex
                justify="space-between"
                align="flex-end"
                style={{ marginBottom: '1rem' }}
              ></Flex>
              <Dropzone
                openRef={openRef}
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                styles={{
                  root: {
                    border: '2px dashed white', // Change the border to white
                    backgroundColor: 'transparent', // Optionally, ensure the background stays transparent
                  },
                }}
                {...props}
              >
                <Group
                  justify="center"
                  gap="xl"
                  mih={220}
                  style={{ pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconCloudUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-blue-6)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-red-6)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: 'var(--mantine-color-dimmed)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Group justify="center" mt="md">
                      <Text size="xl" inline>
                        Envie um arquivo
                      </Text>
                      <Text size="sm" c="dimmed" inline mt={7}>
                        Arraste e solte o arquivo para submetê-lo. Aceitaremos
                        apenas arquivos da linguagem escolhida acima
                      </Text>
                    </Group>
                  </div>
                </Group>
              </Dropzone>

              <Group justify="center" mt="md">
                <Button onClick={() => openRef.current?.()}>
                  Selecione um arquivo
                </Button>
              </Group>
              <Divider my="md" />
              <Box>
                <Title order={4} ta="center">
                  Suas Últimas Submissões
                </Title>
                <Table highlightOnHover>
                  <thead>
                    <tr>
                      <th>Lang</th>
                      <th>Horário</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <IconBrandCpp size={24} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        13/08/2019 às 21:15:28
                      </td>
                      <td style={{ textAlign: 'center' }}>AC</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <IconBrandPython size={24} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        13/08/2019 às 21:15:28
                      </td>
                      <td style={{ textAlign: 'center' }}>WA</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <IconBrandNodejs size={24} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        13/08/2019 às 21:15:28
                      </td>
                      <td style={{ textAlign: 'center' }}>TL</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: 'center' }}>
                        <IconLetterC size={24} />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        13/08/2019 às 21:15:28
                      </td>
                      <td style={{ textAlign: 'center' }}>ER</td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
