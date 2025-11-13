import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { rest } from 'msw';
import { server } from '../setupTests';
import { updateTodo, deleteTodo } from './index';

const API_URL = 'https://todo-node-e0cb.onrender.com/api/todos';

describe('API functions', () => {
  describe('updateTodo', () => {
    it('should send a PUT request to the correct URL', async () => {
      const todoId = '123';
      const completed = true;
      let requestUrl = '';

      server.use(
        rest.put(`${API_URL}/${todoId}`, (req, res, ctx) => {
          requestUrl = req.url.toString();
          return res(ctx.json({ _id: todoId, completed }));
        })
      );

      await updateTodo(todoId, completed);

      expect(requestUrl).toBe(`${API_URL}/${todoId}`);
    });
  });

  describe('deleteTodo', () => {
    it('should send a DELETE request to the correct URL', async () => {
      const todoId = '456';
      let requestUrl = '';

      server.use(
        rest.delete(`${API_URL}/${todoId}`, (req, res, ctx) => {
          requestUrl = req.url.toString();
          return res(ctx.status(200));
        })
      );

      await deleteTodo(todoId);

      expect(requestUrl).toBe(`${API_URL}/${todoId}`);
    });
  });
});
