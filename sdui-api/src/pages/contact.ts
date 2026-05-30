import type { FastifyReply, FastifyRequest } from 'fastify';
import { PageSchema, type Page } from '../schema.js';

export function ContactPage(request: FastifyRequest, reply: FastifyReply) {
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
              submit: {
                endpoint: '/contact-submit',
                method: 'post',
                trigger: {
                  type: 'button',
                  label: 'Submit',
                  buttonType: 'submit',
                  action: {
                    type: 'submit',
                  },
                },
              },
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
}
