import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProphetDetail } from '@/components/ProphetDetail';
import { PROPHETS } from '@/data/prophets';

export const Route = createFileRoute('/prophets/$id')({
  loader: ({ params }) => {
    const prophet = PROPHETS.find((p) => p.id === params.id);
    if (!prophet) throw notFound();

    return { prophet };
  },
  component: ProphetDetailPage,
});

function ProphetDetailPage() {
  const { prophet } = Route.useLoaderData();
  return <ProphetDetail prophet={prophet} />;
}
