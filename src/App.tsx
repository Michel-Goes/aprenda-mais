import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { supabase } from './services/supabase';
import MainLayout from './components/layout/MainLayout';

const Login = React.lazy(() => import('./pages/Login'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Ranking = React.lazy(() => import('./pages/Ranking'));
const Journey = React.lazy(() => import('./pages/Journey'));
const Exercises = React.lazy(() => import('./pages/Exercises'));
const Store = React.lazy(() => import('./pages/Store'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Lesson = React.lazy(() => import('./pages/Lesson'));
const Help = React.lazy(() => import('./pages/Help'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const UpdatePassword = React.lazy(() => import('./pages/UpdatePassword'));

// Loading Fallback
const LoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center text-primary font-headline">
    Carregando...
  </div>
);

// Wrapper para as Rotas passarem os callbacks nativos para os componentes
function RoutesWrapper({ userName, avatarUrl }: { userName: string; avatarUrl: string | null }) {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Journey />} />
        <Route path="exercises" element={<Exercises onStartLesson={(subj) => navigate(`/lesson/${subj}`)} />} />
        <Route path="lesson" element={<Navigate to="/exercises" replace />} />
        <Route path="lesson/:subject" element={<LessonWrapper />} />
        <Route path="ranking" element={<Ranking userName={userName} avatarUrl={avatarUrl} />} />
        <Route path="store" element={<Store />} />
        <Route path="profile" element={<Profile userName={userName} avatarUrl={avatarUrl} onSettingsClick={() => navigate('/settings')} />} />
        <Route path="settings" element={<Settings userName={userName} avatarUrl={avatarUrl} onLogout={() => supabase.auth.signOut()} onNavigate={(r) => navigate(`/${r}`)} />} />
        <Route path="help" element={<Help onBack={() => navigate('/settings')} />} />
        <Route path="privacy" element={<Privacy onBack={() => navigate('/settings')} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function LessonWrapper() {
  const { subject } = useParams();
  const navigate = useNavigate();
  return <Lesson subject={subject as 'math' | 'portuguese'} onBack={() => navigate('/exercises')} />;
}


export default function App() {
  const [session, setSession] = useState<any>(null);
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
        setIsRecoveringPassword(true);
      }
      setIsLoadingSession(false);

      if (window.location.hash.includes('type=recovery')) {
        setTimeout(() => {
          window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }, 500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoadingSession) {
    return <LoadingScreen />;
  }

  if (isRecoveringPassword) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <UpdatePassword onPasswordUpdated={() => setIsRecoveringPassword(false)} />
      </Suspense>
    );
  }

  if (!session) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Login />
      </Suspense>
    );
  }

  const userMetadata = session.user?.user_metadata || {};
  const userName = userMetadata.full_name || 'Estudante';
  const avatarUrl = userMetadata.custom_avatar_url || null;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <RoutesWrapper userName={userName} avatarUrl={avatarUrl} />
      </Suspense>
    </BrowserRouter>
  );
}
