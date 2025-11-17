import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ProphetCard } from './ProphetCard';
import { SearchBar } from '@/components/SearchBar';
import type { ProphetStory } from '@/types/prophet';

interface ProphetListProps {
  prophets: ProphetStory[];
}

export function ProphetList({ prophets }: ProphetListProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProphets = useMemo(() => {
    if (!searchQuery.trim()) return prophets;

    const query = searchQuery.toLowerCase();
    return prophets.filter((prophet) => {
      const name = t(prophet.nameKey).toLowerCase();
      const arabicName = prophet.arabicName?.toLowerCase() || '';
      const title = prophet.titleKey ? t(prophet.titleKey).toLowerCase() : '';
      const summary = t(prophet.summaryKey).toLowerCase();

      return name.includes(query) || arabicName.includes(query) || title.includes(query) || summary.includes(query);
    });
  }, [prophets, searchQuery, t]);

  return (
    <div className='w-full space-y-6 sm:space-y-8'>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {filteredProphets.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-muted-foreground text-base sm:text-lg'>No prophets found matching your search.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {filteredProphets.map((prophet) => (
            <ProphetCard key={prophet.id} prophet={prophet} />
          ))}
        </div>
      )}
    </div>
  );
}
