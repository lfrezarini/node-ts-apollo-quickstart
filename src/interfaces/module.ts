import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';

export interface Module {
  typeDefs: DocumentNode;
  resolvers: IResolvers;
}
