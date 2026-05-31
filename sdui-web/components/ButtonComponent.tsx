import { useActionResolverConsumer } from '@/hooks/ActionResolverContext';
import { Component } from '@/lib/main.schema';
import { Button } from './ui/button';

const ButtonComponent = ({ data }: { data: Extract<Component, { type: 'button' }> }) => {
  const { resolver } = useActionResolverConsumer();
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
