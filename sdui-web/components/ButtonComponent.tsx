import useActionResolver from '@/hooks/useActionsResolver';
import { Component } from '@/lib/main.schema';
import { Button } from './ui/button';

const ButtonComponent = ({ data }: { data: Extract<Component, { type: 'button' }> }) => {
  const resolver = useActionResolver();
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
