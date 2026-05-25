import { z } from 'zod';

const ActionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('navigate'), target: z.string() }),
  z.object({
    type: z.literal('api_call'),
    endpoint: z.string(),
    method: z.enum(['post', 'get', 'put', 'delete']),
  }),
]);
type Component =
  | { type: 'text'; content: string; className?: string }
  | { type: 'button'; label: string; action: z.infer<typeof ActionSchema>; className?: string }
  | { type: 'container'; className?: string; children: Component[] };

const ContainerSchema = z.object({
  type: z.literal('container'),
  className: z.string().optional(),
  children: z.array(z.lazy(() => ComponentSchema)),
});

const ComponentSchema: z.ZodType<Component> = z.discriminatedUnion('type', [
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

const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  root: ContainerSchema,
});

export { ActionSchema, ComponentSchema, ContainerSchema, PageSchema };
export type { Component };
export type Action = z.infer<typeof ActionSchema>;
export type Page = z.infer<typeof PageSchema>;
