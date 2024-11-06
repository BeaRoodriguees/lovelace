import { Badge } from '@mantine/core';
import classes from './LovelaceCardTags.module.css';
import { Tags } from '@/lib/types';

interface LovelaceCardTagsProps {
  tags: Array<Tags>;
}

export default function LovelaceCardTags({ tags }: LovelaceCardTagsProps) {
  return (
    <div className={classes.tags}>
      {tags.map((tag, index) => {
        return (
          <Badge variant="outline" size="sm" key={index}>
            {tag.name}
          </Badge>
        );
      })}
    </div>
  );
}
