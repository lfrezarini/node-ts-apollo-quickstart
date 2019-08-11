import { IncomingMessage, ServerResponse } from 'http';
import { helloHandler } from './hello';

export interface Controllers {
  hello: (req: IncomingMessage, res: ServerResponse) => void;
}

export const controllers: Controllers = {
  hello: helloHandler
};
