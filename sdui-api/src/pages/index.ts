import type { FastifyReply, FastifyRequest } from 'fastify';
import { AboutPage } from './about.js';
import { ContactPage } from './contact.js';
import { HomePage } from './home.js';

export const pageMapper: Record<string, (request: FastifyRequest, reply: FastifyReply) => void> = {
  contact: ContactPage,
  about: AboutPage,
  home: HomePage,
};

const index = (pageId: string, request: FastifyRequest, reply: FastifyReply) => {
  if (pageMapper[pageId]) return pageMapper[pageId](request, reply);
  else return reply.status(404).send({ error: 'This page doesnt exist' });
};

export default index;
