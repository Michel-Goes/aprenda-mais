import { User, Lock, Eye, Chrome, Grid } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="fixed top-[-5%] right-[-5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl -z-10"></div>

      <main className="w-full max-w-md space-y-8 flex flex-col items-center">
        <header className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-primary-container/10 blur-3xl rounded-full transform scale-150"></div>
            <img 
              alt="Aprenda+ Logo" 
              className="relative w-64 md:w-80 object-contain drop-shadow-[0_12px_40px_rgba(0,46,82,0.1)]" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ujxw34yM-zoAxHj6BSe_KZlPwK6__KnQVqdBQ23w2Ehvvzf7ZwPPORZ-A-KlEOSpRMT65CxBaSanZCNOLL6ir1qkYWOOacCTfNDuW-t9Z44L_JvOZItICYyEizIK6ybAgBe-6ch6zY_h6RvOedoShnZyHRKwt-8-75P2bqI15ctLJciWPlAj8virhS_sEfqR6jK5Vo3KYPKWFe0rsePxtG0MzfsDNZefmVs2imLQWQZqFMFKZ91Nb46Z5mwOoXKsR7Z16KAGTusi2E" 
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </header>

        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white rounded-lg p-8 shadow-[0_12px_32px_rgba(0,46,82,0.06)] space-y-6"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-bold text-on-surface">Bem-vindo de volta!</h2>
            <p className="text-on-surface-variant text-sm font-body">Entre para continuar sua jornada de conhecimento.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">E-mail ou Usuário</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input 
                  className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-4 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none" 
                  placeholder="nome@exemplo.com" 
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Senha</label>
                <a className="text-xs font-bold text-primary hover:underline" href="#">Esqueceu?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input 
                  className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-12 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none" 
                  placeholder="••••••••" 
                  type="password"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-outline" type="button">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button 
              className="w-full py-4 rounded-lg bg-gradient-to-br from-primary to-primary-container text-white font-headline font-extrabold text-lg shadow-[0_8px_16px_rgba(0,94,160,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2" 
              type="submit"
            >
              Entrar
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-surface-variant"></div>
            <span className="flex-shrink mx-4 text-outline-variant text-xs font-bold uppercase tracking-widest">ou entre com</span>
            <div className="flex-grow border-t border-surface-variant"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-surface-container-low hover:bg-surface-variant transition-colors group">
              <Chrome className="w-5 h-5 text-on-surface-variant group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-on-surface-variant">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-surface-container-low hover:bg-surface-variant transition-colors group">
              <Grid className="w-5 h-5 text-on-surface-variant group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold text-on-surface-variant">Microsoft</span>
            </button>
          </div>
        </motion.section>

        <footer className="text-center pb-8">
          <p className="text-on-surface-variant font-body">
            Ainda não tem uma conta? 
            <a className="text-primary font-bold hover:text-primary-dim ml-1 transition-colors" href="#">Criar Conta</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
