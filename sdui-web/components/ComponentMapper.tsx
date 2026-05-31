'use client';
import { Component } from '@/lib/main.schema';
import ButtonComponent from './ButtonComponent';
import CardComponent from './CardComponent';
import ContainerComponent from './ContainerComponent';
import FallbackComponent from './FallbackComponent';
import FormComponent from './FormComponent';
import InputComponent from './InputComponent';

const ComponentMapper = ({ data }: { data: Component }) => {
  if (data.type === 'container') return <ContainerComponent data={data} />;

  if (data.type === 'button') return <ButtonComponent data={data} />;

  if (data.type === 'text') return <p className={data.className}>{data.content}</p>;

  if (data.type === 'input') return <InputComponent data={data} />;

  if (data.type === 'card') return <CardComponent data={data} />;

  if (data.type === 'form') return <FormComponent data={data} />;

  return <FallbackComponent />;
};

export default ComponentMapper;
