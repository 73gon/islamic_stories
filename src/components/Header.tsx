import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ModeToggle } from './ui/darkmode';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
            <BookOpen className='h-6 w-6 text-primary' />
            <span className='text-lg sm:text-xl font-semibold text-foreground'>{t('header.title')}</span>
          </Link>

          <div className='flex items-center gap-2 sm:gap-3'>
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
