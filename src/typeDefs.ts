import { DocumentNode } from 'graphql';
import { container } from './bin';

import { rootTypeDefs } from './schema';
import { Module } from './interfaces/module';

export const getTypeDefs = (): DocumentNode[] => {
  const books = container.resolve<Module>('books');
  return [rootTypeDefs, books.typeDefs];
};
