'use client';

import { LanguageEnum, Submission, SubmissionStatus } from '@/lib/types';
import { forceDelay } from '@/lib/utils';
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

interface SubmissionDndProps {
  setSubmissionLoading: (submissionLoading: boolean) => void;
  setSubmissions: (submissons: Array<Submission>) => void;
  submissions: Array<Submission>;
}

export default function DropdownSection(props: SubmissionDndProps) {
  const openRef = useRef<() => void>(null);
  const [language, setLanguage] = useState<LanguageEnum | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    return <span key={index}>{file.name}</span>;
  });

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;
  };

  async function handleSubmit() {
    notifications.show({
      title: 'Sua submissão foi submetida!',
      message: 'Aguarde o resultado.',
    });
    setFiles([]);
    setLanguage(null);

    props.setSubmissionLoading(true);
    await forceDelay(5000);

    const newsubs = [
      {
        language: LanguageEnum.PYTHON,
        submittedAt: formatDate(new Date()),
        status: SubmissionStatus.ACCEPTED,
      },
      ...props.submissions,
    ];

    props.setSubmissions(newsubs);
    props.setSubmissionLoading(false);
  }

  return (
    <>
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
    </>
  );
}
