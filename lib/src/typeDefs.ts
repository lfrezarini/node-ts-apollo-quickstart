import { DocumentNode } from 'graphql';

import { rootTypeDefs } from './schema';
import { Module } from './interfaces/module';

export const getTypeDefs = (books: Module): DocumentNode[] => {
  return [rootTypeDefs, books.typeDefs];
};
