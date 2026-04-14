import { Lock, Mountain, CheckCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Journey() {
  return (
    <main className="pt-28 pb-32 min-h-screen relative overflow-hidden bg-surface">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-40 left-10 w-64 h-64 bg-primary-container rounded-full blur-3xl"></div>
        <div className="absolute bottom-80 right-0 w-80 h-80 bg-tertiary-container rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md mx-auto px-6 relative z-10">
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Sua Jornada</h2>
          <p className="text-on-surface-variant font-medium">Explore as ilhas do conhecimento</p>
        </div>

        <div className="relative flex flex-col items-center gap-24">
          {/* Island 5: Future (Locked) */}
          <div className="relative w-full flex justify-start">
            <div className="group relative flex flex-col items-center">
              <div className="w-24 h-24 bg-surface-variant rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:scale-105 transition-transform duration-200">
                <Lock className="text-outline w-10 h-10" />
              </div>
              <span className="mt-3 font-bold text-outline text-sm tracking-wide">Ilha das Sombras</span>
            </div>
          </div>

          {/* Island 4: Future (Locked) */}
          <div className="relative w-full flex justify-end pr-8">
            <div className="group relative flex flex-col items-center">
              <div className="w-24 h-24 bg-surface-variant rounded-xl flex items-center justify-center shadow-lg transform -rotate-6 hover:scale-105 transition-transform duration-200">
                <Lock className="text-outline w-10 h-10" />
              </div>
              <span className="mt-3 font-bold text-outline text-sm tracking-wide">Pico Nevado</span>
            </div>
            {/* Connector Line 4-5 */}
            <div className="absolute top-[-80px] right-20 w-32 h-24 border-r-4 border-t-4 border-dashed border-surface-variant rounded-tr-[3rem] -z-10"></div>
          </div>

          {/* Island 3: Current Stage (Active Highlight) */}
          <div className="relative w-full flex justify-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-4 bg-primary-container/30 rounded-xl blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-primary-container rounded-xl flex flex-col items-center justify-center shadow-[0_12px_40px_rgba(0,94,160,0.3)] hover:scale-105 transition-transform duration-200 ring-4 ring-white">
                <Mountain className="text-white w-12 h-12 mb-1 fill-current" />
                <div className="absolute -top-4 -right-4 bg-tertiary-container text-on-tertiary-container font-black px-3 py-1 rounded-full text-xs shadow-md">ATUAL</div>
              </div>
              <span className="block text-center mt-4 font-bold text-primary text-lg">Floresta Tropical</span>
            </div>
            {/* Connector Line 3-4 */}
            <div className="absolute top-[-80px] left-1/2 w-48 h-24 border-l-4 border-t-4 border-dashed border-primary-container/40 rounded-tl-[3rem] -z-10"></div>
          </div>

          {/* Island 2: Completed */}
          <div className="relative w-full flex justify-start pl-8">
            <div className="group relative flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md transform rotate-6 border-4 border-primary-container/20 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="text-primary-container w-10 h-10 fill-current" />
              </div>
              <span className="mt-3 font-bold text-on-surface-variant text-sm tracking-wide">Dunas de Areia</span>
            </div>
            {/* Connector Line 2-3 */}
            <div className="absolute top-[-80px] left-20 w-32 h-24 border-l-4 border-t-4 border-dashed border-primary-container/40 rounded-tl-[3rem] -z-10"></div>
          </div>

          {/* Island 1: Start (Completed) */}
          <div className="relative w-full flex justify-center">
            <div className="group relative flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shadow-md transform -rotate-3 border-4 border-primary-container/20 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="text-primary-container w-10 h-10 fill-current" />
              </div>
              <span className="mt-3 font-bold text-on-surface-variant text-sm tracking-wide">Porto de Entrada</span>
            </div>
            {/* Connector Line 1-2 */}
            <div className="absolute top-[-80px] left-1/4 w-32 h-24 border-r-4 border-t-4 border-dashed border-primary-container/40 rounded-tr-[3rem] -z-10"></div>
          </div>
        </div>
      </div>

      {/* Floating Progress Card */}
      <div className="fixed bottom-28 left-6 right-6 z-40">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-white/90 backdrop-blur-xl p-5 rounded-lg shadow-[0_20px_50px_rgba(0,46,82,0.1)] border border-white/50"
        >
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Missão Atual</p>
              <h3 className="text-xl font-bold text-on-background">Gramática Básica II</h3>
            </div>
            <span className="text-sm font-black text-on-surface-variant">65%</span>
          </div>
          <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[65%] rounded-full"></div>
            <div className="absolute top-1/2 left-[65%] -translate-y-1/2 -translate-x-1/2 bg-tertiary-container p-1 rounded-full shadow-sm">
              <Star className="w-3 h-3 text-on-tertiary-container fill-current" />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
