import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Check, ArrowRight } from 'lucide-react';

interface LessonProps {
  onBack?: () => void;
}

export default function Lesson({ onBack }: LessonProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>('B');

  const options = [
    { id: 'A', text: 'Pillars' },
    { id: 'B', text: 'Alcateia' },
    { id: 'C', text: 'Cardume' },
    { id: 'D', text: 'Vara' },
  ];

  return (
    <main className="min-h-screen pt-24 pb-48 px-6 bg-[#fafcff]">
      <div className="max-w-md mx-auto relative relative">
        {/* Progress Bar centered */}
        <div className="w-full mb-8">
          <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
            <div className="h-full bg-[#4CA5FE] w-[35%] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
          </div>
        </div>

        {/* Wolf Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-square rounded-[2rem] overflow-hidden relative shadow-[0_12px_40px_rgba(0,0,0,0.08)] mb-8"
        >
          <img 
            src="/wolf.png" 
            alt="Wolf" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Section */}
        <div className="w-full flex flex-col justify-between">
          <div>
            <span className="font-bold tracking-widest text-[#4CA5FE] uppercase mb-3 block text-[11px]">
              Módulo 1: Natureza
            </span>
            <h1 className="text-[2.2rem] font-headline font-extrabold text-[#111827] leading-[1.1] mb-5">
              Qual é o coletivo de lobos?
            </h1>
            <p className="text-[#64748b] leading-relaxed text-[15px] mb-6">
              Identifique o termo correto utilizado para descrever um grupo de lobos em seu habitat natural.
            </p>

            <div className="bg-[#f2f8ff] rounded-xl p-4 flex gap-3 border border-[#dbeafe] mb-8">
              <Lightbulb className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
              <p className="text-[14px] leading-relaxed text-[#3b82f6] italic">
                Dica: É um termo também usado para designar bandos familiares.
              </p>
            </div>

            {/* Options Vertical Stack */}
            <div className="flex flex-col gap-5 mb-8">
              {options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full flex items-center justify-between py-[18px] px-5 rounded-full transition-all border-[2px] ${
                      isSelected 
                        ? 'border-[#4CA5FE] bg-white ring-[4px] ring-[#4CA5FE]/10' 
                        : 'border-transparent bg-white shadow-[0_8px_30px_rgba(0,46,82,0.06)] hover:shadow-[0_12px_40px_rgba(0,46,82,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg font-headline transition-colors ${
                        isSelected ? 'bg-[#4CA5FE] text-white' : 'bg-[#f0f7ff] text-[#4CA5FE]'
                      }`}>
                        {opt.id}
                      </div>
                      <span className={`font-bold font-headline text-[16px] ${isSelected ? 'text-[#1e293b]' : 'text-[#334155]'}`}>
                        {opt.text}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-7 h-7 rounded-full bg-[#4CA5FE] flex items-center justify-center shadow-md shadow-[#4CA5FE]/30">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-6 py-6 bg-white border-t border-slate-100 flex items-center justify-between z-50">
        <div className="max-w-md mx-auto w-full flex items-center justify-between">
          <button 
            onClick={onBack}
            className="text-[#4CA5FE] font-black text-[12px] tracking-widest uppercase hover:opacity-80 transition-opacity text-left leading-tight"
          >
            Pular<br/>Lição
          </button>
          <button className="bg-[#4CA5FE] text-white font-bold py-3 px-8 rounded-[2rem] flex items-center gap-4 hover:bg-[#3b82f6] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#4CA5FE]/30">
            <div className="text-left leading-tight text-[15px]">
              Verificar<br/>Resposta
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </main>
  );
}
