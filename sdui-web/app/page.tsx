'use client';
import axios from 'axios';
import ComponentMapper from './_components/ComponentMapper';
import { Page, PageSchema } from '../lib/main.schema';
import { useState, useEffect } from 'react';

export default function Home() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await axios.get<Page>('http://localhost:3001/home');
        const page = PageSchema.parse(data);
        setPageData(page);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong.');
      }
    };
    fetchPage();
  }, []);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!pageData) return <p className="p-6">Loading...</p>;

  return (
    <>
      <header className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-lg font-bold">{pageData.title}</h1>
      </header>
      <main className="flex-1 p-6">
        <ComponentMapper data={pageData.root} />
      </main>
    </>
  );
}
