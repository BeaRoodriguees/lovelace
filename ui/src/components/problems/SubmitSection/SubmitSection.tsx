'use client';

import { useSession } from 'next-auth/react';
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
  const session = useSession();
  const user = session.data?.user;

  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
  const [submissions, setSubmissions] =
    useState<Array<Submission>>(submissionsData);

  const submit = async () => {
    setSubmissionLoading(true);

    const res = await fetch(`http://localhost:8000/submission/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${user}` },
    });

    const response = await res.json();

    if (res.ok && response) {
      setSubmissions([response, ...submissions]);
      setSubmissionLoading(false);

      return {
        id: response.id,
        status: response.status,
        created_at: response.created_at,
      };
    }

    setSubmissionLoading(false);
    return null;
  };

  return (
    <div style={{ maxWidth: '650px' }}>
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
