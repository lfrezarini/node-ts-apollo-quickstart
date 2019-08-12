import { createContainer, InjectionMode, asValue, asClass, AwilixContainer, asFunction } from 'awilix';

import * as books from '../books';
import { environment } from '../config';
import { logger } from '../services/logger';
import { Server } from '../server';
import { getTypeDefs } from '../typeDefs';
import { getResolvers } from '../resolvers';

export const makeContainer = (depsOverride?: Record<string, any>): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  });

  container
    .register({
      environment: asValue(environment),
      logger: asValue(logger)
    })
    .register({
      books: asValue(books)
    })
    .register({
      typeDefs: asFunction(getTypeDefs).singleton(),
      resolvers: asFunction(getResolvers).singleton(),
      server: asClass(Server)
        .singleton()
        .disposer((server): Promise<void> => server.dispose()),
      ...depsOverride
    });

  return container;
};
