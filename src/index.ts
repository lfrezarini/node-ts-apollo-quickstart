import { container } from './bin';
import { Server } from './server';

const srv = container.resolve<Server>('server');
const dispose = (): Promise<void> => container.dispose();

process.on('SIGINT', dispose);
process.on('SIGHUP', dispose);
process.on('SIGTERM', dispose);

srv.listen();
