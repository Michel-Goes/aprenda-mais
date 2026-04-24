import { Volume2, Bell, HelpCircle, Lock, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface SettingsProps {
  onLogout: () => void;
  onNavigate: (screen: 'help' | 'privacy') => void;
  userName?: string;
  avatarUrl?: string | null;
}

export default function Settings({ onLogout, onNavigate, userName = 'Estudante', avatarUrl = null }: SettingsProps) {
  const [somEnabled, setSomEnabled] = useState(() => {
    const saved = localStorage.getItem('somEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [notificacoesEnabled, setNotificacoesEnabled] = useState(() => {
    const saved = localStorage.getItem('notificacoesEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('somEnabled', JSON.stringify(somEnabled));
  }, [somEnabled]);

  useEffect(() => {
    localStorage.setItem('notificacoesEnabled', JSON.stringify(notificacoesEnabled));
  }, [notificacoesEnabled]);

  return (
    <main className="pt-24 px-6 pb-32 max-w-2xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-extrabold text-on-background tracking-tight mb-2">Configurações</h2>
        <p className="text-on-surface-variant">Personalize sua experiência de aprendizado</p>
      </motion.section>

      <div className="bg-white p-6 rounded-lg mb-8 flex items-center shadow-[0_12px_32px_rgba(0,46,82,0.06)] gap-4">
        <div className="relative">
          {avatarUrl ? (
            <img className="w-16 h-16 rounded-full object-cover border-2 border-primary-container" src={avatarUrl} alt="Avatar" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center border-2 border-primary-container">
              <span className="text-2xl font-headline font-bold text-white uppercase">
                {userName.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </span>
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary-container p-1 rounded-full text-[10px] font-bold shadow-sm">LVL 5</div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-surface">{userName}</h3>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-2 rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)]">
          <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Volume2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-on-surface">Som</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input checked={somEnabled} onChange={() => setSomEnabled(!somEnabled)} className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-tertiary">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-bold text-on-surface">Notificações</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input checked={notificacoesEnabled} onChange={() => setNotificacoesEnabled(!notificacoesEnabled)} className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-black peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
            </label>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)]">
          <button onClick={() => onNavigate('help')} className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="font-bold text-on-surface">Ajuda</span>
            </div>
            <ChevronRight className="w-5 h-5 text-outline" />
          </button>
          <button onClick={() => onNavigate('privacy')} className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Lock className="w-5 h-5" />
              </div>
              <span className="font-bold text-on-surface">Privacidade</span>
            </div>
            <ChevronRight className="w-5 h-5 text-outline" />
          </button>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)]">
          <button 
            id="logout-button"
            data-testid="logout-button"
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-error/10 transition-colors rounded-lg group"
          >
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold text-error">Sair</span>
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs font-bold text-outline uppercase tracking-widest">Aprenda+ BETA</p>
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-container"></div>
          <div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
          <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
        </div>
      </div>
    </main>
  );
}
