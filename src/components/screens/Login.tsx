import { User, Lock, Eye, Chrome, Grid } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorText('');
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        setMessage('Verifique seu e-mail para confirmar a conta! Você já pode fazer login se for automático.');
      }
    } catch (error: any) {
      setErrorText(error.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorText('Por favor, digite seu e-mail para recuperar a senha.');
      return;
    }
    setLoading(true);
    setErrorText('');
    setMessage('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setMessage('E-mail de recuperação de senha enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (error: any) {
      setErrorText(error.message || 'Ocorreu um erro ao enviar o e-mail de recuperação.');
    } finally {
      setLoading(false);
    }
  };

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
              src="/logo.png"
            />
          </motion.div>
        </header>

        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white rounded-lg p-8 shadow-[0_12px_32px_rgba(0,46,82,0.06)] space-y-6"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-headline font-bold text-on-surface">
              {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta!'}
            </h2>
            <p className="text-on-surface-variant text-sm font-body">
              {isLogin ? 'Entre para continuar sua jornada de conhecimento.' : 'Comece sua jornada de conhecimento agora.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Nome Completo</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                  <input
                    className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-4 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none"
                    placeholder="Seu nome"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">E-mail</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-4 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none"
                  placeholder="nome@exemplo.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Senha</label>
                {isLogin && (
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-xs font-bold text-primary hover:underline transition-colors"
                  >
                    Esqueceu?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-12 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none"
                  placeholder="••••••••"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-outline" type="button">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {errorText && <p className="text-red-500 text-sm font-medium text-center">{errorText}</p>}
            {message && <p className="text-green-600 text-sm font-medium text-center">{message}</p>}

            <button
              className="w-full py-4 rounded-lg bg-gradient-to-br from-primary to-primary-container text-white font-headline font-extrabold text-lg shadow-[0_8px_16px_rgba(0,94,160,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-surface-variant"></div>
            <span className="flex-shrink mx-4 text-outline-variant text-xs font-bold uppercase tracking-widest">ou {isLogin ? 'entre' : 'cadastre-se'} com</span>
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
            {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
            <button
              className="text-primary font-bold hover:text-primary-dim ml-1 transition-colors"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Criar Conta' : 'Fazer Login'}
            </button>
          </p>
        </footer>
      </main>
    </div>
  );
}
