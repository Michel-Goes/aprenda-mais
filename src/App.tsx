import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { AnimatePresence, motion } from 'motion/react';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Ranking from './components/screens/Ranking';
import Journey from './components/screens/Journey';
import Exercises from './components/screens/Exercises';
import Store from './components/screens/Store';
import Settings from './components/screens/Settings';
import TopBar from './components/TopBar';
import BottomNav, { ScreenType } from './components/BottomNav';
import Lesson from './components/screens/Lesson';
import Help from './components/screens/Help';
import Privacy from './components/screens/Privacy';
import UpdatePassword from './components/screens/UpdatePassword';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [activeScreen, setActiveScreen] = useState<ScreenType>('journey');
  const [lessonSubject, setLessonSubject] = useState<'math' | 'portuguese'>('portuguese');
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveringPassword(true);
      } else if (session && window.location.hash.includes('type=recovery')) {
        // Fallback in case the event is INITIAL_SESSION but the URL has the recovery hash
        setIsRecoveringPassword(true);
      }
      setIsLoadingSession(false);

      // Limpar o hash da URL APÓS o Supabase estabalecer a sessão
      if (window.location.hash.includes('type=recovery')) {
        setTimeout(() => {
          window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }, 500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && !isRecoveringPassword) {
      setActiveScreen('journey');
    }
  }, [session, isRecoveringPassword]);

  if (isLoadingSession) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-headline">Carregando...</div>;
  }

  // A tela de recuperação tem prioridade se estiver ativa, não importa a sessão
  if (isRecoveringPassword) {
    return <UpdatePassword onPasswordUpdated={() => setIsRecoveringPassword(false)} />;
  }

  if (!session) {
    return <Login />;
  }


  const userMetadata = session.user?.user_metadata || {};
  const userName = userMetadata.full_name || 'Estudante';
  const avatarUrl = userMetadata.custom_avatar_url || null;

  const renderScreen = () => {
    switch (activeScreen) {
      case 'journey':
        return <Journey />;
      case 'exercises':
        return (
          <Exercises
            onStartLesson={(subject) => {
              setLessonSubject(subject);
              setActiveScreen('lesson');
            }}
          />
        );
      case 'lesson':
        return <Lesson subject={lessonSubject} onBack={() => setActiveScreen('exercises')} />;
      case 'ranking':
        return <Ranking userName={userName} avatarUrl={avatarUrl} />;
      case 'store':
        return <Store />;
      case 'profile':
        return <Profile userName={userName} avatarUrl={avatarUrl} onSettingsClick={() => setActiveScreen('settings')} />;
      case 'settings':
        return <Settings userName={userName} avatarUrl={avatarUrl} onLogout={() => supabase.auth.signOut()} onNavigate={(screen) => setActiveScreen(screen as ScreenType)} />;
      case 'help':
        return <Help onBack={() => setActiveScreen('settings')} />;
      case 'privacy':
        return <Privacy onBack={() => setActiveScreen('settings')} />;
      default:
        return <Journey />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {activeScreen !== 'lesson' && (
        <BottomNav
          activeScreen={activeScreen}
          onScreenChange={(screen) => setActiveScreen(screen)}
        />
      )}
    </div>
  );
}
