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
  test('returns objects doesnt have body property', () => {
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

describe('GET /api/articles/:article_id', () => {
  test('returns article object when passed id', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toHaveProperty('article_id', 1);
        expect(article).toHaveProperty(
          'title',
          'Living in the shadow of a great man'
        );
        expect(article).toHaveProperty('topic', 'mitch');
        expect(article).toHaveProperty('author', 'butter_bridge');
        expect(article).toHaveProperty(
          'body',
          'I find this existence challenging'
        );
        expect(article).toHaveProperty(
          'created_at',
          '2020-07-09T20:11:00.000Z'
        );
        expect(article).toHaveProperty('votes', 100);
        expect(article).toHaveProperty(
          'article_img_url',
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
        );
      });
  });
  test('returns an error if article id has not been found', () => {
    return request(app)
      .get('/api/articles/9999999')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns an error if article id is not an integer', () => {
    return request(app)
      .get('/api/articles/BOOM')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('GET /api', () => {
  test('GET /api returns endpoints desctiption object', () => {
    request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toStrictEqual(expectedEndpoints);
      });
  });
});
