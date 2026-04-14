import { Calculator, SpellCheck, Star, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
interface ExercisesProps {
  onStartLesson?: () => void;
}

export default function Exercises({ onStartLesson }: ExercisesProps) {
  const subjects = [
    {
      id: 'math',
      title: 'Matemática',
      description: 'Equações do primeiro grau e lógica aritmética.',
      progress: 80,
      icon: Calculator,
      color: 'primary',
    },
    {
      id: 'portuguese',
      title: 'Português',
      description: 'Interpretação de texto e novas regras gramaticais.',
      progress: 45,
      icon: SpellCheck,
      color: 'tertiary',
    },
  ];

  return (
    <main className="pt-24 pb-32 px-6 max-w-2xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-10 relative overflow-hidden bg-primary-container rounded-lg p-8 text-on-primary-container"
      >
        <div className="relative z-10 max-w-[60%]">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-2">Desafios do Dia</h2>
          <p className="font-body text-on-primary-container/80 text-sm">Pratique agora e ganhe bônus de XP para subir no ranking.</p>
        </div>
        <div className="absolute -right-4 -bottom-6 w-40 h-40 opacity-20">
          <GraduationCap className="w-full h-full" />
        </div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject, i) => (
          <motion.div 
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-[0_12px_32px_rgba(0,46,82,0.06)] flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
          >
            <div>
              <div className={`w-14 h-14 ${subject.color === 'primary' ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-container text-on-tertiary-container'} rounded-2xl flex items-center justify-center mb-4`}>
                <subject.icon className="w-8 h-8" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">{subject.title}</h3>
              <p className="text-on-surface-variant text-sm mb-6">{subject.description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant">
                <span>Progresso</span>
                <span className={subject.color === 'primary' ? 'text-primary' : 'text-tertiary'}>{subject.progress}%</span>
              </div>
              <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden relative">
                <div 
                  className={`h-full bg-gradient-to-r ${subject.color === 'primary' ? 'from-primary to-primary-container' : 'from-tertiary to-tertiary-container'} rounded-full`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <button 
                onClick={subject.id === 'portuguese' ? onStartLesson : undefined}
                className={`w-full bg-gradient-to-br ${subject.color === 'primary' ? 'from-primary to-primary-container shadow-primary/20' : 'from-tertiary to-tertiary-container shadow-tertiary/20'} text-white py-4 rounded-lg font-bold active:scale-95 transition-all shadow-lg`}
              >
                Praticar Agora
              </button>
            </div>
          </motion.div>
        ))}

        <div className="md:col-span-2 relative bg-surface-container-low rounded-lg p-6 overflow-hidden border-2 border-dashed border-outline-variant/30">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 relative">
              <div className="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-8 h-8 text-on-tertiary-container fill-current" />
              </div>
              <div className="absolute -top-2 -right-2 bg-error text-white text-[10px] px-2 py-1 rounded-full font-bold">MISSÃO</div>
            </div>
            <div>
              <h4 className="font-headline font-bold text-lg">Mestre da Gramática</h4>
              <p className="text-sm text-on-surface-variant">Complete 5 exercícios hoje para ganhar um emblema raro.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
