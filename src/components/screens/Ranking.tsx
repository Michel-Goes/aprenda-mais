import { Crown, Award, User } from 'lucide-react';
import { motion } from 'motion/react';

interface RankingProps {
  userName?: string;
}

export default function Ranking({ userName = 'Estudante' }: RankingProps) {
  const topThree = [
    { name: 'Lucas Silva', points: '14.2k', rank: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcSEQUZYQqbY-SOnnYTcQ7fYwOqxV9o6EAzDr0l53Kq9aTJ6iYUZr4me08okOZ_1IeWt6XZsL6JaSoE1tzp1XxIwjEIEa6TiRuVqV1zJjJ1MAWswwU4fZY4HX_JfmIKX1QHx7zaldZDIaBGzuHQ8KxpIwnoI7vX1VQXE00i8B8Guc5BeWYnNN3CDwmo_NVF1qFzkJQp4ipARkvwe3vhN6kRCMErixYDHR-BRdWB7-dYyhvj1_QYFVyOty5uBhgsp4POff9NOOdf63D' },
    { name: 'Ana Clara', points: '15.8k', rank: 1, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN22My7KSB8vXFQIdyYSbcunQWGG2MprKPK_y5C-8DRH9Ql860YLe5ydh2r4VogTHitQyM8F2YYdr6Rzt2tlCxp2UdaK9Tg9DisBdUEtYgEFOOPBTkh9-HksfbNDPjkd7QlF_LpLUIHGL-M2Lgi0PBAoSeeFJRqxmB1RLx95l2RI0PDv5ZWFFsw0AX7RXKGTwEArMWEHXNUdvbvLWYJL7E3RAWMnT3YvpsNWZEKbXzxTnp0tGeYyTuIswE86BPJS7tqMu5BcGI21hd' },
    { name: 'Pedro Santos', points: '12.9k', rank: 3, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB59_FZ0ZSy_6sNE5d9t5ENFhOY2Y2xjbXGTcO8RfgaAFhnNKK3JvFB2WpX19PCQO1kGv-Tz3TpryQTXogwUBOpNk9TCmbzutsmWT3Ymz8xcq12X0D3uVV1n7d2wg3nu755fGPy33V3-A6szP3m3HdF0JR2nE9XwyikEedYwgw4PoQbWmPzQhFlhMLkbV7-8fUbGX3XR5IDBZ9NqSiA6FcS9ObEoneLRN7v9e5tc2ApTb6rsh7MW68-hH9xnKXfdIgmtFl11ndi5FwJ' },
  ];

  const others = [
    { rank: 4, name: 'Ricardo Almeida', points: '11.540', level: 'Ouro III', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhsVxYrrAyDUQJc0P4ES_C00Eug68ScU1AkJNs3HKfQ4GNHo8ArwkojZsbTIKhs7BLKPgxjc5mvy27edGK3NEZE6jn6EA8yyhynyORQU_KDymxRINiEunItapTHJWaDKqcdCUItQ8ibXkSpLRG8lmnF6__xxYbgB1GI9vdK5Ejlt1EC4T-kHvEX65KD_p4LTPfNn1jpp9Q-MpB7o7LAiMrQt7cAgUMNwOTZoRSkMjfVxm_YlWabgfQnoiJ2ZcVV8zOX2mpQB8QRX-7' },
    { rank: 5, name: 'Beatriz Lima', points: '10.820', level: 'Prata I', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwHNEWb13N7xG3pQ3LyrjBUivXN_MmUZ1rcowu-E6D0w7QMMZvw2BaW_ye_w86bmURwevoibJlO5wMnHTRacWEtdBXwXpr5KN9Hj0bJ1pZWSnd5xKpRL5aZaAwvtfQJ1uX1Uqirs9fEpmTUBC4khvR4FsjEIoMiwj8-n5zijIMQYckXteW0D8o4CU9inJUwOdPWxs4vivUWniUoiY84MTJYsEQ3BTEEqxbMl_9k6FUzeoKs3t0TjGwwduVj-gX7JmyOAWNJrmjvA2K' },
    { rank: 24, name: `${userName} (Você)`, points: '4.201', level: 'Quase lá! Suba 4 posições', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzfqpNDUTPVICoo-qb13b-isNypNEW-BKKk61ocdDOJqg9fo2qx6l3WRZwL_GxaUZPT3wu3blhqb9n350LtjRbpp3BBM-1Xlt6DaGhsGQNE1VlB1Sfr0UrnhaRQwSQjEmxmSnPb2gDogf2OnRxNR30JbGetneU2RBk49t9ZaDv-4xwXdFFBezN4I8adW2pd0pG6iGIoqEAzSL1ojFRZoapH5B9ZkhTLSudh1EwJk77SWHsZTi9M3nGy77-V0_8V6EOkwIkw1ZubcCA', isUser: true },
    { rank: 6, name: 'Juliana M.', points: '9.450', level: 'Prata II', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmVIXZwm20owYOW9I8GQyrEwxTkWChXsLs8soucz0zS7pZ9_hYu0wcgz9TlSC7y4U7tJ7dXBnO5LEXgi2nJSwhDS7pn5gyda3J_meJBnSYwdhCyb7dyJND3QbxYsYSOa5Lr33Bfefwkgyk41OlQ-IfZFuHaqX9hNmMlxDDr8RX_7o5Q7gG1NKhGbaCJ4FQn1Lwz4h_puBJpnNMa8Z1lZLh4b1FAAjVf1Y1e1Yx-gnesibqeP3-FA1Hz0aYMz9AZWyBsounUtktSkWz' },
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
            <span className={`w-8 font-black text-lg italic ${person.isUser ? 'text-primary' : 'text-on-surface-variant'}`}>
              {person.rank}
            </span>
            <img className={`w-12 h-12 rounded-full object-cover ${person.isUser ? 'border-2 border-primary' : ''}`} src={person.img} referrerPolicy="no-referrer" />
            <div className="flex-grow">
              <h3 className={`font-bold ${person.isUser ? 'text-primary' : 'text-on-surface'}`}>{person.name}</h3>
              <p className={`text-xs ${person.isUser ? 'text-primary-dim font-bold' : 'text-on-surface-variant'}`}>{person.level}</p>
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
