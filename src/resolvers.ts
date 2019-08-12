import { IResolvers } from 'apollo-server';
import { container } from './bin';
import { Module } from './interfaces/module';

export const getResolvers = (): IResolvers[] => {
  const books = container.resolve<Module>('books');

  return [books.resolvers];
};
