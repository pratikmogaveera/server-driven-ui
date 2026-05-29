import cors from '@fastify/cors';
import Fastify from 'fastify';
import { PageSchema, type Page } from './schema.js';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

const fastify = Fastify({
  logger: envToLogger['development'] ?? true, // defaults to true if no entry matches in the map
});

fastify.register(cors, {
  origin: ['http://localhost:3000'],
});

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});

fastify.get('/home', function (request, reply) {
  const payload = {
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
});

fastify.get('/about', function (request, reply) {
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
});

fastify.get('/contact', function (request, reply) {
  const payload: Page = {
    id: 'contact',
    root: {
      type: 'container',
      children: [
        {
          type: 'card',
          children: [
            {
              type: 'text',
              content: 'First form:',
              className: 'font-semibold text-lg',
            },
            {
              type: 'form',
              className: 'flex flex-col gap-4',
              children: [
                {
                  type: 'input',
                  inputType: 'email',
                  name: 'email-input',
                  placeholder: 'Enter your email address',
                  validationObject: {
                    message: 'Please enter a valid email address',
                    type: 'onBlur',
                  },
                },
                {
                  type: 'input',
                  inputType: 'password',
                  name: 'password-input',
                  placeholder: 'Enter your password',
                  validationObject: {
                    message: 'Please enter a valid password',
                    type: 'onBlur',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    title: 'Contact Page',
  };

  const result = PageSchema.safeParse(payload);
  if (!result.success) {
    reply.code(500).send({ error: 'Invalid page schema', details: result.error.issues });
    return;
  }

  reply.send(result.data);
});

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
