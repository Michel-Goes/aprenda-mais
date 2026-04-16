import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface UpdatePasswordProps {
  onPasswordUpdated: () => void;
}

export default function UpdatePassword({ onPasswordUpdated }: UpdatePasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorText('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    setErrorText('');
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      setMessage('Senha atualizada com sucesso!');
      setTimeout(() => {
        onPasswordUpdated();
      }, 2000);
    } catch (error: any) {
      setErrorText(error.message || 'Ocorreu um erro ao atualizar a senha.');
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
              Criar Nova Senha
            </h2>
            <p className="text-on-surface-variant text-sm font-body">
              Digite a sua nova senha abaixo para acessar sua conta.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleUpdatePassword}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Nova Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-12 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none"
                  placeholder="••••••••"
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-outline"
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Confirmar Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline group-focus-within:text-primary transition-colors" />
                <input
                  className="w-full bg-surface-container-high border-none rounded-DEFAULT pl-12 pr-12 py-4 font-body focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline-variant outline-none"
                  placeholder="••••••••"
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                />
              </div>
            </div>

            {errorText && <p className="text-red-500 text-sm font-medium text-center">{errorText}</p>}
            {message && <p className="text-green-600 text-sm font-medium text-center">{message}</p>}

            <button
              className="w-full py-4 rounded-lg bg-gradient-to-br from-primary to-primary-container text-white font-headline font-extrabold text-lg shadow-[0_8px_16px_rgba(0,94,160,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Atualizar Senha'}
            </button>
          </form>
        </motion.section>
      </main>
    </div>
  );
}
