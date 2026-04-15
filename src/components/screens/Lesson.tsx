import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Check, ArrowRight, X } from 'lucide-react';

interface LessonProps {
  onBack?: () => void;
}

interface Challenge {
  module: string;
  question: string;
  hint: string;
  image: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export default function Lesson({ onBack }: LessonProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  const challenges: Challenge[] = [
    {
      module: 'Módulo 1: Natureza',
      question: 'Qual é o coletivo de lobos?',
      hint: 'É um termo também usado para designar bandos familiares.',
      image: '/wolf.png',
      options: [
        { id: 'A', text: 'Pillars' },
        { id: 'B', text: 'Alcateia' },
        { id: 'C', text: 'Cardume' },
        { id: 'D', text: 'Vara' },
      ],
      correctAnswer: 'B',
      explanation: 'Alcateia é o termo correto para designar um grupo de lobos. A palavra também é usada para descrever bandos familiares de animais selvagens.',
    },
    {
      module: 'Módulo 1: Natureza',
      question: 'Qual é o coletivo de peixes?',
      hint: 'A resposta é algo que flui junto na água.',
      image: 'https://images.pexels.com/photos/14267347/pexels-photo-14267347.jpeg?w=600&h=600&fit=crop',
      options: [
        { id: 'A', text: 'Rebanho' },
        { id: 'B', text: 'Cardume' },
        { id: 'C', text: 'Ninhada' },
        { id: 'D', text: 'Colmeia' },
      ],
      correctAnswer: 'B',
      explanation: 'Cardume é o coletivo de peixes. Você viu um cardume em "Alcateia"? Era uma opção incorreta naquela questão!',
    },
    {
      module: 'Módulo 1: Natureza',
      question: 'Qual é o coletivo de pássaros em voo?',
      hint: 'É uma palavra que rimaria com "oada".',
      image: 'https://images.pexels.com/photos/2498736/pexels-photo-2498736.jpeg?w=600&h=600&fit=crop',
      options: [
        { id: 'A', text: 'Nuvem' },
        { id: 'B', text: 'Bando' },
        { id: 'C', text: 'Revoada' },
        { id: 'D', text: 'Enxame' },
      ],
      correctAnswer: 'C',
      explanation: 'Revoada é o termo usado para descrever pássaros em voo. Um bando é mais geral, enquanto revoada é específico para esse movimento.',
    },
    {
      module: 'Módulo 1: Natureza',
      question: 'Qual é o coletivo de abelhas?',
      hint: 'É um termo relacionado à organização das abelhas.',
      image: 'https://images.pexels.com/photos/26610221/pexels-photo-26610221.jpeg?w=600&h=600&fit=crop',
      options: [
        { id: 'A', text: 'Enxame' },
        { id: 'B', text: 'Colmeia' },
        { id: 'C', text: 'Ninhada' },
        { id: 'D', text: 'Rebanho' },
      ],
      correctAnswer: 'A',
      explanation: 'Enxame é o coletivo de abelhas em movimento. Colmeia é o local onde vivem, mas não é o termo para o grupo.',
    },
    {
      module: 'Módulo 1: Natureza',
      question: 'Qual é o coletivo de vacas?',
      hint: 'É um termo muito comum na zona rural.',
      image: 'https://images.pexels.com/photos/8637749/pexels-photo-8637749.jpeg?w=600&h=600&fit=crop',
      options: [
        { id: 'A', text: 'Alcateia' },
        { id: 'B', text: 'Cardume' },
        { id: 'C', text: 'Rebanho' },
        { id: 'D', text: 'Colmeia' },
      ],
      correctAnswer: 'C',
      explanation: 'Rebanho é o coletivo de animais domesticados, como vacas, ovelhas e cabras. É muito usado na pecuária.',
    },
  ];

  const challenge = challenges[currentChallengeIndex];

  const handleVerifyAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === challenge.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Fim dos desafios, voltar
      onBack?.();
    }
  };

  const progressPercentage = ((currentChallengeIndex + 1) / challenges.length) * 100;

  return (
    <main className="min-h-screen pt-24 pb-48 px-6 bg-[#fafcff]">
      <div className="max-w-md mx-auto relative">
        {/* Progress Bar centered */}
        <div className="w-full mb-8">
          <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4CA5FE] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-[#64748b] mt-2">
            Desafio {currentChallengeIndex + 1} de {challenges.length}
          </p>
        </div>

        {/* Wolf Image */}
        <motion.div
          key={currentChallengeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-square rounded-[2rem] overflow-hidden relative shadow-[0_12px_40px_rgba(0,0,0,0.08)] mb-8"
        >
          <img
            src={challenge.image}
            alt="Challenge"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <div className="w-full flex flex-col justify-between">
          <div>
            <span className="font-bold tracking-widest text-[#4CA5FE] uppercase mb-3 block text-[11px]">
              {challenge.module}
            </span>
            <h1 className="text-[2.2rem] font-headline font-extrabold text-[#111827] leading-[1.1] mb-5">
              {challenge.question}
            </h1>
            <p className="text-[#64748b] leading-relaxed text-[15px] mb-6">
              Identifique o termo correto utilizado.
            </p>

            <div className="bg-[#f2f8ff] rounded-xl p-4 flex gap-3 border border-[#dbeafe] mb-8">
              <Lightbulb className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
              <p className="text-[14px] leading-relaxed text-[#3b82f6] italic">
                Dica: {challenge.hint}
              </p>
            </div>

            {/* Options Vertical Stack */}
            <div className="flex flex-col gap-5 mb-8">
              {challenge.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrectOption = opt.id === challenge.correctAnswer;
                const showCorrect = showResult && isCorrectOption;
                const showIncorrect = showResult && isSelected && !isCorrectOption;

                return (
                  <motion.button
                    key={opt.id}
                    onClick={() => !showResult && setSelectedOption(opt.id)}
                    disabled={showResult}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full flex items-center justify-between py-[18px] px-5 rounded-full transition-all border-[2px] disabled:cursor-default ${showCorrect
                      ? 'border-[#10b981] bg-[#ecfdf5] ring-[4px] ring-[#10b981]/10'
                      : showIncorrect
                        ? 'border-[#ef4444] bg-[#fef2f2] ring-[4px] ring-[#ef4444]/10'
                        : isSelected
                          ? 'border-[#4CA5FE] bg-white ring-[4px] ring-[#4CA5FE]/10'
                          : 'border-transparent bg-white shadow-[0_8px_30px_rgba(0,46,82,0.06)] hover:shadow-[0_12px_40px_rgba(0,46,82,0.1)]'
                      }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg font-headline transition-colors ${showCorrect
                        ? 'bg-[#10b981] text-white'
                        : showIncorrect
                          ? 'bg-[#ef4444] text-white'
                          : isSelected
                            ? 'bg-[#4CA5FE] text-white'
                            : 'bg-[#f0f7ff] text-[#4CA5FE]'
                        }`}>
                        {opt.id}
                      </div>
                      <span className={`font-bold font-headline text-[16px] ${showCorrect || showIncorrect
                        ? 'text-[#1e293b]'
                        : isSelected
                          ? 'text-[#1e293b]'
                          : 'text-[#334155]'
                        }`}>
                        {opt.text}
                      </span>
                    </div>
                    {showCorrect && (
                      <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center shadow-md shadow-[#10b981]/30">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {showIncorrect && (
                      <div className="w-7 h-7 rounded-full bg-[#ef4444] flex items-center justify-center shadow-md shadow-[#ef4444]/30">
                        <X className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {isSelected && !showResult && (
                      <div className="w-7 h-7 rounded-full bg-[#4CA5FE] flex items-center justify-center shadow-md shadow-[#4CA5FE]/30">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback Section */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 border-l-4 mb-6 ${isCorrect
                  ? 'bg-[#ecfdf5] border-l-[#10b981]'
                  : 'bg-[#fef2f2] border-l-[#ef4444]'
                  }`}
              >
                <p className={`font-bold mb-2 ${isCorrect ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {isCorrect ? '✓ Correto!' : '✗ Incorreto'}
                </p>
                <p className="text-[14px] leading-relaxed text-[#334155]">
                  {challenge.explanation}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-6 py-6 bg-white border-t border-slate-100 flex items-center justify-between z-50">
        <div className="max-w-md mx-auto w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-[#4CA5FE] font-black text-[12px] tracking-widest uppercase hover:opacity-80 transition-opacity text-left leading-tight"
          >
            Pular<br />Lição
          </button>
          {!showResult ? (
            <button
              onClick={handleVerifyAnswer}
              disabled={selectedOption === null}
              className="bg-[#4CA5FE] text-white font-bold py-3 px-8 rounded-[2rem] flex items-center gap-4 hover:bg-[#3b82f6] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#4CA5FE]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-left leading-tight text-[15px]">
                Verificar<br />Resposta
              </div>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </button>
          ) : (
            <button
              onClick={handleNextChallenge}
              className={`text-white font-bold py-3 px-8 rounded-[2rem] flex items-center gap-4 hover:-translate-y-0.5 transition-all shadow-lg ${isCorrect
                ? 'bg-[#10b981] hover:bg-[#059669] shadow-[#10b981]/30'
                : 'bg-[#4CA5FE] hover:bg-[#3b82f6] shadow-[#4CA5FE]/30'
                }`}
            >
              <div className="text-left leading-tight text-[15px]">
                {currentChallengeIndex === challenges.length - 1 ? 'Finalizar' : 'Próximo'}<br />Desafio
              </div>
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
