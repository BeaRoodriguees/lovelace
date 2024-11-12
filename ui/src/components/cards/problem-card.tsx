'use client';

import { IconChevronRight, IconX, IconCheck } from '@tabler/icons-react';
import {
  IconAntennaBars1,
  IconAntennaBars2,
  IconAntennaBars3,
  IconAntennaBars4,
  IconAntennaBars5,
} from '@tabler/icons-react';
import { ProblemDifficulty, ProblemStatus } from '@/lib/types';
import { CardType, Problem } from '@/lib/types';
import { LovelaceCard } from '@/components/LovelaceCard';
import classes from './problem-card.module.css';
import { ElementType } from 'react';

interface ProblemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Problem;
}

export default function ProblemCard({ data, ...rest }: ProblemCardProps) {
  let cardType;
  let icon = undefined;
  let DifficultyIcon: ElementType | undefined = undefined;

  switch (data.user_status) {
    case ProblemStatus.WRONG:
      cardType = CardType.ERROR;
      icon = IconX;
      break;
    case ProblemStatus.CORRECT:
      cardType = CardType.SUCCESS;
      icon = IconCheck;
      break;
    default:
      cardType = CardType.DEFAULT;
      break;
  }

  switch (data.difficulty) {
    case ProblemDifficulty.very_easy:
      DifficultyIcon = IconAntennaBars1;
      break;
    case ProblemDifficulty.easy:
      DifficultyIcon = IconAntennaBars2;
      break;
    case ProblemDifficulty.medium:
      DifficultyIcon = IconAntennaBars3;
      break;
    case ProblemDifficulty.hard:
      DifficultyIcon = IconAntennaBars4;
      break;
    case ProblemDifficulty.very_hard:
      DifficultyIcon = IconAntennaBars5;
      break;
  }

  // If the card is clickable, problem link is passed to the Root
  const problemLink = `/problems/${data.id}`;
  return (
    <div {...rest}>
      <LovelaceCard.Root type={cardType} href={problemLink}>
        <LovelaceCard.Status icon={icon} type={cardType} />
        <LovelaceCard.Content>
          <div className={classes.top}>
            {DifficultyIcon ? (
              <DifficultyIcon
                className={classes.icon}
                stroke={3}
                height={18}
                viewBox={'0 5 24 18'} // Black magic
              />
            ) : null}
            <span>{data.difficulty}</span>
          </div>
          <LovelaceCard.Title text={data.name} />
          <LovelaceCard.Tags tags={data.tags} />
        </LovelaceCard.Content>
        <LovelaceCard.Side
          label={'Dificuldade'}
          text={data.difficulty}
          className={classes.side}
        />
        <LovelaceCard.Action icon={IconChevronRight} type={cardType} />
      </LovelaceCard.Root>
    </div>
  );
}
