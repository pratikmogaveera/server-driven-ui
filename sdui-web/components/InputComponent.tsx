import { Component } from '@/lib/main.schema';
import { Input } from './ui/input';
import { UseFormRegisterReturn } from 'react-hook-form';

const InputComponent = ({
  data,
  validator,
}: {
  data: Extract<Component, { type: 'input' }>;
  validator?: UseFormRegisterReturn<string>;
}) => {
  return (
    <Input
      name={data.name}
      type={data.inputType}
      className={data.className}
      placeholder={data.placeholder}
      {...validator}
    />
  );
};

export default InputComponent;
