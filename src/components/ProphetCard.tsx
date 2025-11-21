import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { CardDescription, CardTitle } from '@/components/ui/card'
import SpotlightCard from '@/components/SpotlightCard'
import type { ProphetStory } from '@/types/prophet'

interface ProphetCardProps {
  prophet: ProphetStory
}

export function ProphetCard({ prophet }: ProphetCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to="/prophets/$id"
      params={{ id: prophet.id }}
      className="block h-full"
    >
      <SpotlightCard className="h-full transition-all duration-200 hover:-translate-y-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                {t(prophet.nameKey)}
              </CardTitle>
              {prophet.arabicName && (
                <span className="text-lg sm:text-xl text-muted-foreground font-arabic">
                  {prophet.arabicName}
                </span>
              )}
            </div>
            {prophet.titleKey && (
              <CardDescription className="text-sm text-muted-foreground">
                {t(prophet.titleKey)}
              </CardDescription>
            )}
          </div>
          <p className="text-sm sm:text-base text-foreground/90 line-clamp-3">
            {t(prophet.summaryKey)}
          </p>
        </div>
      </SpotlightCard>
    </Link>
  )
}
