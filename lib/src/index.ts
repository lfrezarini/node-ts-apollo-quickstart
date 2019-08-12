import { makeContainer } from './bin/container';
import { Server } from './server';

const init = (depsOverride?: any[]): Promise<void> => {
  const container = makeContainer(depsOverride);
  const srv = container.resolve<Server>('server');
  const dispose = (): Promise<void> => container.dispose();

  process.on('SIGINT', dispose);
  process.on('SIGHUP', dispose);
  process.on('SIGTERM', dispose);

  return srv.listen();
};

init();
