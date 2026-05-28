import { Container } from '@/lib/main.schema';
import ComponentMapper from './ComponentMapper';

const ContainerComponent = ({ data }: { data: Container }) => {
  return (
    <div className={data.className}>
      {data?.children?.map((item, i) => (
        <ComponentMapper data={item} key={i} />
      ))}
    </div>
  );
};

export default ContainerComponent;
