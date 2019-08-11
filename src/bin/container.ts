import { createContainer, InjectionMode, asValue, asClass, AwilixContainer } from 'awilix';

import { controllers } from '../api';
import { environment } from '../config';
import { logger } from '../services/logger';
import { Server } from '../server';

export const makeContainer = (depsOverride?: Record<string, any>): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  });

  container.register({
    environment: asValue(environment),
    logger: asValue(logger),
    controllers: asValue(controllers),
    server: asClass(Server)
      .singleton()
      .disposer((server): Promise<void> => server.dispose()),
    ...depsOverride
  });

  return container;
};
