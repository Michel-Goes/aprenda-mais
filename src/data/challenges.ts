import imgLobos from '../assets/images/lobos.jpg';
import imgAbelhas from '../assets/images/abelhas.jpg';
import imgEstrelas from '../assets/images/estrelas.jpg';
import imgCaixas from '../assets/images/caixas.jpg';
import imgAguaPedra from '../assets/images/agua-pedra.jpg';

export interface Challenge {
  module: string;
  question: string;
  hint: string;
  image?: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export const portugueseChallenges: Challenge[] = [
  {
    module: 'Módulo 1: Natureza',
    question: 'Qual é o coletivo de lobos?',
    hint: 'É um termo também usado para designar bandos familiares.',
    image: imgLobos,
    options: [
      { id: 'A', text: 'Pillars' },
      { id: 'B', text: 'Alcateia' },
      { id: 'C', text: 'Cardume' },
      { id: 'D', text: 'Vara' },
    ],
    correctAnswer: 'B',
    explanation: 'O coletivo correto para um grupo de lobos é alcateia.',
  },
  {
    module: 'Módulo 1: Natureza',
    question: 'Qual é o coletivo de abelhas?',
    hint: 'É um termo muito associado ao zumbido e ao agrupamento desses insetos.',
    image: imgAbelhas,
    options: [
      { id: 'A', text: 'Enxame' },
      { id: 'B', text: 'Ninhada' },
      { id: 'C', text: 'Rebanho' },
      { id: 'D', text: 'Manada' },
    ],
    correctAnswer: 'A',
    explanation: 'O termo formal utilizado para descrever um grande grupo de abelhas voando ou trabalhando juntas é enxame.',
  },
  {
    module: 'Módulo 2: Universo',
    question: 'Qual é o nome dado a um grupo de estrelas?',
    hint: 'As doze mais famosas formam as figuras do zodíaco.',
    image: imgEstrelas,
    options: [
      { id: 'A', text: 'Arquipélago' },
      { id: 'B', text: 'Galáxia' },
      { id: 'C', text: 'Constelação' },
      { id: 'D', text: 'Sideral' },
    ],
    correctAnswer: 'C',
    explanation: 'Constelação é a área do céu onde um agrupamento de estrelas forma figuras imaginárias.',
  },
  {
    module: 'Módulo 3: Ortografia',
    question: 'Qual é a forma correta de escrita?',
    hint: 'Refere-se ao ato de guardar algo dentro de uma caixa de papelão.',
    image: imgCaixas,
    options: [
      { id: 'A', text: 'Encaixotar' },
      { id: 'B', text: 'Encaxotar' },
      { id: 'C', text: 'Encaichotar' },
      { id: 'D', text: 'Encaxiotar' },
    ],
    correctAnswer: 'A',
    explanation: 'A palavra deriva de "caixa" (com x), portanto a maneira correta de grafá-la é encaixotar.',
  },
  {
    module: 'Módulo 5: Literatura',
    question: 'Na frase "A gota d\'água dançava sobre a pedra", qual figura de linguagem foi utilizada?',
    hint: 'Essa figura de linguagem atribui ações ou sentimentos humanos a seres inanimados.',
    image: imgAguaPedra,
    options: [
      { id: 'A', text: 'Ironia' },
      { id: 'B', text: 'Personificação' },
      { id: 'C', text: 'Pleonasmo' },
      { id: 'D', text: 'Hipérbole' },
    ],
    correctAnswer: 'B',
    explanation: 'A personificação (ou prosopopeia) ocorre quando atribuímos atitudes e emoções humanas (como "dançar") a coisas inanimadas (como a "gota d\'água").',
  },
];

export const mathChallenges: Challenge[] = [
  {
    module: 'Módulo: Matemática',
    question: 'Quanto é 3x + 5x?',
    hint: 'Some os termos semelhantes.',
    options: [
      { id: 'A', text: '8x' },
      { id: 'B', text: '15x' },
      { id: 'C', text: '2x' },
      { id: 'D', text: '9x' },
    ],
    correctAnswer: 'A',
    explanation: 'Somando 3x com 5x temos 8x, pois são termos semelhantes que se somam.',
  },
  {
    module: 'Módulo: Matemática',
    question: 'Quanto é 45 ÷ 9?',
    hint: 'Pense em quantas vezes o 9 cabe em 45.',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '5' },
      { id: 'C', text: '6' },
      { id: 'D', text: '7' },
    ],
    correctAnswer: 'B',
    explanation: '9 cabe 5 vezes em 45, então 45 ÷ 9 = 5.',
  },
  {
    module: 'Módulo: Matemática',
    question: 'Qual é a área de um triângulo com base 5 e altura 4?',
    hint: 'Use a fórmula: base × altura ÷ 2.',
    options: [
      { id: 'A', text: '20' },
      { id: 'B', text: '10' },
      { id: 'C', text: '9' },
      { id: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation: 'Área = 5 × 4 ÷ 2 = 10. Portanto a resposta correta é 10.',
  },
  {
    module: 'Módulo: Matemática',
    question: 'Resolva: 2x - 3 = 11',
    hint: 'Some 3 em ambos os lados e depois divida por 2.',
    options: [
      { id: 'A', text: '7' },
      { id: 'B', text: '8' },
      { id: 'C', text: '5' },
      { id: 'D', text: '10' },
    ],
    correctAnswer: 'A',
    explanation: 'Somando 3 a ambos os lados, 2x = 14. Então x = 7.',
  },
  {
    module: 'Módulo: Matemática',
    question: 'Quanto é 25% de 200?',
    hint: '25% é 1/4 do total.',
    options: [
      { id: 'A', text: '25' },
      { id: 'B', text: '40' },
      { id: 'C', text: '50' },
      { id: 'D', text: '75' },
    ],
    correctAnswer: 'C',
    explanation: '25% de 200 é 200 ÷ 4 = 50.',
  },
];
