import cors from '@fastify/cors';
import Fastify from 'fastify';
import { envToLogger } from './config.js';
import { AboutPage } from './pages/about.js';
import { ContactPage } from './pages/contact.js';
import { HomePage } from './pages/home.js';
import { contactSubmit } from './routes/action.js';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fastify = Fastify({
  logger: envToLogger['development'] ?? true, // defaults to true if no entry matches in the map
});

fastify.register(cors, {
  origin: ['http://localhost:3000'],
});

fastify.setErrorHandler((error: Error, request, reply) => {
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

fastify.get('/:pageId', function (request, reply) {
  const { pageId } = request.params;

  switch (pageId) {
    case 'home':
      HomePage(request, reply);
      break;
    case 'about':
      AboutPage(request, reply);
      break;
    case 'contact':
      ContactPage(request, reply);
      break;
    default:
      return reply.status(404).send({ error: 'This page doesnt exist' });
  }
});

fastify.post('/contact-submit', contactSubmit);

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
