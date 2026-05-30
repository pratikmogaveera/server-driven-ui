import type { FastifyReply, FastifyRequest } from 'fastify';

export function contactSubmit(request: FastifyRequest, reply: FastifyReply) {
  reply.status(201).send({ message: 'Data received successfully.' });
}
