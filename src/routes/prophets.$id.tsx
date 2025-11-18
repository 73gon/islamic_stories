import { createFileRoute } from '@tanstack/react-router'
import { ProphetDetail } from '@/components/ProphetDetail'
import { PROPHETS } from '@/data/prophets'
import { NotFoundPage } from '@/components/NotFoundPage'

export const Route = createFileRoute('/prophets/$id')({
  component: function ProphetDetailPage() {
    const { id } = Route.useParams()
    const prophet = PROPHETS.find((p) => p.id === id)

    if (!prophet) {
      return <NotFoundPage />
    }

    return <ProphetDetail prophet={prophet} />
  },
})
