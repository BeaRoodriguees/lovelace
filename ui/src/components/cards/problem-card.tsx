import { IconChevronRight, IconX, IconCheck } from '@tabler/icons-react';
import { ProblemStatus } from '@/lib/types';
import { CardType, Problem } from '@/lib/types';
import { LovelaceCard } from '@/components/LovelaceCard';

interface ProblemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Problem;
  clickable?: boolean;
}

export default function ProblemCard({
  data,
  clickable,
  ...rest
}: ProblemCardProps) {
  let cardType;
  let icon = undefined;

  switch (data.status) {
    case ProblemStatus.ERROR:
      cardType = CardType.ERROR;
      icon = IconX;
      break;
    case ProblemStatus.DONE:
      cardType = CardType.SUCCESS;
      icon = IconCheck;
      break;
    default:
      cardType = CardType.DEFAULT;
      break;
  }

  // If the card is clickable, problem link is passed to the Root
  // NOTE: Temporary problem url
  const href = clickable ? `/problemset/${data.slug}` : undefined;

  return (
    <div {...rest}>
      <LovelaceCard.Root type={cardType} href={href}>
        <LovelaceCard.Status icon={icon} type={cardType} />
        <LovelaceCard.Content>
          <LovelaceCard.Title text={data.title} />
          <LovelaceCard.Tags tags={data.tags} />
        </LovelaceCard.Content>
        <LovelaceCard.Side label={'Difficulty'} text={data.difficulty} />
        <LovelaceCard.Action
          icon={IconChevronRight}
          type={cardType}
          href={`/problemset/${data.slug}`}
        />
      </LovelaceCard.Root>
    </div>
  );
}
