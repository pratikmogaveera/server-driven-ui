import { z } from 'zod';

export const ActionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('navigate'), target: z.string() }),
  z.object({
    type: z.literal('api_call'),
    endpoint: z.string(),
    method: z.enum(['post', 'get', 'put', 'delete']),
  }),
]);

export const ContainerSchema = z.object({
  type: z.literal('container'),
  className: z.string().optional(),
  children: z.array(z.lazy(() => ComponentSchema)),
});

export const ComponentSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    content: z.string(),
    className: z.string().optional(),
  }),
  z.object({
    type: z.literal('button'),
    label: z.string(),
    action: ActionSchema,
    className: z.string().optional(),
  }),
  ContainerSchema,
]);

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  root: ContainerSchema,
});

// module.exports = { ActionSchema, ComponentSchema, ContainerSchema, PageSchema };
