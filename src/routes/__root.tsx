import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NotFoundPage } from '@/components/NotFoundPage';

export const Route = createRootRoute({
  component: () => (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
  notFoundComponent: NotFoundPage,
});
