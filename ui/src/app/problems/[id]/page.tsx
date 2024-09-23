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
  SimpleGrid,
  Loader,
} from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { problemMock, submissionMock } from '@/mocks/problem';
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
import { notifications } from '@mantine/notifications';
import { forceDelay } from '@/lib/utils';
import { LanguageEnum, Submission, SubmissionStatus } from '@/lib/types';
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
  id: string;
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

const LANG_ICON_MAP = {
  [LanguageEnum.C]: <IconLetterC aria-label="linguagem C" size={24} />,
  [LanguageEnum.PYTHON]: (
    <IconBrandPython aria-label="linguagem python" size={24} />
  ),
  [LanguageEnum.CPP]: <IconBrandCpp aria-label="linguagem python" size={24} />,
  [LanguageEnum.JAVASCRIPT]: (
    <IconBrandNodejs aria-label="linguagem python" size={24} />
  ),
};

export default function Problem() {
  const session = useSession();
  const user = session.data?.user;
  const openRef = useRef<() => void>(null);
  const [language, setLanguage] = useState<LanguageEnum | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [submissions, setSubmissions] =
    useState<Array<Submission>>(submissionMock);
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);

  const problem: ProblemDetail = problemMock;

  const previews = files.map((file, index) => {
    return <span key={index}>{file.name}</span>;
  });

  async function handleSubmit() {
    notifications.show({
      title: 'Sua submissão foi submetida!',
      message: 'Aguarde o resultado.',
    });
    setFiles([]);
    setLanguage(null);

    setSubmissionLoading(true);
    await forceDelay(5000);

    const newsubs = [
      {
        language: LanguageEnum.PYTHON,
        submittedAt: '13/08/2019 às 14:02:30',
        status: SubmissionStatus.ACCEPTED,
      },
      ...submissions,
    ];

    setSubmissions(newsubs);
    setSubmissionLoading(false);
  }

  return (
    <>
      {user == undefined && <Navbar status={NavbarStatus.HOME} />}
      {user && <Navbar status={NavbarStatus.LOGGED} />}
      <Group
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            maxWidth: '1500px',
          }}
        >
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
            <Box className="boxtablist">
              <Tabs.List>
                <Tabs.Tab
                  value="description"
                  leftSection={<IconNews size={'18'} />}
                >
                  Descrição
                </Tabs.Tab>
              </Tabs.List>
            </Box>

            <Divider
              w={'99vw'}
              style={{
                position: 'absolute',
                left: '0px',
                zIndex: -1,
              }}
            />

            <Tabs.Panel value="description" mt={'xl'} mx={'xl'}>
              <Grid gutter={'xs'}>
                <Grid.Col span={8}>
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
                            <span
                              style={{ fontWeight: 800 }}
                              aria-label={problem.timeLimit + ' segundos'}
                            >
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
                    <Text>{problem.output}</Text>

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
                </Grid.Col>
                <Grid.Col span={4}>
                  <Container>
                    <Group justify="center" mt="md">
                      <Text size="lg">Envie uma solução</Text>
                    </Group>
                    <Flex
                      justify="space-between"
                      align="flex-end"
                      style={{ marginBottom: '1rem' }}
                    ></Flex>
                    <Select
                      placeholder="Escolha uma linguagem"
                      data={Object.keys(LanguageEnum)}
                      value={language}
                      onChange={(value) => setLanguage(value as LanguageEnum)}
                    />
                    <Flex
                      justify="space-between"
                      align="flex-end"
                      style={{ marginBottom: '1rem' }}
                    ></Flex>
                    <Dropzone
                      disabled={language == null}
                      className={
                        language == null ? classes.disabled : classes.dropzone
                      }
                      openRef={openRef}
                      onDrop={setFiles}
                      onReject={(files) => console.log('rejected files', files)}
                      maxSize={5 * 1024 ** 2}
                    >
                      <Group
                        justify="center"
                        gap="md"
                        style={{ pointerEvents: 'none', minHeight: '20px' }}
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
                              Selecione um ou solte o arquivo para submetê-lo.
                            </Text>
                          </Group>
                        </div>
                      </Group>
                    </Dropzone>

                    <SimpleGrid
                      cols={{ base: 1 }}
                      mt={previews.length > 0 ? 'sm' : 0}
                    >
                      {previews}
                    </SimpleGrid>

                    <Button
                      w={'100%'}
                      mt={'sm'}
                      variant="gradient"
                      disabled={previews.length === 0}
                      onClick={() => handleSubmit()}
                    >
                      Submeter
                    </Button>
                    <Divider my="md" />

                    {/* Last Submissions */}
                    <Box>
                      <Title order={4} ta="center">
                        Suas Últimas Submissões
                      </Title>
                      <Flex
                        justify="space-between"
                        align="flex-end"
                        style={{ marginBottom: '1rem' }}
                      ></Flex>
                      <Table highlightOnHover>
                        <thead>
                          <tr>
                            <th>Lang</th>
                            <th>Horário</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {submissionLoading ? (
                            <tr>
                              <th></th>
                              <th>
                                <Loader color="gray" size="sm" />
                              </th>
                              <th></th>
                            </tr>
                          ) : undefined}
                          {submissions.map((submission, index) => {
                            return (
                              <tr key={index}>
                                <th style={{ textAlign: 'center' }}>
                                  {LANG_ICON_MAP[submission.language]}
                                </th>
                                <th style={{ textAlign: 'center' }}>
                                  {submission.submittedAt}
                                </th>
                                <th style={{ textAlign: 'center' }}>
                                  {submission.status}
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Box>
                  </Container>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Group>
    </>
  );
}
