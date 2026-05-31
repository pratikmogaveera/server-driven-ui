'use client';
import ComponentMapper from '@/components/ComponentMapper';
import FallbackPage from '@/components/FallbackPage';
import { Skeleton } from '@/components/ui/skeleton';
import { ActionResolverContext } from '@/hooks/ActionResolverContext';
import useActionResolver from '@/hooks/useActionsResolver';
import axiosInstance from '@/lib/axiosInstance';
import { Page, PageSchema } from '@/lib/main.schema';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ZodError } from 'zod';

const MainPageComponent = ({ slug }: { slug: string }) => {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resolver = useActionResolver();

  const fetchPage = async () => {
    try {
      setError(null);
      const { data } = await axiosInstance.get<Page>(slug);
      const page = PageSchema.parse(data);
      setPageData(page);
    } catch (e) {
      const error =
        e instanceof ZodError
          ? e
          : e instanceof AxiosError
            ? e
            : new AxiosError('Something went wrong.');

      if (error instanceof ZodError) {
        console.error('Schema validation failed:', error.issues);
        setError('Something went wrong while loading this page.');
        return;
      }
      if (error.code === 'ERR_NETWORK')
        setError('Failed to establish connection with server. Please try again.');
      else if (error.code === 'ECONNABORTED')
        setError('Took too long to hear from server. Please try again.');
      else if (error.code === 'ERR_BAD_REQUEST')
        setError('Oops, we messed up something. Please try again.');
      else setError(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageData(null);
    fetchPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (error) return <FallbackPage message={error} retry={() => fetchPage()} />;

  return (
    <ActionResolverContext.Provider value={{ resolver }}>
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        {pageData ? (
          <h1 className="text-3xl font-bold">{pageData.title}</h1>
        ) : (
          <Skeleton className="h-9 w-30" />
        )}
      </header>
      <main className="flex-1 p-6">
        {pageData ? (
          <ComponentMapper data={pageData.root} />
        ) : (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((item) => (
              <Skeleton className="h-8 w-1/2" key={item} />
            ))}
          </div>
        )}
      </main>
    </ActionResolverContext.Provider>
  );
};

export default MainPageComponent;
