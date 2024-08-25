export enum ProblemStatus {
  DONE = 'DONE',
  TODO = 'TODO',
  ERROR = 'ERROR',
}

export enum CardType {
  SUCCESS = 'SUCCESS',
  DEFAULT = 'DEFAULT',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
}

export type Problem = {
  id: string;
  status: ProblemStatus;
  title: string;
  tags: Array<string>;
  difficulty: string;
  slug: string;
};
