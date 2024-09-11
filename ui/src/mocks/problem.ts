import { ProblemDetail } from '@/app/problems/[id]/page';

export const problemMock: ProblemDetail = {
  id: 1,
  title: 'Em Busca do Ouro Branco',
  description: `
  Bea está desejando comer um Ouro Branco, e o único lugar perto dela que vende é a Banquinha do Paes, que fica do outro lado de uma enorme muralha, que se estende infinitamente para os dois lados. Ela sabe que há uma porta e que está a X passos de sua posição original. Só que há um problema, Bea não sabe a quantos passos a porta está dela e nem se está a sua esquerda ou direita. Porém, ela pensou uma estratégia para encontrar a porta.\n
  Sua estratégia é andar um passo para a direita, depois dois para a esquerda, depois três a direita, e assim sucessivamente, até encontrar a porta. Ela não sabe exatamente se esta é um boa estratégia, então decidiu chamar você para ajudá-la.
  Faça um programa que dado a distância X que a porta está da posição inicial de Bea, informe quantos passos serão necessário para encontrá-la, caso ela esteja à direita ou à esquerda.`,
  timeLimit: 1,
  memoryLimit: 1024,
  author: 'BeaRodrigues',
  createdAt: '13/07/2024',
  topics: ['decisão', 'ordenação'],
  input:
    'A entrada é composta por vários casos testes. Cada caso consiste de uma linha contendo um inteiro X que representa a quantos passos da posição inicial de Bea a porta se encontra. A entrada termina quando X = 0.',
  output:
    'Para cada caso teste da entrada, imprima uma linha com a quantidade de passos necessário caso a porta esteja à direita e à esquerda, respectivamente.',
  testcases: [
    {
      id: 1,
      input: '2\n',
      output: '6 10\n45 55\n66 78',
    },
    {
      id: 2,
      input: '2\n5\n6\n0',
      output: '6 10\n45 55\n66 78',
    },
  ],
};
