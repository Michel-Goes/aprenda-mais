import { Map, BookOpen, Trophy, ShoppingBag, User } from 'lucide-react';
import { motion } from 'motion/react';

export type ScreenType = 'journey' | 'exercises' | 'ranking' | 'store' | 'profile' | 'settings' | 'lesson';

interface BottomNavProps {
  activeScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

export default function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  const navItems = [
    { id: 'journey', label: 'Jornada', icon: Map },
    { id: 'exercises', label: 'Exercícios', icon: BookOpen },
    { id: 'ranking', label: 'Ranking', icon: Trophy },
    { id: 'store', label: 'Loja', icon: ShoppingBag },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/70 backdrop-blur-md rounded-t-[2rem] shadow-[0_-8px_24px_rgba(0,46,82,0.08)]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.id || (item.id === 'profile' && activeScreen === 'settings');
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id as ScreenType)}
            className={`flex flex-col items-center justify-center p-2 transition-all duration-300 ${
              isActive 
                ? 'bg-yellow-400 text-blue-900 rounded-2xl scale-110 -translate-y-1 shadow-md' 
                : 'text-slate-500 hover:bg-blue-50 rounded-2xl'
            }`}
          >
            <motion.div
              animate={isActive ? { y: [0, -4, 0] } : {}}
              transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
            </motion.div>
            <span className="text-[10px] font-bold mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
