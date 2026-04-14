import { Star } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-md shadow-[0_12px_32px_rgba(0,46,82,0.06)] h-20">
      <div className="flex items-center gap-2">
        <img 
          alt="Aprenda+" 
          className="h-10 w-auto object-contain" 
          src="https://lh3.googleusercontent.com/aida/ADBb0ujxw34yM-zoAxHj6BSe_KZlPwK6__KnQVqdBQ23w2Ehvvzf7ZwPPORZ-A-KlEOSpRMT65CxBaSanZCNOLL6ir1qkYWOOacCTfNDuW-t9Z44L_JvOZItICYyEizIK6ybAgBe-6ch6zY_h6RvOedoShnZyHRKwt-8-75P2bqI15ctLJciWPlAj8virhS_sEfqR6jK5Vo3KYPKWFe0rsePxtG0MzfsDNZefmVs2imLQWQZqFMFKZ91Nb46Z5mwOoXKsR7Z16KAGTusi2E" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="bg-blue-50 px-4 py-1.5 rounded-full flex items-center gap-2">
        <span className="text-blue-700 font-bold text-sm">Nível 5 • 120</span>
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      </div>
    </header>
  );
}
