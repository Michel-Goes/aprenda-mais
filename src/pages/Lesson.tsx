import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Check, ArrowRight, X, Clock, Zap } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { portugueseChallenges, mathChallenges, Challenge } from '../data/challenges';
import LessonFinalScreen from '../components/ui/LessonFinalScreen';

interface LessonProps {
  onBack?: () => void;
  subject: 'math' | 'portuguese';
}

export default function Lesson({ onBack, subject }: LessonProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const { inventory } = useGame();
  const hasTimePowerUp = inventory.includes(4);
  const [timePowerUpUsed, setTimePowerUpUsed] = useState(false);
  const [powerUpMessage, setPowerUpMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  const handleTimeUp = () => {
    setIsCorrect(false);
    setShowResult(true);
  };

  useEffect(() => {
    if (showFinalScreen || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFinalScreen, showResult, currentChallengeIndex]);

  const activateTimePowerUp = () => {
    setTimePowerUpUsed(true);
    setTimeLeft((prev) => prev + 30);
    setPowerUpMessage('⏳ +30s Concedidos!');
    setTimeout(() => setPowerUpMessage(''), 3000);
  };

  const challenges: Challenge[] = subject === 'math' ? mathChallenges : portugueseChallenges;
  const challenge = challenges[currentChallengeIndex];

  const handleVerifyAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === challenge.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setIsCorrect(false);
      setTimeLeft(60);
    } else {
      setShowFinalScreen(true);
    }
  };

  const progressPercentage = ((currentChallengeIndex + 1) / challenges.length) * 100;
  const subjectLabel = subject === 'math' ? 'Matemática' : 'Português';

  if (showFinalScreen) {
    return (
      <LessonFinalScreen 
        score={score} 
        totalChallenges={challenges.length} 
        subjectLabel={subjectLabel} 
        onBack={onBack!} 
      />
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-48 px-6 bg-[#fafcff]">
      <div className="max-w-md mx-auto relative">
        {/* Progress Bar and Timer */}
        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4CA5FE] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className={`ml-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm transition-colors ${
               timeLeft <= 10 && !showResult ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
             }`}>
               <Clock className="w-4 h-4" />
               {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <p className="text-xs text-left text-[#64748b]">
            Desafio {currentChallengeIndex + 1} de {challenges.length}
          </p>
        </div>

        {challenge.image && (
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
        )}

        {/* Content Section */}
        <div className="w-full flex flex-col justify-between">
          <div>
            <span className="font-bold tracking-widest text-[#4CA5FE] uppercase mb-3 block text-[11px]">
              {challenge.module}
            </span>
            <h1 className="text-[2.2rem] font-headline font-extrabold text-[#111827] leading-[1.1] mb-5">
              {challenge.question}
            </h1>
            <div className="flex justify-between items-start mb-6">
              <p className="text-[#64748b] leading-relaxed text-[15px]">
                Identifique o termo correto utilizado.
              </p>
              {hasTimePowerUp && !timePowerUpUsed && !showResult && (
                <button 
                  onClick={activateTimePowerUp}
                  className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1 hover:bg-yellow-200 transition-colors shadow-sm ml-4 shrink-0"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Usar Tempo+
                </button>
              )}
            </div>
            
            <AnimatePresence>
              {powerUpMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-4 py-2 rounded-lg mb-6 flex items-center justify-center gap-2 shadow-md w-full"
                >
                  <Zap className="w-4 h-4" />
                  {powerUpMessage}
                </motion.div>
              )}
            </AnimatePresence>

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
                  {isCorrect ? '✓ Correto!' : timeLeft <= 0 && selectedOption === null ? '⏰ Tempo Esgotado!' : '✗ Incorreto'}
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
            onClick={handleNextChallenge}
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
