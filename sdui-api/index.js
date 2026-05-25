import { PageSchema } from './schema.js';
import cors from '@fastify/cors';
import Fastify from 'fastify'

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
}

const fastify = Fastify({
  logger: envToLogger['development'] ?? true // defaults to true if no entry matches in the map
})

fastify.register(cors, {
  origin: ['http://localhost:3000']
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.get('/home', function (request, reply) {
  const payload = {
    id: 'home',
    title: 'Home',
    root: {
      type: 'container',
      children: [
        {
          type: 'button',
          label: 'Navigate to /about',
          action: { type: 'navigate', target: '/about' },
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
  }

  const result = PageSchema.safeParse(payload)
  if (!result.success) {
    reply.code(500).send({ error: 'Invalid page schema', details: result.error.issues })
    return
  }

  reply.send(result.data)
})

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
