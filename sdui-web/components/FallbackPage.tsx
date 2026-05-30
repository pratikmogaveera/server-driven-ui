import React from 'react';

const FallbackPage = () => {
  return (
    <>
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h1 className="text-3xl font-bold">Oops!</h1>
      </header>
      <main className="flex-1 p-6">
        <p>Something went wrong, please wait while we fix it!.</p>
      </main>
    </>
  );
};

export default FallbackPage;
