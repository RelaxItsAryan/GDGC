import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gdgcLogo from '@/assets/gdgc-logo.png';

export default function Loader({ onFinish }: { onFinish?: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onFinish && onFinish(), 2000); // auto-finish after 2s
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        <motion.img
          src={gdgcLogo}
          alt="GDGC Logo"
          className="h-20 w-auto"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
        <motion.div
          className="text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          Loading GDGC...
        </motion.div>
      </motion.div>
    </div>
  );
}
