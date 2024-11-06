export enum ProblemStatus {
  CORRECT = 'correct',
  TODO = 'todo',
  WRONG = 'wrong',
}

export enum CardType {
  SUCCESS = 'SUCCESS',
  DEFAULT = 'DEFAULT',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
}

export type ProblemSetFilterData = {
  tags: Array<string>;
  difficulties: Array<string>;
  status: Array<string>;
  titleFragment: string;
};

export enum LanguageEnum {
  C = 'C',
  CPP = 'CPP',
  JAVASCRIPT = 'Javascript',
  PYTHON = 'Python',
}

export type Submission = {
  language: LanguageEnum;
  created_at: string;
  status: SubmissionStatus;
};

export enum SubmissionStatus {
  ACCEPTED = 'AC',
  TIME_LIMIT = 'TL',
  ERROR = 'ER',
  WRONG_ANSWER = 'WA',
  MEMORY_LIMITE = 'ML',
}

export interface TestCase {
  id: number;
  input: string;
  output: string;
}

export interface Language {
  id: number;
  icon: object;
  name: string;
}

export interface Tags {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface Problem {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  time_limit: number;
  memory_limit: number;
  author: User;
  created_at: Date;
  tags: Tags[];
  problem_input: string;
  problem_output: string;
  testcases: TestCase[];
  user_status: ProblemStatus;
}

export enum NavbarStatus {
  HOME = 'HOME',
  LOGGED = 'LOGGED',
  AUTH = 'AUTH',
}
