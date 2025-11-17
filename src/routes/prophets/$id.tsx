import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProphetDetail } from '@/components/ProphetDetail';
import { PROPHETS } from '@/data/prophets';

console.log('Route file loaded, PROPHETS:', PROPHETS);

export const Route = createFileRoute('/prophets/$id')({
  loader: ({ params }) => {
    console.log('Loader called with params:', params);
    console.log(
      'Available prophets:',
      PROPHETS.map((p) => p.id),
    );
    const prophet = PROPHETS.find((p) => p.id === params.id);
    console.log('Found prophet:', prophet);
    if (!prophet) {
      console.log('Prophet not found, throwing notFound');
      throw notFound();
    }
    return { prophet };
  },
  component: ProphetDetailPage,
});

function ProphetDetailPage() {
  console.log('ProphetDetailPage component rendering');
  const { prophet } = Route.useLoaderData();
  console.log('Prophet from loader:', prophet);
  return <ProphetDetail prophet={prophet} />;
}
