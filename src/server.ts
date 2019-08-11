import * as http from 'http';
import { Logger } from 'winston';
import { container } from './bin';
import { helloHandler } from './api/hello/hello';
import { Config } from './config';

const config = container.resolve<Config>('environment');
const logger = container.resolve<Logger>('logger');
const handleMessage = container.resolve<typeof helloHandler>('messageController');

const port = config.HTTP_PORT;
const host = config.HTTP_HOST;

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
