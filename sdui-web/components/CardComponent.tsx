import { Component } from '@/lib/main.schema';
import { cn } from '@/lib/utils';
import ComponentMapper from './ComponentMapper';

const CardComponent = ({ data }: { data: Extract<Component, { type: 'card' }> }) => {
  return (
    <div className={cn('flex w-fit flex-col gap-4 rounded-lg border p-4', data.className)}>
      {data.children.map((item, i) => (
        <ComponentMapper data={item} key={i} />
      ))}
    </div>
  );
};

export default CardComponent;
