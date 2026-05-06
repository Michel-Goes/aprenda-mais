import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, AlertTriangle, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { fetchWithAuth } from '../services/api';

export default function Privacy({ onBack }: { onBack: () => void }) {
  const [shareData, setShareData] = useState(() => {
    const saved = localStorage.getItem('privacy_shareData');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [profileVisibility, setProfileVisibility] = useState(() => {
    const saved = localStorage.getItem('privacy_profileVisibility');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('privacy_shareData', JSON.stringify(shareData));
  }, [shareData]);

  useEffect(() => {
    localStorage.setItem('privacy_profileVisibility', JSON.stringify(profileVisibility));
  }, [profileVisibility]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        try {
          await fetchWithAuth('/users/me', {
            method: 'DELETE'
          });
        } catch (e: any) {
          console.warn('Backend deletion failed:', e);
          alert(`Aviso: A exclusão falhou. Detalhe do erro: ${e.message}\n\nPara deletar permanentemente, o servidor precisa estar online e configurado corretamente.`);
          return; // Aborta para não limpar o cache/sessão sem deletar a conta real
        }
      }

      localStorage.clear();
      
      await supabase.auth.signOut();
      
      window.location.href = '/';
      
    } catch (e) {
      console.error(e);
      alert('Erro inesperado ao deletar a conta.');
    }
  };

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
               <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 text-error font-bold hover:opacity-80 transition-opacity">
                 <Trash2 className="w-5 h-5" />
                 Deletar minha conta permanentemente
               </button>
            </div>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             {/* Overlay */}
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
                onClick={() => setShowDeleteModal(false)}
             />
             
             {/* Modal Content */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, y: 10 }} 
                className="bg-white rounded-[2rem] p-6 w-full max-w-sm relative z-10 shadow-2xl overflow-hidden"
             >
               <div className="w-full flex flex-col items-center text-center mt-2">
                 <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center text-error mb-4">
                   <AlertTriangle className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-headline font-extrabold text-on-surface mb-2">Excluir Conta?</h3>
                 <p className="text-on-surface-variant font-medium text-[15px] mb-8 px-2">
                   Todo o seu progresso será perdido, incluindo estrelas, ofensivas e conquistas. Esta ação é <strong>irreversível</strong>.
                 </p>
               </div>
               <div className="flex flex-col gap-3">
                 <button 
                   onClick={handleDeleteConfirm} 
                   className="w-full py-4 rounded-xl font-bold text-white bg-error hover:bg-red-600 shadow-[0_8px_16px_rgba(220,38,38,0.2)] transition-all active:scale-[0.98]"
                 >
                   Sim, deletar agora
                 </button>
                 <button 
                   onClick={() => setShowDeleteModal(false)} 
                   className="w-full py-4 rounded-xl font-bold text-on-surface-variant bg-surface-container-low hover:bg-surface-variant transition-colors"
                 >
                   Cancelar
                 </button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
