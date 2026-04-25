import { Crown, Award, User } from 'lucide-react';
import { motion } from 'motion/react';

interface RankingProps {
  userName?: string;
  avatarUrl?: string | null;
}

import lucasImg from '../assets/images/Lucas Silva.jpeg';
import anaImg from '../assets/images/Ana Clara.jpeg';
import pedroImg from '../assets/images/Pedro Santos.jpeg';
import ricardoImg from '../assets/images/Ricardo Almeida.jpeg';
import beatrizImg from '../assets/images/Beatriz Lima.jpeg';
import julianaImg from '../assets/images/Juliana M..jpeg';

export default function Ranking({ userName = 'Estudante', avatarUrl = null }: RankingProps) {
  const topThree = [
    { name: 'Lucas Silva', points: '14.2k', rank: 2, img: lucasImg },
    { name: 'Ana Clara', points: '15.8k', rank: 1, img: anaImg },
    { name: 'Pedro Santos', points: '12.9k', rank: 3, img: pedroImg },
  ];

  const others = [
    { rank: 4, name: 'Ricardo Almeida', points: '11.540', level: 'Ouro III', img: ricardoImg },
    { rank: 5, name: 'Beatriz Lima', points: '10.820', level: 'Prata I', img: beatrizImg },
    { rank: 24, name: `${userName} (Você)`, points: '4.201', level: 'Quase lá! Suba 4 posições', img: avatarUrl, isUser: true },
    { rank: 6, name: 'Juliana M.', points: '9.450', level: 'Prata II', img: julianaImg },
  ];

  return (
    <main className="pt-24 px-4 pb-32 max-w-2xl mx-auto">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-2">Liga de Diamante</h1>
          <p className="text-on-surface-variant font-medium">Faltam 2 dias para o fim da temporada</p>
        </div>

        <div className="flex items-end justify-center gap-2 md:gap-4 h-64 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative mb-2">
              <img className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-surface-variant object-cover shadow-lg" src={topThree[0].img} referrerPolicy="no-referrer" />
              <div className="absolute -bottom-2 -right-1 bg-white rounded-full p-1 shadow-md">
                <Award className="w-4 h-4 text-gray-400 fill-current" />
              </div>
            </div>
            <div className="bg-surface-container-low w-full rounded-t-lg pt-6 pb-4 text-center h-32 flex flex-col justify-between">
              <span className="font-bold text-sm block px-2 truncate">{topThree[0].name}</span>
              <span className="text-primary font-black text-lg">{topThree[0].points}</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative mb-4 scale-110">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Crown className="w-10 h-10 text-[#F4D151] fill-current" />
              </div>
              <img className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#F4D151] object-cover shadow-xl" src={topThree[1].img} referrerPolicy="no-referrer" />
            </div>
            <div className="bg-primary-container w-full rounded-t-lg pt-8 pb-6 text-center h-44 flex flex-col justify-between shadow-[0_-12px_24px_rgba(70,165,255,0.2)]">
              <span className="font-black text-on-primary-container block px-2 truncate">{topThree[1].name}</span>
              <span className="text-on-primary-container font-black text-xl">{topThree[1].points}</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center w-1/3">
            <div className="relative mb-2">
              <img className="w-16 h-16 md:w-18 md:h-18 rounded-full border-4 border-tertiary-container object-cover shadow-lg" src={topThree[2].img} referrerPolicy="no-referrer" />
              <div className="absolute -bottom-2 -right-1 bg-white rounded-full p-1 shadow-md">
                <Award className="w-4 h-4 text-[#cd7f32] fill-current" />
              </div>
            </div>
            <div className="bg-surface-container-low w-full rounded-t-lg pt-4 pb-4 text-center h-24 flex flex-col justify-between">
              <span className="font-bold text-sm block px-2 truncate">{topThree[2].name}</span>
              <span className="text-primary font-black text-lg">{topThree[2].points}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {others.map((person, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-lg transition-transform duration-200 ${
              person.isUser 
                ? 'bg-blue-50 border-2 border-primary-container shadow-md my-6' 
                : 'bg-white hover:scale-[1.02]'
            }`}
          >
            <span className={`w-8 flex-shrink-0 font-black text-lg italic ${person.isUser ? 'text-primary' : 'text-on-surface-variant'}`}>
              {person.rank}
            </span>
            {person.img ? (
              <img className={`w-12 h-12 flex-shrink-0 rounded-full object-cover ${person.isUser ? 'border-2 border-primary' : ''}`} src={person.img} referrerPolicy="no-referrer" />
            ) : (
              <div className={`w-12 h-12 flex-shrink-0 rounded-full bg-blue-500 flex items-center justify-center ${person.isUser ? 'border-2 border-primary' : ''}`}>
                <span className="text-lg font-headline font-bold text-white uppercase">
                  {person.name.replace(' (Você)', '').split(' ').map(n => n[0]).slice(0, 2).join('')}
                </span>
              </div>
            )}
            <div className="flex-grow min-w-0">
              <h3 className={`font-bold truncate ${person.isUser ? 'text-primary' : 'text-on-surface'}`} title={person.name}>{person.name}</h3>
              <p className={`text-xs truncate ${person.isUser ? 'text-primary-dim font-bold' : 'text-on-surface-variant'}`} title={person.level}>{person.level}</p>
            </div>
            <div className="text-right">
              <span className={`font-black text-primary ${person.isUser ? 'text-xl' : ''}`}>{person.points}</span>
              <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Pontos</p>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
