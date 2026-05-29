import { z } from 'zod';

const apiCallMethodTypes = z.enum(['post', 'get', 'put', 'delete']);

const buttonTypes = z.enum(['button', 'submit', 'reset']);

const ActionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('navigate'), target: z.string() }),
  z.object({
    type: z.literal('api_call'),
    endpoint: z.string(),
    method: apiCallMethodTypes,
  }),
  z.object({
    type: z.literal('submit'),
  }),
]);

export type validationObject = { type: 'onChange' | 'onBlur'; message: string };

type Component =
  | { type: 'text'; content: string; className?: string }
  | {
      type: 'button';
      label: string;
      buttonType?: z.infer<typeof buttonTypes>;
      action: z.infer<typeof ActionSchema>;
      className?: string;
    }
  | { type: 'container'; className?: string; children: Component[] }
  | {
      type: 'input';
      inputType: string;
      name: string;
      placeholder?: string;
      validationObject?: validationObject;
      className?: string;
    }
  | { type: 'card'; children: Component[]; className?: string }
  | {
      type: 'form';
      children: z.infer<typeof InputSchema>[];
      submit: { endpoint: string; method: z.infer<typeof apiCallMethodTypes>; trigger: Component };
      className?: string;
    };

const ContainerSchema = z.object({
  type: z.literal('container'),
  className: z.string().optional(),
  children: z.array(z.lazy(() => ComponentSchema)),
});

const InputSchema = z.object({
  type: z.literal('input'),
  inputType: z.enum(['text', 'email', 'password']),
  name: z.string().nonempty(),
  placeholder: z.string().optional(),
  validationObject: z
    .object({ type: z.enum(['onChange', 'onBlur']), message: z.string() })
    .optional(),
  className: z.string().optional(),
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
    buttonType: z.enum(['button', 'submit']).optional(),
    action: ActionSchema,
    className: z.string().optional(),
  }),
  ContainerSchema,
  InputSchema,
  z.object({
    type: z.literal('card'),
    className: z.string().optional(),
    children: z.array(z.lazy(() => ComponentSchema)),
  }),
  z.object({
    type: z.literal('form'),
    className: z.string().optional(),
    children: z.array(z.lazy(() => InputSchema)),
    submit: z.object({
      endpoint: z.string(),
      method: apiCallMethodTypes,
      trigger: z.lazy(() => ComponentSchema),
    }),
  }),
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
export type Container = z.infer<typeof ContainerSchema>;
