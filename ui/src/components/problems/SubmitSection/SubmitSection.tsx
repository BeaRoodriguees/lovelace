'use client';

import { Divider } from '@mantine/core';
import SubmitDnd from './SubmitDnd';
import SubmissionHistory from './SubmissionHistory';
import { useState } from 'react';
import { Submission } from '@/lib/types';
import { submissionMock } from '@/mocks/problem';

export default function SubmitSection() {
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
  const [submissions, setSubmissions] =
    useState<Array<Submission>>(submissionMock);

  return (
    <div>
      <SubmitDnd
        setSubmissionLoading={setSubmissionLoading}
        setSubmissions={setSubmissions}
        submissions={submissions}
      />
      <Divider my="md" />
      <SubmissionHistory
        submissionLoading={submissionLoading}
        submissions={submissions}
      />
    </div>
  );
}
