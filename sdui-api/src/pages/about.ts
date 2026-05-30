import type { FastifyReply, FastifyRequest } from 'fastify';
import { PageSchema, type Page } from '../schema.js';

export function AboutPage(request: FastifyRequest, reply: FastifyReply) {
  const payload: Page = {
    id: 'about',
    title: 'About',
    root: {
      type: 'container',
      children: [
        {
          type: 'card',
          className: '',
          children: [
            {
              type: 'text',
              content: 'Welcome to About page!',
              className: 'font-bold',
            },
            {
              type: 'input',
              inputType: 'text',
              name: 'test-input',
              placeholder: 'This is input textfield',
            },
          ],
        },
      ],
    },
  };

  const result = PageSchema.safeParse(payload);
  if (!result.success) {
    reply.code(500).send({ error: 'Invalid page schema', details: result.error.issues });
    return;
  }

  reply.send(result.data);
}
