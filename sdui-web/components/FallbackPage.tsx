import { Button } from './ui/button';

const FallbackPage = ({ message, retry }: { message: string; retry: () => void }) => {
  return (
    <>
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h1 className="text-3xl font-bold">Oops!</h1>
      </header>
      <main className="flex-1 p-6">
        <p>{message}</p>
        <Button onClick={retry}>Retry.</Button>
      </main>
    </>
  );
};

export default FallbackPage;
