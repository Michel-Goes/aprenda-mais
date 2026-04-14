import { Star, Flame, Award, Settings, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  onSettingsClick: () => void;
}

export default function Profile({ onSettingsClick }: ProfileProps) {
  return (
    <main className="pt-24 px-6 pb-32 max-w-2xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        <div className="bg-white p-8 rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)] flex flex-col md:flex-row items-center gap-8 overflow-hidden">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl bg-primary-container p-1 shadow-lg transform -rotate-3">
              <img 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-[1.5rem]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLiBNaD5v6FW638tfVjoJ_MmAQRsPWIliXcsqRYeqXE9VIKILXN-ZlQ03GEKQv6Nn9X-hJPMYQezreekPzKocIgtZJlTk-nidxRd873MzmAPPjQyBes23Q1VwYbblBT65CVEAmCBd1zct3WjZ70s1NTMYQZVTNzmkVFhmm-9cvOvBBflVFu5MQWnmMnNAB7zMtk6TSHDmQyZCuaSe05Nn82O4AbojsgrbsKgD5Lq9kj_vuJrBUH9uWt8_TidhasjafcBWsMbRECkF" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-white">
              5
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface mb-1">Lucas Silva</h2>
            <p className="text-on-surface-variant font-medium mb-6">Pequeno Explorador Galático</p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold font-label uppercase tracking-wider text-primary">Próximo Nível</span>
                <span className="text-xs font-bold font-label text-on-surface-variant">850 / 1000 XP</span>
              </div>
              <div className="h-4 bg-surface-variant rounded-full relative overflow-visible">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-[85%] relative">
                  <div className="absolute -right-2 -top-2 bg-tertiary-container w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    <Star className="w-4 h-4 fill-current text-on-tertiary-container" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface-container-low p-6 rounded-lg flex flex-col items-center text-center">
          <Flame className="w-8 h-8 text-tertiary mb-2 fill-current" />
          <span className="text-2xl font-black font-headline text-on-surface">12 Dias</span>
          <span className="text-xs font-bold text-on-surface-variant font-label">Ofensiva</span>
        </div>
        <div className="bg-surface-container-low p-6 rounded-lg flex flex-col items-center text-center">
          <Award className="w-8 h-8 text-primary mb-2 fill-current" />
          <span className="text-2xl font-black font-headline text-on-surface">45</span>
          <span className="text-xs font-bold text-on-surface-variant font-label">Conquistas</span>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-headline font-extrabold text-on-surface">Minhas Medalhas</h3>
          <button className="text-primary font-bold text-sm hover:underline font-label">Ver tudo</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Mestre da Leitura', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
            { label: 'Explorador Espacial', icon: Award, color: 'bg-blue-100 text-blue-600' },
            { label: 'Primeiro Lugar', icon: Award, color: 'bg-green-100 text-green-600' },
          ].map((medal, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-[0_4px_12px_rgba(0,46,82,0.04)] flex flex-col items-center"
            >
              <div className={`w-16 h-16 ${medal.color} rounded-full flex items-center justify-center mb-3`}>
                <medal.icon className="w-8 h-8 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-center leading-tight font-label text-on-surface">{medal.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <button 
          onClick={onSettingsClick}
          className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-5 rounded-lg text-lg font-black font-headline shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <Settings className="w-6 h-6" />
          Configurar Perfil
        </button>
      </section>
    </main>
  );
}
