import { ShoppingBag, Star, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Store() {
  const categories = ['Tudo', 'Avatares', 'Roupas', 'Power-ups'];
  const items = [
    {
      id: 1,
      name: 'Escudo 2x XP',
      description: 'Dobre sua experiência em todas as lições por 1 hora.',
      price: 150,
      tag: 'Especial',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBzN7VbNY26955Rkz7U7Zf5GsBeE7W1U5e54sIiGJ8vi8UVir5tkLWHmtlDXT-IJBbo3zRr6fVTI9qWwgjkq0vB8uMD0meX1oOTBNgT9rN6ymrBokRyXs_o7FCFWC6AgSxkhr76F5TvLiFMEWpjZ7RYv0w8jqEZnyTbIZZajH4LTkMxbJWHox9D_H5bJ4LO1xbn5lL5wVQ08LeJkmNYpOV8GuzRvtSmaEvPx7_aiwqzUtZuNhZjOWOuj9LBBLuZtkMth3FEXFHxQWj',
    },
    {
      id: 2,
      name: 'Astro-Explorador',
      description: 'Um avatar lendário para os mestres da ciência e astronomia.',
      price: 500,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRfXn3wQiNNpR2BImEJEMrl7vOzAKogVEsY8XbDdSEKj7bCsHwrnfkEB67EtlcjeaGvOT0r8wdQ5cBF5gSSX5ymumysfNJL1idaaAYQ_MJdKY4o8LSm22_LHSgtdcrZ6TSK_0tDkN1vrWjaAn5DA53hKaC8qin63HL7oXd_eCXj0bRzp-v5pcxwm_Xip6RlLvWlFF3Nhhk1Wok4PYTyXPl_B4eJJpYaiQgzdJcFaSF38_83SAf-zNU-5qLfzzDXngeLRXAeXNOG4CQ',
    },
    {
      id: 3,
      name: 'Jaqueta Universitária',
      description: 'Mantenha seu avatar estiloso com esta jaqueta premium.',
      price: 220,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzl11RQUUb5J1d6vG9UaVdp2mB4TT2BPouRsgLG_TaS_gxfpYNYbvLPQIIeuRVa0CF-YltRLpxLZqt2MDmKnpeKZW8rc3QXUJXdak0MjGhGwMz0pp158ksJM4P6fs1PVcF3kmGbt4bXjJGqViQ6PtujyjWV5Y8w93wK0zzRn2DR_ZBxTCMpCt9nV4O11QOIfl323_oQg2iUcDQzJxqk69dZpUOYMpwgCSHqxkLtSLFTeKntBWe5O1K89qllZVLdk6NUo-qXeghDF1i',
    },
    {
      id: 4,
      name: 'Parada no Tempo',
      description: 'Garante 30 segundos extras em qualquer desafio cronometrado.',
      price: 75,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiGRLtXcZeU_pyaNZZhSlFu107-PLZIsJvLAxCsKg9Fewuj0bXiIJQiQtxpcxsUnRJvEdB9MRh8_hzR4ryHQdotbtR29vtH9OUvDQoa-bY-O89qzhZSqibTaZPGLAdJ5ZVLzkxzkQPet22bTXJSwh7FAESRRlFqKykyOVLb2bS6YlnQlxnGCRCmTZXwg5_SfRYyiyh-zt0LX4wqodQ_hGcbwK7kMTSYkk4-W08Ag5S6d5eQwW7K-gHGm9DXekSVCOUOMOmlbYB0B-4',
    },
    {
      id: 5,
      name: 'Gato Cibernético',
      description: 'Um companheiro robótico que te segue em todas as jornadas.',
      price: 1200,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuKRCZKkMKDBaJoL606oDax-D-2yba5CYeCef3B8vEivXNP-Mbgrpsx48md7QO3TGReDJQmGgpn83lug_EcI0iFdYsaCow0lDFF8OGGpUq62Q81ba_SmwZknVo3dMhr0QIHImW1P9IjcxTkpvIYjFvMbYhJGn777gJ7dN8kxRG4AO2VYoiC8ZdoAFaPBZ-aHEefBO4gcvJX7YY4d9ZYmXdv97YAY5jtk-xp2KMSXAnulzOpEn2j8fs0i12WGQtVWkNo8mx6eATYCKl',
    },
    {
      id: 6,
      name: 'Coroa de Platina',
      description: 'Apenas para os maiores sábios da nossa comunidade.',
      price: 2500,
      locked: true,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiTfRa8g3Ms8R8HSupXwJsm_tU-w7iFqLCWrWqPILPKYxBFDIl7DLbdFr0uE0id7-NqmGZltOA9zi0BMANwsEYrNNS658rScgfPZiNvwofNEFEr6ssO1M-Z0irpeNVAFRCa4991ofMbITWpqUP4ujx_vJctCSI1bWh6u3oxD6IU0RLIdhIFOMEwyuEjIpDoGSze1tMql6WUoRxr_bogdfKCQx0MYDubmLk62L_sfYaSbRSLmg5IxV-ErXYs-fB4uMaonx_1yKUEob0',
    },
  ];

  return (
    <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-container p-8 text-white shadow-xl"
      >
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-headline font-extrabold mb-2 leading-tight">Troque suas estrelas por itens épicos!</h2>
          <p className="text-white/80 mb-6 font-medium">Personalize seu avatar e ganhe vantagens exclusivas nas missões diárias.</p>
          <div className="flex gap-4">
            <div className="bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-md">
              <Star className="w-5 h-5 fill-current" />
              <span>540 Moedas</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-30 transform rotate-12">
          <ShoppingBag className="w-48 h-48" />
        </div>
      </motion.section>

      <nav className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={cat}
            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-blue-700 text-white shadow-lg' : 'bg-white text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-lg overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-300 shadow-[0_12px_32px_rgba(0,46,82,0.06)]"
          >
            <div className="relative h-48 bg-surface-container-low flex items-center justify-center p-6">
              <img alt={item.name} className={`w-32 h-32 object-contain ${item.name.includes('Astro') || item.name.includes('Gato') ? 'rounded-full border-4 border-white' : ''}`} src={item.img} referrerPolicy="no-referrer" />
              {item.tag && (
                <span className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container text-xs font-black px-3 py-1 rounded-full uppercase">
                  {item.tag}
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-headline font-bold text-on-surface mb-2">{item.name}</h3>
              <p className="text-on-surface-variant text-sm mb-6 flex-grow">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-current text-[#F4D151]" />
                  <span className="font-black text-[#F4D151] text-lg">{item.price}</span>
                </div>
                {item.locked ? (
                  <button className="bg-surface-container-low text-on-surface-variant/40 px-5 py-2 rounded-lg font-bold text-sm cursor-not-allowed flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Bloqueado
                  </button>
                ) : (
                  <button className="bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                    {item.price > 300 ? 'Comprar' : 'Resgatar'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
