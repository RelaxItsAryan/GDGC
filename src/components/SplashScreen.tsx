import { useEffect, useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import splashLogo from '@/assets/gdgc-logo.png'; // Placeholder, will update to new image
import hologramLogo from '@/assets/holo-gdgc.png'; // Corrected file name




export default function SplashScreen() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => navigate('/home'), 4500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <AnimatePresence>
        <motion.div
          className="flex flex-col min-h-screen text-foreground relative overflow-hidden"
          style={{
            backgroundImage: `url(${hologramLogo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay for darkening and clarity */}
          <div className="absolute inset-0 bg-black/20 z-0" />
          {/* Text content at the top, only once */}
          <div className="w-full flex flex-col items-center justify-center min-h-screen z-10">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4 tracking-tight text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-gradient-google">GDGC VIT Bhopal</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-light tracking-wide text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Building. Learning. Growing Together.
            </motion.p>
          </div>

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
          }}
        />

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 text-muted-foreground/40 font-mono text-xs hidden md:block">
          {'<GDGC/>'}
        </div>
        <div className="absolute top-8 right-8 text-muted-foreground/40 font-mono text-xs hidden md:block">
          {'{connected}'}
        </div>
        <div className="absolute bottom-8 left-8 text-muted-foreground/40 font-mono text-xs hidden md:block">
          v1.0.0
        </div>
        <div className="absolute bottom-8 right-8 text-muted-foreground/40 font-mono text-xs hidden md:block">
          VIT Bhopal
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
