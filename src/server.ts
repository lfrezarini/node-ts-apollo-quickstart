import * as http from 'http';
import { Logger } from 'winston';
import { container } from './bin';
import { helloHandler } from './api/hello/hello';

const port = 3000;
const host = 'localhost';

const logger = container.resolve<Logger>('logger');
const handleMessage = container.resolve<typeof helloHandler>('messageController');

const server = http.createServer((req, res): void => {
  logger.info('Incoming request...');

  if (req.url === '/message') {
    handleMessage(req, res);
    return;
  }

  res.end('No route found');
});

server.listen(port, host, (): void => {
  logger.info(`Server running at http://${host}:${port}`);
});
