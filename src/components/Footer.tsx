import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className='w-full border-t border-border bg-card mt-auto'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <p className='text-sm text-muted-foreground'>{t('footer.copyright')}</p>
          <p className='text-xs text-muted-foreground max-w-2xl'>{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
