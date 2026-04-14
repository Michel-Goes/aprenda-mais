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

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [activeScreen, setActiveScreen] = useState<ScreenType>('journey');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Login />;
  }

  const userMetadata = session.user?.user_metadata || {};
  const userName = userMetadata.full_name || 'Estudante';

  const renderScreen = () => {
    switch (activeScreen) {
      case 'journey':
        return <Journey />;
      case 'exercises':
        return <Exercises />;
      case 'ranking':
        return <Ranking userName={userName} />;
      case 'store':
        return <Store />;
      case 'profile':
        return <Profile userName={userName} onSettingsClick={() => setActiveScreen('settings')} />;
      case 'settings':
        return <Settings userName={userName} onLogout={() => supabase.auth.signOut()} />;
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

      <BottomNav 
        activeScreen={activeScreen} 
        onScreenChange={(screen) => setActiveScreen(screen)} 
      />
    </div>
  );
}
