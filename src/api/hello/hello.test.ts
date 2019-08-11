import { helloHandler } from './index';

test("should call end with the message 'hello world'", (): void => {
  const request = {};

  const endMock = jest.fn();

  const response = {
    setHeader: jest.fn(),
    end: endMock
  };

  helloHandler(request as any, response as any);

  expect(endMock).toBeCalledWith(JSON.stringify({ message: 'hello world!' }));
});
