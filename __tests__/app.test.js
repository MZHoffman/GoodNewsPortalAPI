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
describe('GET /api/articles', () => {
  test('returned array is not empty', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).not.toBe(0);
      });
  });
  test('return an array of article objects', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comments_count: expect.any(Number),
            })
          );
        });
      });
  });
  test('returns array sorted by created_at DESC', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy('created_at', { descending: true });
      });
  });
  test('returns objects dont have body property', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) =>
          expect(article).not.toHaveProperty('body')
        );
      });
  });
});
