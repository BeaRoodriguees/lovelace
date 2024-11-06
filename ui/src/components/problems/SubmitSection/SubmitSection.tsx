'use client';

import { Divider } from '@mantine/core';
import SubmitDnd from './SubmitDnd';
import SubmissionHistory from './SubmissionHistory';
import { useState } from 'react';
import { Submission } from '@/lib/types';

export default function SubmitSection({
  submissionsData,
}: {
  submissionsData: Array<Submission>;
}) {
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
  const [submissions, setSubmissions] =
    useState<Array<Submission>>(submissionsData);

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
