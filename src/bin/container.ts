import { createContainer, InjectionMode, asValue, AwilixContainer } from 'awilix';

import { environment } from '../config';
import { logger } from '../services/logger';
import { helloHandler } from '../api/hello/hello';

export const makeContainer = (depsOverride?: Record<string, any>): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  });

  container.register({
    environment: asValue(environment),
    logger: asValue(logger),
    messageController: asValue(helloHandler),
    ...depsOverride
  });

  return container;
};
