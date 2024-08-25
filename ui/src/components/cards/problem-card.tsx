import { IconChevronRight, IconX, IconCheck } from '@tabler/icons-react';
import { ProblemStatus } from '@/lib/types';
import { CardType, ProblemCardData } from '@/lib/types';
import { LovelaceCard } from '@/components/LovelaceCard';

export default function ProblemCard({ data }: { data: ProblemCardData }) {
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

  return (
    <LovelaceCard.Root type={cardType} href={'/'}>
      <LovelaceCard.Status icon={icon} type={cardType} />
      <LovelaceCard.Content>
        <LovelaceCard.Title text={data.title} />
        <LovelaceCard.Tags tags={data.tags} />
      </LovelaceCard.Content>
      <LovelaceCard.Side label={'Difficulty'} text={data.difficulty} />
      <LovelaceCard.Action icon={IconChevronRight} type={cardType} />
    </LovelaceCard.Root>
  );
}
