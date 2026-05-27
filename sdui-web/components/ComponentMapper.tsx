'use client';
import useActionResolver from '@/hooks/useActionsResolver';
import { Component } from '@/lib/main.schema';

const ComponentMapper = ({ data }: { data: Component }) => {
  const resolver = useActionResolver();

  const map = (data: Component) => {
    if (data.type === 'container')
      return (
        <>
          {data?.children?.map((item, i) => (
            <ComponentMapper data={item} key={i} />
          ))}
        </>
      );
    if (data.type === 'button') {
      return (
        <button className={data.className} onClick={() => resolver(data.action)}>
          {data?.label}
        </button>
      );
    }

    if (data.type === 'text') return <p className={data.className}>{data.content}</p>;

    if (data.type === 'input') return <input name={data.name} type={data.inputType} className={data.className} placeholder={data.placeholder} />;
  };
  return <div>{map(data)}</div>;
};

export default ComponentMapper;
