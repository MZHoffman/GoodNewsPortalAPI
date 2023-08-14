const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/');
const expectedEndpoints = require('../endpoints.json');

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
  test('GET /api/topics returns list of topics wchich is not empty', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).not.toBe(0);
      });
  });
  test('GET /api/topics returns list of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        const { topics } = response.body;
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  test('returns article object when passed id', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toHaveProperty('article_id', expect.any(Number));
        console.log('🚀 ~ returnrequest ~ response:', response.body);
      });
  });
});
describe('GET /api', () => {
  test('GET /api returns endpoints desctiption object', () => {
    request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        const endpoindsJSON = JSON.stringify(response.body.endpoints);
        expect(response.body.endpoints).toStrictEqual(expectedEndpoints);
      });
  });
});
