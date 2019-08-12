import { books } from './data';

export const resolvers = {
  Query: {
    books: (): Record<string, any>[] => books
  }
};
