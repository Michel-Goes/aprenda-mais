import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function Help({ onBack }: { onBack: () => void }) {
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
        <h2 className="text-3xl font-extrabold text-on-background tracking-tight mb-4">Ajuda e Suporte</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Como podemos ajudar?</h3>
          <p className="text-on-surface-variant mb-6 font-medium">Encontre respostas para as perguntas mais frequentes ou entre em contato com nosso time de suporte.</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <h4 className="font-bold text-on-surface mb-1">Como alterar a senha?</h4>
              <p className="text-sm text-on-surface-variant font-medium">No momento, as senhas são gerenciadas pela tela de login na área "Esqueci minha senha".</p>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <h4 className="font-bold text-on-surface mb-1">Não consigo acessar minhas lições.</h4>
              <p className="text-sm text-on-surface-variant font-medium">Verifique sua conexão e recarregue a página, ou saia do perfil e entre novamente.</p>
            </div>
            <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <h4 className="font-bold text-on-surface mb-1">Como resgatar as estrelas?</h4>
              <p className="text-sm text-on-surface-variant font-medium">Você pode ir até o menu da loja e trocar suas estrelas por power-ups e avatares especiais.</p>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
            Falar com suporte
          </button>
        </div>
      </motion.section>
    </main>
  );
}
