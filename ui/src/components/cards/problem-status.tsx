import { IconCheck, IconX } from '@tabler/icons-react';
import classes from './problem-status.module.css';
import React from 'react';

enum ProblemStatus {
  DONE = 'DONE',
  TODO = 'TODO',
  ERROR = 'ERROR',
}

function ProblemStatusContainer({ children }: { children?: React.ReactNode }) {
  return <div className={classes.container}>{children}</div>;
}

export default function ProblemStatusDisplay({
  status,
}: {
  status?: ProblemStatus;
}) {
  switch (status) {
    case ProblemStatus.DONE:
      return (
        <ProblemStatusContainer>
          <IconCheck className={classes.icon} width={40} height={40} />
        </ProblemStatusContainer>
      );
    case ProblemStatus.ERROR:
      return (
        <ProblemStatusContainer>
          <IconX />
        </ProblemStatusContainer>
      );
    default:
      return <ProblemStatusContainer></ProblemStatusContainer>;
  }
}

export { ProblemStatus };
