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
            <motion.div
              className="relative inline-block highlight-wrapper text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                className="highlight-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
              />

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-2 tracking-tight text-gradient-google relative z-10">
                GDGC VIT Bhopal
              </h1>

              <p className="text-lg md:text-xl text-white/95 max-w-md mx-auto font-light tracking-wide mt-2 relative z-10 shimmer">
                Building. Learning. Growing Together.
              </p>
            </motion.div>
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
