'use client';

import { LanguageEnum, Submission } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Box, Flex, Loader, Table, Title, Text } from '@mantine/core';
import {
  IconBrandCpp,
  IconBrandNodejs,
  IconBrandPython,
  IconLetterC,
} from '@tabler/icons-react';

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

interface SubmissionHistoryProps {
  submissionLoading: boolean;
  submissions: Array<Submission>;
}

export default function SubmissionHistory(props: SubmissionHistoryProps) {
  return (
    <Box>
      <Title order={4} ta="center">
        Suas Últimas Submissões
      </Title>
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginBottom: '1rem' }}
      ></Flex>

      {props.submissions.length === 0 ? (
        <Flex direction="column" align="center" w="100%">
          <Text>Não há submissões para este problema.</Text>
        </Flex>
      ) : (
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Lang</th>
              <th>Horário</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.submissionLoading ? (
              <tr>
                <th></th>
                <th>
                  <Loader color="gray" size="sm" />
                </th>
                <th></th>
              </tr>
            ) : undefined}

            {props.submissions?.map((submission, index) => {
              return (
                <tr key={index}>
                  <th style={{ textAlign: 'center' }}>
                    {LANG_ICON_MAP[submission.language]}
                  </th>
                  <th style={{ textAlign: 'center' }}>
                    {formatDate(new Date(Date.parse(submission.created_at)))}
                  </th>
                  <th style={{ textAlign: 'center' }}>{submission.status}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Box>
  );
}
