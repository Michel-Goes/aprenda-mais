import { Volume2, Bell, HelpCircle, Lock, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsProps {
  onLogout: () => void;
  userName?: string;
}

export default function Settings({ onLogout, userName = 'Estudante' }: SettingsProps) {
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

      <div className="bg-white p-6 rounded-lg mb-8 shadow-[0_12px_32px_rgba(0,46,82,0.06)] flex items-center gap-4">
        <div className="relative">
          <img 
            alt="User Profile" 
            className="w-16 h-16 rounded-full object-cover border-4 border-primary-container" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK1JZZfaYkUEOTQbQFFggWlyybkjlpb5pQ8UfXZxLcnFIfLu05cm1M-gwoqIG87x6wzfCOTVBlA9VsvZCFD-2QVosOiyqFqdOMxceIPRca7SdjZEH1_7UC8RkHqvisrTT4PvVcBSXnRKo_5sX_66HskzPmplNAVPBQBJ79GzSylnnn9mQ3n7Aq4tuAFnYMFI4pBxNREkd4LI_E6-pcJl8wNuGBajfld3_ZcplEX6i6IMNlXx0vdtxbv5NSgZPE3tKrMJrMzzaWadoN" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-1 -right-1 bg-tertiary-container text-on-tertiary-container p-1 rounded-full text-[10px] font-bold shadow-sm">LVL 5</div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-surface">{userName}</h3>
          <p className="text-sm text-on-surface-variant font-medium">Estudante desde Jan 2024</p>
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
              <input checked className="sr-only peer" type="checkbox" readOnly />
              <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
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
              <input checked className="sr-only peer" type="checkbox" readOnly />
              <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
            </label>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)]">
          <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="font-bold text-on-surface">Ajuda</span>
            </div>
            <ChevronRight className="w-5 h-5 text-outline" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors rounded-lg">
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
        <p className="text-xs font-bold text-outline uppercase tracking-widest">Aprenda+ v2.4.0</p>
        <div className="mt-4 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-container"></div>
          <div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
          <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
        </div>
      </div>
    </main>
  );
}
