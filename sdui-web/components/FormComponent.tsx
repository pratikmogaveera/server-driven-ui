import { Component } from '@/lib/main.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputComponent from './InputComponent';

function getValidation(type: string, message: string) {
  switch (type) {
    case 'text':
      return z.string(message).nonempty();
    case 'email':
      return z.email(message);
    case 'password':
      return z.string(message).min(6).max(20);
    default:
      return z.string(message).nonempty();
  }
}

const FormComponent = ({ data }: { data: Extract<Component, { type: 'form' }> }) => {
  const formSchema = z.object(
    Object.fromEntries(
      data.children.map((item) => [
        item.name,
        getValidation(item.inputType, item.validationObject?.message || ''),
      ])
    )
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  console.log(formSchema);

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className={data.className}>
        {data.children.map((item, i) => (
          <div key={i}>
            <InputComponent data={item} validator={form.register(item.name)} />
            <p className="text-xs text-red-400">{form.formState.errors[item.name]?.message}</p>
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormComponent;
