import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ProphetList } from '@/components/ProphetList';
import { PROPHETS } from '@/data/prophets';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full bg-gradient-to-b from-muted/50 to-background border-b border-border'
      >
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
          <div className='max-w-3xl mx-auto text-center space-y-4 sm:space-y-6'>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight'>{t('homepage.title')}</h1>
            <p className='text-base sm:text-lg md:text-xl text-muted-foreground'>{t('homepage.subtitle')}</p>
          </div>
        </div>
      </motion.section>

      {/* Prophet List Section */}
      <section className='w-full'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
          <ProphetList prophets={PROPHETS} />
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: HomePage,
});
