const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('returns 404 if route not found', () => {
  test('returns 404 if route not found ', () => {
    return request(app)
      .get('/bad_route')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('not found');
      });
  });
});
describe('GET /api/topics', () => {
  test('GET /api/topics returns list of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.topics[0]).toHaveProperty('slug');
        expect(response.body.topics[0]).toHaveProperty('description');
      });
  });
});
