export enum NavbarStatus {
  HOME = 'HOME',
  LOGGED = 'LOGGED',
  AUTH = 'AUTH',
}

export enum CardType {
  SUCCESS = 'SUCCESS',
  DEFAULT = 'DEFAULT',
  ERROR = 'ERROR',
  DISABLED = 'DISABLED',
}

export enum ProblemDifficulty {
  very_hard = 'Muito Difícil',
  hard = 'Difícil',
  medium = 'Médio',
  easy = 'Fácil',
  very_easy = 'Muito Fácil',
}

export enum ProblemStatus {
  CORRECT = 'correct',
  TODO = 'todo',
  WRONG = 'wrong',
}

export enum LanguageEnum {
  C = 'C',
  CPP = 'CPP',
  JAVASCRIPT = 'JAVASCRIPT',
  PYTHON = 'PYTHON',
}

export enum SubmissionStatus {
  wrong_answer = 'WRONG ANSWER',
  accepted = 'ACCEPTED',
  compilation_error = 'COMPILATION_ERROR',
  runtime_error = 'RUNTIME_ERROR',
  time_limit_exceeded = 'TIME_LIMIT_EXCEEDED',
  pending = 'PENDING',
  presentation_error = 'PRESENTATION_ERROR',
  running = 'RUNNING',
  memory_limit_exceeded = 'MEMORY_LIMIT_EXCEEDED',
  server_error = 'SERVER_ERROR',
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface Problem {
  id: number;
  name: string;
  description: string;
  difficulty: ProblemDifficulty;
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

export interface TestCase {
  id: number;
  input: string;
  output: string;
}

export interface Tags {
  id: number;
  name: string;
}

export type ProblemSetFilterData = {
  tags: Array<string>;
  difficulties: Array<string>;
  status: Array<string>;
  titleFragment: string;
};

export type Submission = {
  language: LanguageEnum;
  created_at: string;
  status: SubmissionStatus;
};

export interface Language {
  id: number;
  icon: object;
  name: string;
}
