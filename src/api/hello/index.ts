import { IncomingMessage, ServerResponse } from 'http';

export const helloHandler = (req: IncomingMessage, res: ServerResponse): void => {
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      message: 'hello world!'
    })
  );
};
