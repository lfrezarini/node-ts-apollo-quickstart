import { ApolloServer, IResolvers } from 'apollo-server';

import { Logger } from 'winston';

import { DocumentNode } from 'graphql';
import { Config } from './config';

export class Server {
  private host: string;

  private port: number;

  private logger: Logger;

  public readonly server: ApolloServer;

  public constructor(environment: Config, logger: Logger, resolvers: IResolvers, typeDefs: DocumentNode[]) {
    this.logger = logger;

    this.host = environment.HTTP_HOST;
    this.port = environment.HTTP_PORT;

    this.server = new ApolloServer({
      typeDefs,
      resolvers
    });
  }

  public async listen(): Promise<void> {
    const info = await this.server.listen({
      host: this.host,
      port: this.port
    });

    this.logger.info(`Server running at ${info.url}`);
  }

  public async dispose(): Promise<void> {
    this.logger.info(`Disposing server...`);

    try {
      await this.server.stop();
    } catch (err) {
      this.logger.error(err);
    }

    this.logger.info(`Server disposed.`);
  }
}
