import { Map, BookOpen, Trophy, ShoppingBag, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'journey';

  const navItems = [
    { id: 'journey', path: '/', label: 'Jornada', icon: Map },
    { id: 'exercises', path: '/exercises', label: 'Exercícios', icon: BookOpen },
    { id: 'ranking', path: '/ranking', label: 'Ranking', icon: Trophy },
    { id: 'store', path: '/store', label: 'Loja', icon: ShoppingBag },
    { id: 'profile', path: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/70 backdrop-blur-md rounded-t-[2rem] shadow-[0_-8px_24px_rgba(0,46,82,0.08)]">
      {navItems.map((item) => {
        const isActive = currentPath === item.id || (item.id === 'journey' && currentPath === '') || (item.id === 'profile' && ['settings', 'help', 'privacy'].includes(currentPath));
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
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
