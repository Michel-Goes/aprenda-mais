import { Star, Flame, Award, Settings, ChevronRight, Camera, User, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface ProfileProps {
  onSettingsClick: () => void;
  userName?: string;
}

export default function Profile({ onSettingsClick, userName = 'Estudante', avatarUrl = null }: ProfileProps & { avatarUrl?: string | null }) {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(avatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAvatarSrc(avatarUrl);
  }, [avatarUrl]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        alert('Erro ao enviar imagem. Verifique se o bucket "avatars" existe e é público no Supabase.');
        throw uploadError;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl }
      });
      
      setAvatarSrc(data.publicUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsUploading(true);
      await supabase.auth.updateUser({
        data: { avatar_url: null }
      });
      setAvatarSrc(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="pt-24 px-6 pb-32 max-w-2xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        <div className="bg-white p-8 rounded-lg shadow-[0_12px_32px_rgba(0,46,82,0.06)] flex flex-col md:flex-row items-center gap-8 overflow-hidden">
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-xl bg-primary-container p-1 shadow-lg transform -rotate-3 cursor-pointer group relative overflow-hidden flex items-center justify-center"
              onClick={handleAvatarClick}
            >
              {avatarSrc ? (
                <img 
                  alt="Avatar" 
                  className="w-full h-full object-cover rounded-[1.5rem]" 
                  src={avatarSrc} 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-blue-500 flex items-center justify-center rounded-[1.5rem]">
                  <span className="text-5xl font-headline font-bold text-white uppercase">
                    {userName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]">
                {isUploading ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Camera className="w-8 h-8 text-white" />
                )}
              </div>
            </div>

            {avatarSrc && (
              <button 
                onClick={handleRemovePhoto}
                className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 hover:scale-110 transition-all z-20"
                title="Remover foto"
                disabled={isUploading}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}  
              className="hidden" 
              accept="image/*"
            />
            <div className="absolute -bottom-2 -right-2 bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-white z-10">
              5
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface mb-1">{userName}</h2>
            <p className="text-on-surface-variant font-medium mb-6">Pequeno Explorador Galático</p>

            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-bold font-label uppercase tracking-wider text-primary">Próximo Nível</span>
                <span className="text-xs font-bold font-label text-on-surface-variant">850 / 1000 XP</span>
              </div>
              <div className="h-4 bg-surface-variant rounded-full relative overflow-visible">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full w-[85%] relative">
                  <div className="absolute -right-2 -top-2 bg-tertiary-container w-8 h-8 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    <Star className="w-4 h-4 fill-current text-on-tertiary-container" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface-container-low p-6 rounded-lg flex flex-col items-center text-center">
          <Flame className="w-8 h-8 text-tertiary mb-2 fill-current" />
          <span className="text-2xl font-black font-headline text-on-surface">12 Dias</span>
          <span className="text-xs font-bold text-on-surface-variant font-label">Ofensiva</span>
        </div>
        <div className="bg-surface-container-low p-6 rounded-lg flex flex-col items-center text-center">
          <Award className="w-8 h-8 text-primary mb-2 fill-current" />
          <span className="text-2xl font-black font-headline text-on-surface">45</span>
          <span className="text-xs font-bold text-on-surface-variant font-label">Conquistas</span>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-headline font-extrabold text-on-surface">Minhas Medalhas</h3>
          <button className="text-primary font-bold text-sm hover:underline font-label">Ver tudo</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Mestre da Leitura', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
            { label: 'Explorador Espacial', icon: Award, color: 'bg-blue-100 text-blue-600' },
            { label: 'Primeiro Lugar', icon: Award, color: 'bg-green-100 text-green-600' },
          ].map((medal, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-[0_4px_12px_rgba(0,46,82,0.04)] flex flex-col items-center"
            >
              <div className={`w-16 h-16 ${medal.color} rounded-full flex items-center justify-center mb-3`}>
                <medal.icon className="w-8 h-8 fill-current" />
              </div>
              <span className="text-[10px] font-bold text-center leading-tight font-label text-on-surface">{medal.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <button
          onClick={onSettingsClick}
          className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-5 rounded-lg text-lg font-black font-headline shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <Settings className="w-6 h-6" />
          Configurar Perfil
        </button>
      </section>
    </main>
  );
}
