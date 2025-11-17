import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProphetStory } from '@/types/prophet';

interface ProphetCardProps {
  prophet: ProphetStory;
}

export function ProphetCard({ prophet }: ProphetCardProps) {
  const { t } = useTranslation();

  console.log('ProphetCard rendering, id:', prophet.id);

  return (
    <Link to='/prophets/$id' params={{ id: prophet.id }} className='block h-full' onClick={() => console.log('Link clicked, navigating to:', prophet.id)}>
      <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }} className='h-full'>
        <Card className='h-full border-border bg-card hover:border-primary/30 transition-colors'>
          <CardHeader className='space-y-2'>
            <div className='flex items-center justify-between gap-2'>
              <CardTitle className='text-xl sm:text-2xl text-foreground'>{t(prophet.nameKey)}</CardTitle>
              {prophet.arabicName && <span className='text-lg sm:text-xl text-muted-foreground font-arabic'>{prophet.arabicName}</span>}
            </div>
            {prophet.titleKey && <CardDescription className='text-sm text-muted-foreground'>{t(prophet.titleKey)}</CardDescription>}
          </CardHeader>
          <CardContent>
            <p className='text-sm sm:text-base text-foreground/90 line-clamp-3'>{t(prophet.summaryKey)}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
