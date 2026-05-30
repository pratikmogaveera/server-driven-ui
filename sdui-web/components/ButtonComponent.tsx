import { Action, Component } from '@/lib/main.schema';
import { Button } from './ui/button';

const ButtonComponent = ({
  data,
  resolver,
}: {
  data: Extract<Component, { type: 'button' }>;
  resolver: (action: Action) => void;
}) => {
  return (
    <Button
      className={data.className}
      onClick={() => data.buttonType !== 'submit' && resolver(data.action)}
      type={data.buttonType || 'button'}
    >
      {data?.label}
    </Button>
  );
};

export default ButtonComponent;
