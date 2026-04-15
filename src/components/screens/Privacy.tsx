import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Privacy({ onBack }: { onBack: () => void }) {
  const [shareData, setShareData] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);

  return (
    <main className="pt-24 px-6 pb-32 max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center text-primary font-bold gap-2 hover:opacity-80 transition-opacity">
        <ArrowLeft className="w-5 h-5" />
        Voltar para Configurações
      </button>
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-extrabold text-on-background tracking-tight mb-4">Privacidade</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Seus dados estão seguros</h3>
          <p className="text-on-surface-variant font-medium mb-6">A sua privacidade é importante para nós. Aqui você pode gerenciar como seus dados são coletados e utilizados dentro do aplicativo.</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl">
              <div>
                <span className="font-bold block text-on-surface">Compartilhar dados de uso</span>
                <span className="text-xs text-on-surface-variant font-medium mt-1 block">Ajuda a melhorar nossa plataforma.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input checked={shareData} onChange={() => setShareData(!shareData)} className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl">
              <div>
                <span className="font-bold block text-on-surface">Visibilidade do perfil no Ranking</span>
                <span className="text-xs text-on-surface-variant font-medium mt-1 block">Permite que outros alunos vejam seus pontos.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input checked={profileVisibility} onChange={() => setProfileVisibility(!profileVisibility)} className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
               <button className="text-error font-bold hover:underline transition-all">
                 Deletar minha conta permanentemente
               </button>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
