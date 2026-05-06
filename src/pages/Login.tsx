import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState, useCallback, memo } from 'react';
import { supabase } from '../services/supabase';
import logo from '../assets/images/logo.png';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Login = memo(function Login() {
  const [view, setView] = useState<'login' | 'signup' | 'forgot_password'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [message, setMessage] = useState('');

  // Check if the URL returned an error from Supabase (e.g., expired link due to double click)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('error=access_denied') || hash.includes('error_code=otp_expired')) {
        setErrorText('Este link de e-mail expirou ou já foi utilizado. Por segurança, os links servem para um único clique. Caso esteja tentando redefinir a senha, por favor, solicite um novo link abaixo.');
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const handleAuth = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorText('');
    setMessage('');

    try {
      if (view === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else if (view === 'signup') {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
        if (!passwordRegex.test(password)) {
          setErrorText('A senha deve ter no mínimo 6 caracteres, contendo letras, números e um símbolo especial.');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              custom_name: name,
            }
          }
        });
        if (error) throw error;

        if (data?.user && data.user.identities && data.user.identities.length === 0) {
          setErrorText('Este e-mail já está cadastrado. Tente fazer login ou recupere a senha.');
          setLoading(false);
          return;
        }

        setMessage('Verifique seu e-mail para confirmar a conta!');
      } else if (view === 'forgot_password') {
        
        try {
          const { data: emailExists, error: rpcError } = await supabase.rpc('check_email_exists', { email_to_check: email });
          
          if (rpcError) {
             setErrorText('Erro interno: Função SQL pendente. Execute o script enviado pelo assistente no seu Supabase > SQL Editor.');
             setLoading(false);
             return;
          }

          if (emailExists === false) {
            setErrorText('E-mail não cadastrado. Crie e inicie sua jornada agora!');
            setLoading(false);
            return;
          }
        } catch (e) {
             setErrorText('Erro interno: RPC inalcançável.');
             setLoading(false);
             return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin
        });
        if (error) throw error;
        setMessage('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      }
    } catch (error: any) {
      let errorMessage = error.message || 'Ocorreu um erro.';
      
      // Translation of common Supabase errors
      if (errorMessage.includes('email rate limit exceeded')) {
        errorMessage = 'Muitas tentativas. Por favor, aguarde um pouco e tente novamente.';
      } else if (errorMessage.includes('Invalid login credentials')) {
        errorMessage = 'E-mail ou senha incorretos.';
      } else if (errorMessage.includes('User already registered')) {
        errorMessage = 'Este e-mail já está cadastrado.';
      } else if (errorMessage.includes('Password should be at least')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (errorMessage.includes('User not found') || errorMessage.includes('not found')) {
        errorMessage = 'Este e-mail não consta em nosso banco de dados.';
      }

      setErrorText(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [email, password, name, view]);
  
  const handleOAuthSignIn = async (provider: 'google' | 'azure') => {
    try {
      setLoading(true);
      setErrorText('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorText(error.message || `Erro ao conectar com ${provider === 'azure' ? 'Microsoft' : 'Google'}.`);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="fixed top-[-5%] right-[-5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl -z-10"></div>

      <main className="w-full max-w-md space-y-8 flex flex-col items-center">
        <header className="w-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center items-center"
          >
            <div className="absolute inset-0 bg-primary-container/10 blur-3xl rounded-full transform scale-150"></div>
            <img
              alt="Aprenda+ Logo"
              className="relative w-64 md:w-80 object-contain drop-shadow-[0_12px_40px_rgba(0,46,82,0.1)] mx-auto"
              src={logo}
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
              {view === 'login' && 'Bem-vindo de volta!'}
              {view === 'signup' && 'Crie sua conta!'}
              {view === 'forgot_password' && 'Recuperar Senha'}
            </h2>
            <p className="text-on-surface-variant text-sm font-body">
              {view === 'login' && 'Entre para continuar sua jornada de conhecimento.'}
              {view === 'signup' && 'Comece sua jornada de conhecimento agora.'}
              {view === 'forgot_password' && 'Digite seu e-mail para receber um link de recuperação.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleAuth}>
            {view === 'signup' && (
              <Input
                label="Nome Completo"
                icon={User}
                placeholder="Seu nome"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <Input
              label="E-mail"
              icon={User}
              placeholder="nome@exemplo.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {view !== 'forgot_password' && (
              <div className="space-y-1.5 w-full">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Senha</label>
                  {view === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setView('forgot_password');
                        setErrorText('');
                        setMessage('');
                      }}
                      className="text-xs font-bold text-primary hover:underline transition-colors"
                    >
                      Esqueceu?
                    </button>
                  )}
                </div>
                <Input
                  icon={Lock}
                  placeholder="••••••••"
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightIcon={
                    <button
                      className="text-outline-variant hover:text-outline"
                      type="button"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                      aria-label={isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
              </div>
            )}

            {errorText && <p className="text-red-500 text-sm font-medium text-center">{errorText}</p>}
            {message && <p className="text-green-600 text-sm font-medium text-center">{message}</p>}

            <Button
              type="submit"
              isLoading={loading}
              fullWidth
              className="mt-2"
            >
              {view === 'login' ? 'Entrar' : view === 'signup' ? 'Cadastrar' : 'Enviar Link'}
            </Button>
          </form>

          {view !== 'forgot_password' && (
            <>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-surface-variant"></div>
                <span className="flex-shrink mx-4 text-outline-variant text-xs font-bold uppercase tracking-widest">ou {view === 'login' ? 'entre' : 'cadastre-se'} com</span>
                <div className="flex-grow border-t border-surface-variant"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn('google')}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white border border-surface-variant shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group disabled:opacity-50"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-[15px] font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Entrar com o Google</span>
                </button>
              </div>
            </>
          )}
        </motion.section>

        <footer className="text-center pb-8">
          <p className="text-on-surface-variant font-body mb-2">
            {view === 'login' && 'Ainda não tem uma conta?'}
            {view === 'signup' && 'Já possui uma conta?'}
            {view === 'forgot_password' && 'Lembrou sua senha?'}
            <button
              className="text-primary font-bold hover:text-primary-dim ml-1 transition-colors"
              onClick={() => {
                setView(view === 'login' ? 'signup' : 'login');
                setErrorText('');
                setMessage('');
              }}
            >
              {view === 'login' ? 'Criar Conta' : 'Fazer Login'}
            </button>
          </p>
        </footer>
      </main>
    </div>
  );
});

export default Login;

