'use client';
import { Action, Component } from '@/lib/main.schema';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

const ComponentMapper = ({ data }: { data: Component }) => {
  const actionMapper = (action: Action) => {
    if (action.type == 'api_call') {
      const instance = axios.create({
        baseURL: 'http://localhost:3001',
      });

      if (action.method === 'get') instance.get(action.endpoint);
    }
  };

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
      if (data.action.type === 'navigate') return <Link href={data.action.target}>{data.label}</Link>;
      else return <button onClick={() => actionMapper(data.action)}>{data?.label}</button>;
    }
    if (data.type === 'text') return <p>{data.content}</p>;
  };
  return <div>{map(data)}</div>;
};

export default ComponentMapper;
