import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ui/darkmode';
import { motion, AnimatePresence } from 'framer-motion';
import { useReaderStore } from '@/store/readerStore';
import { Ryqo } from '@/components/ryqo';

export function Header() {
  const { t } = useTranslation();
  const focusMode = useReaderStore((state) => state.focusMode);

  return (
    <AnimatePresence>
      {!focusMode && (
        <motion.header
          initial={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='lg:sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        >
          <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                <Ryqo className='h-8 w-8' />
                <span className='text-lg sm:text-xl font-semibold text-foreground'>{t('header.title')}</span>
              </Link>

              <div className='flex items-center gap-2 sm:gap-3'>
                <LanguageSwitcher />
                <ModeToggle />
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
