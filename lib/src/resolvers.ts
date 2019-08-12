import { IResolvers } from 'apollo-server';
import { Module } from './interfaces/module';

export const getResolvers = (books: Module): IResolvers[] => {
  return [books.resolvers];
};
