'use client';

import { LanguageEnum, Submission, SubmissionStatus } from '@/lib/types';
import {
  Button,
  Flex,
  Group,
  rem,
  Select,
  SimpleGrid,
  Title,
  Text,
} from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { IconCloudUpload, IconX } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import classes from './submitdnd.module.css';
import { useSession } from 'next-auth/react';
import { forceDelay } from '@/lib/utils';

interface SubmissionDndProps {
  setSubmissionLoading: (submissionLoading: boolean) => void;
  setSubmissions: (submissons: Array<Submission>) => void;
  submissions: Array<Submission>;
  problemId: number;
}

export default function DropdownSection(props: SubmissionDndProps) {
  const session = useSession();
  const user = session.data?.user;
  const openRef = useRef<() => void>(null);
  const [language, setLanguage] = useState<LanguageEnum | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    return <span key={index}>{file.name}</span>;
  });

  const handleSubmit = async () => {
    props.setSubmissionLoading(true);
    const body = {
      problem_id: props.problemId,
      language: language,
      body: await files[0].text(),
    };

    await forceDelay(1000);

    const res = await fetch(`http://localhost:8000/submission/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    if (res.ok && response) {
      notifications.show({
        title: 'Sua submissão foi submetida!',
        message: 'Aguarde o resultado.',
      });
    } else {
      notifications.show({
        title: 'Erro ao submeter a solução!',
        message: 'Tente novamente.',
      });
    }

    const newsubs = [
      {
        language:
          LanguageEnum[
            response.language.toUpperCase() as keyof typeof LanguageEnum
          ],
        created_at: response.created_at,
        status:
          SubmissionStatus[
            response.status.toLowerCase() as keyof typeof SubmissionStatus
          ],
      },
      ...props.submissions,
    ].slice(0, 5);

    props.setSubmissions(newsubs);
    props.setSubmissionLoading(false);

    return null;
  };

  return (
    <div className={classes.section}>
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
        className={language == null ? classes.disabled : classes.dropzone}
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

      <SimpleGrid cols={{ base: 1 }} mt={previews.length > 0 ? 'sm' : 0}>
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
    </div>
  );
}
