import { createTestClient } from 'apollo-server-testing';

import { gql } from 'apollo-server';
import { makeContainer } from '../../../src/bin/container';
import { Server } from '../../../src/server';

const GET_BOOKS = gql`
  query {
    books {
      title
      author
    }
  }
`;

describe('get all books test', (): void => {
  test('Should return all books', async (): Promise<void> => {
    const container = makeContainer();
    const srv = container.resolve<Server>('server');

    const { query } = createTestClient(srv.server);

    const res = await query({
      query: GET_BOOKS
    });

    expect(res.data).not.toBeFalsy();

    const { data } = res as any;

    expect(data.books).not.toBeFalsy();
    expect(data.books).toBeInstanceOf(Array);
    expect(data.books.length).toBe(2);
  });
});
