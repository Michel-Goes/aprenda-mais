import { motion } from 'motion/react';
import { Trophy, Target, ArrowRight } from 'lucide-react';

interface LessonFinalScreenProps {
  score: number;
  totalChallenges: number;
  subjectLabel: string;
  onBack: () => void;
}

export default function LessonFinalScreen({ score, totalChallenges, subjectLabel, onBack }: LessonFinalScreenProps) {
  const percentage = (score / totalChallenges) * 100;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60;

  return (
    <main className="min-h-screen pt-24 pb-48 px-6 bg-[#fafcff] flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Trophy Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8 flex justify-center"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${isExcellent ? 'bg-[#fbbf24]' : isGood ? 'bg-[#60a5fa]' : 'bg-[#f87171]'}`}>
              <Trophy className={`w-12 h-12 ${isExcellent ? 'text-yellow-700' : isGood ? 'text-blue-700' : 'text-red-700'}`} />
            </div>
          </motion.div>

          {/* Score */}
          <div className="mb-8">
            <p className="text-[14px] font-bold uppercase tracking-widest text-[#4CA5FE] mb-2">
              Sua Pontuação
            </p>
            <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-[rgba(0,0,0,0.08)]">
              <div className="text-[4rem] font-headline font-extrabold text-[#1e293b] leading-none">
                {score}/{totalChallenges}
              </div>
              <div className="text-[15px] text-[#64748b] font-semibold mt-3">
                {percentage.toFixed(0)}% de acerto
              </div>
              <div className="w-full h-2 bg-[#e2e8f0] rounded-full mt-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${isExcellent ? 'bg-[#10b981]' : isGood ? 'bg-[#4CA5FE]' : 'bg-[#f97316]'}`}
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-[1.5rem] p-8 mb-8 border-2 ${isExcellent
              ? 'bg-[#ecfdf5] border-[#10b981]'
              : isGood
                ? 'bg-[#eff6ff] border-[#4CA5FE]'
                : 'bg-[#fef2f2] border-[#ef4444]'
              }`}
          >
            <h2 className={`text-[1.8rem] font-headline font-extrabold mb-3 ${isExcellent
              ? 'text-[#10b981]'
              : isGood
                ? 'text-[#4CA5FE]'
                : 'text-[#ef4444]'
              }`}>
              {isExcellent ? '🎉 Excelente!' : isGood ? '👏 Muito bom!' : '💪 Bom esforço!'}
            </h2>
            <p className="text-[15px] leading-relaxed text-[#334155]">
              {isExcellent
                ? `Parabéns! Você arrasou em ${subjectLabel}! Sua performance foi impecável.`
                : isGood
                  ? `Parabéns! Você tem um ótimo conhecimento em ${subjectLabel}!`
                  : `Continue praticando em ${subjectLabel}! Você já sabe bastante, mas pode melhorar ainda mais.`}
            </p>
          </motion.div>

          {/* Score Breakdown */}
          <div className="bg-white rounded-[1.5rem] p-6 shadow-lg shadow-[rgba(0,0,0,0.08)] mb-8 border border-[#e2e8f0]">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-[#4CA5FE]" />
              <h3 className="font-bold text-[#1e293b]">Detalhes</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-[#64748b] font-medium">Desafios respondidos</span>
                <span className="font-bold text-[#1e293b]">{totalChallenges}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748b] font-medium">Respostas corretas</span>
                <span className="font-bold text-[#10b981]">{score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748b] font-medium">Respostas incorretas</span>
                <span className="font-bold text-[#ef4444]">{totalChallenges - score}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-6 py-6 bg-white border-t border-slate-100 flex items-center justify-between z-50">
        <div className="max-w-md mx-auto w-full flex items-center justify-center gap-4">
          <button
            onClick={onBack}
            className="bg-[#4CA5FE] text-white font-bold py-3 px-8 rounded-[2rem] flex items-center gap-3 hover:bg-[#3b82f6] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#4CA5FE]/30 flex-1"
          >
            <div className="text-left leading-tight text-[15px]">
              Voltar ao<br />Menu
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </main>
  );
}
