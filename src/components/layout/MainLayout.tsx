import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { AnimatePresence, motion } from 'motion/react';

export default function MainLayout() {
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/lesson');

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={location.pathname}
           initial={{ opacity: 0, x: 10 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -10 }}
           transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
