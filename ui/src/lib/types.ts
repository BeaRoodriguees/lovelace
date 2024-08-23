export enum ProblemStatus {
  DONE = 'DONE',
  TODO = 'TODO',
  ERROR = 'ERROR',
}

export interface ProblemCardData {
  status: ProblemStatus;
  title: string;
  tags: Array<string>;
  difficulty: string;
}
