'use client';

import { Divider } from '@mantine/core';
import SubmitDnd from './SubmitDnd';
import SubmissionHistory from './SubmissionHistory';
import { useState } from 'react';
import { Submission } from '@/lib/types';

export default function SubmitSection({
  submissionsData,
  problemId,
}: {
  submissionsData: Array<Submission>;
  problemId: number;
}) {
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
  const [submissions, setSubmissions] =
    useState<Array<Submission>>(submissionsData);

  return (
    <div style={{ maxWidth: '650px' }}>
      <SubmitDnd
        setSubmissionLoading={setSubmissionLoading}
        setSubmissions={setSubmissions}
        submissions={submissions}
        problemId={problemId}
      />
      <Divider my="md" />
      <SubmissionHistory
        submissionLoading={submissionLoading}
        submissions={submissions}
      />
    </div>
  );
}
