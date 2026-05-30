import type { FastifyReply, FastifyRequest } from 'fastify';
import { PageSchema, type Page } from '../schema.js';

export async function HomePage(request: FastifyRequest, reply: FastifyReply) {
  const payload: Page = {
    id: 'home',
    title: 'Home',
    root: {
      type: 'container',
      className: 'flex flex-col gap-4 w-fit',
      children: [
        {
          type: 'button',
          label: 'Navigate to /about',
          action: { type: 'navigate', target: '/about' },
        },
        {
          type: 'button',
          label: 'Navigate to /contact',
          action: { type: 'navigate', target: '/contact' },
        },
        {
          type: 'button',
          label: 'Recall API',
          action: { type: 'api_call', method: 'get', endpoint: '/home' },
        },
        {
          type: 'text',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, nobis!',
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
