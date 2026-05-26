import MainPageComponent from './MainPageComponent';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <MainPageComponent slug={slug} />
    </>
  );
}
