'use client';
import ComponentMapper from '@/components/ComponentMapper';
import FallbackPage from '@/components/FallbackPage';
import { Skeleton } from '@/components/ui/skeleton';
import { ActionResolverContext } from '@/hooks/ActionResolverContext';
import useActionResolver from '@/hooks/useActionsResolver';
import axiosInstance from '@/lib/axiosInstance';
import { Page, PageSchema } from '@/lib/main.schema';
import { useEffect, useState } from 'react';

const MainPageComponent = ({ slug }: { slug: string }) => {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resolver = useActionResolver();

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await axiosInstance.get<Page>(slug);
        const page = PageSchema.parse(data);
        setPageData(page);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong.');
      }
    };
    fetchPage();
  }, [slug]);

  if (error) return <FallbackPage />;

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
