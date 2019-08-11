import * as http from 'http';
import { Logger } from 'winston';
import { Config } from './config';
import { Controllers } from './api';

export class Server {
  private host: string;

  private port: number;

  private logger: Logger;

  private server!: http.Server;

  private controllers: Controllers;

  public constructor(environment: Config, controllers: Controllers, logger: Logger) {
    this.logger = logger;

    this.host = environment.HTTP_HOST;
    this.port = environment.HTTP_PORT;
    this.controllers = controllers;

    this.configure();
  }

  private configure(): void {
    this.server = http.createServer((req, res): void => {
      this.logger.info('Incoming request...');

      if (req.url === '/message' && req.method === 'GET') {
        this.controllers.hello(req, res);
        return;
      }

      res.end('No route found');
    });
  }

  public listen(): void {
    this.server.listen(this.port, this.host, (): void => {
      this.logger.info(`Server running at http://${this.host}:${this.port}`);
    });
  }

  public async dispose(): Promise<void> {
    this.logger.info('Disposing server...');
    this.server.close((err): Promise<void> => (err ? Promise.reject(err) : Promise.resolve()));
  }
}
