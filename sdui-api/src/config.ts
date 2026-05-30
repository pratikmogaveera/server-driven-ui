import { AboutPage } from './pages/about.js';
import { ContactPage } from './pages/contact.js';
import { HomePage } from './pages/home.js';

export const envToLogger = {
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

export const pageMapper = {
  contact: ContactPage,
  about: AboutPage,
  home: HomePage,
};
