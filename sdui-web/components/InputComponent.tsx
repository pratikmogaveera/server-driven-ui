import { Component } from '@/lib/main.schema';
import { Input } from './ui/input';

const InputComponent = ({ data }: { data: Extract<Component, { type: 'input' }> }) => {
  return (
    <Input
      name={data.name}
      type={data.inputType}
      className={data.className}
      placeholder={data.placeholder}
    />
  );
};

export default InputComponent;
