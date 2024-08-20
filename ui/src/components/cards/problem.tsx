'use client';

import Link from 'next/link';
import { Text, Card, Badge, Button } from '@mantine/core';
import classes from './problem.module.css';
import { IconChevronRight } from '@tabler/icons-react';
import ProblemStatusDisplay, { ProblemStatus } from './problem-status';

export default function ProblemCard() {
  const tags = ['Array', 'binário', 'Ponteiros'];
  const title = 'A Festa dos Expendables';
  const dificulty = 'Muito difícil';

  return (
    <Card radius="md" className={classes.card} shadow="xs">
      <div className={classes.inner}>
        <ProblemStatusDisplay status={ProblemStatus.TODO} />
        <div className={classes.middle}>
          <Text fz="xl" className={classes.label}>
            {title}
          </Text>
          <div className={classes.tags}>
            {tags.map((tag, index) => {
              return (
                <Badge variant="outline" size="sm" key={index}>
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className={classes.dificulty}>
          <Text fz="sm" c="dimmed">
            Dificuldade
          </Text>
          <Text fz="md" className={classes.label}>
            {dificulty}
          </Text>
        </div>
        <Button
          component={Link}
          href="#"
          variant="transparent"
          className={classes.icon}
          p={2}
        >
          <IconChevronRight width={40} height={40} />
        </Button>
      </div>
    </Card>
  );
}
