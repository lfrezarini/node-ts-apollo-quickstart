import { createContainer, InjectionMode, asValue, AwilixContainer } from 'awilix';
import { logger } from '../services/logger';
import { helloHandler } from '../api/hello/hello';

export const makeContainer = (depsOverride?: Record<string, any>): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  });

  container.register({
    logger: asValue(logger),
    messageController: asValue(helloHandler),
    ...depsOverride
  });

  return container;
};
