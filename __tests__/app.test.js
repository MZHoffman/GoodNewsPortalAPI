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
describe('GET /api', () => {
  test('GET /api returns endpoints desctiption object', () => {
    const expectedEndpoints = {
      'GET /api': {
        description:
          'serves up a json representation of all the available endpoints of the api',
      },
      'GET /api/topics': {
        description: 'serves an array of all topics',
        queries: [],
        exampleResponse: {
          topics: [{ slug: 'football', description: 'Footie!' }],
        },
      },
      'GET /api/articles': {
        description: 'serves an array of all articles',
        queries: ['author', 'topic', 'sort_by', 'order'],
        exampleResponse: {
          articles: [
            {
              title: 'Seafood substitutions are increasing',
              topic: 'cooking',
              author: 'weegembump',
              body: 'Text from the article..',
              created_at: '2018-05-30T15:59:13.341Z',
              votes: 0,
              comment_count: 6,
            },
          ],
        },
      },
    };
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ endpoints: expectedEndpoints });
      });
  });
});
