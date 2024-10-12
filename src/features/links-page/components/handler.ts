import { rest, setupWorker } from 'msw';

export const handlers = [
  // Other handlers...
  rest.get(
    '/src/features/links-page/components/link-create.tsx',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.set('Content-Type', 'application/javascript'),
        ctx.body('// Mock JavaScript content'),
      );
    },
  ),
];

const worker = setupWorker(...handlers);

worker.start({
  onUnhandledRequest: 'bypass', // This will allow unhandled requests to pass through
});
