import { Badge } from '@mantine/core';
import classes from './LovelaceCardTags.module.css';

interface LovelaceCardTagsProps {
  tags: Array<string>;
}

export default function LovelaceCardTags({ tags }: LovelaceCardTagsProps) {
  return (
    <div className={classes.tags}>
      {tags.map((tag, index) => {
        return (
          <Badge variant="outline" size="sm" key={index}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}
