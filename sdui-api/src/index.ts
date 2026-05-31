import cors from '@fastify/cors';
import Fastify, { type FastifyError } from 'fastify';
import { envToLogger } from './config.js';
import pages from './pages/index.js';
import { contactSubmit } from './routes/action.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fastify = Fastify({
  logger: envToLogger['development'] ?? true, // defaults to true if no entry matches in the map
});

fastify.register(cors, {
  origin: ['http://localhost:3000'],
});

fastify.setErrorHandler((error: FastifyError, request, reply) => {
  const statusCode: number = error?.statusCode || 500;

  reply.status(statusCode).send({
    success: false,
    statusCode,
    error: error?.name || 'Internal Server Error',
    message: error?.message || 'An unexpected error occurred.',
  });
});

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});

fastify.get<{ Params: { pageId: string } }>('/:pageId', function (request, reply) {
  const { pageId } = request.params;
  pages(pageId, request, reply);
});

fastify.post('/contact-submit', contactSubmit);

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
