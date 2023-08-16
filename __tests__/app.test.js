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
  test('GET /api/topics returns list of topics length of 3', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
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
  test('returns array lamgth of 13', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(13);
      });
  });
  test('return an array of article objects', () => {
    return request(app)
      .get('/api/articles')
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeInstanceOf(Array);
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

describe('GET /api/articles/:article_id/comments', () => {
  test('returns array of 11 comments for  article_id 1', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(11);
      });
  });
  test('returns array of 0 comments for  article_id 2', () => {
    return request(app)
      .get('/api/articles/2/comments')
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(0);
      });
  });
  test('each comment object has required keys', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .then((response) => {
        const { comments } = response.body;
        comments.forEach((comment) =>
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              article_id: expect.any(Number),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          )
        );
      });
  });
  test('comments should be sorted by the most recent one', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toBeSortedBy('created_at', {
          descending: true,
        });
      });
  });
  test('returns an error if article id has not been found', () => {
    return request(app)
      .get('/api/articles/99999999/comments')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns an error if article id is not an int', () => {
    return request(app)
      .get('/api/articles/BOOM/comments')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});

describe('POST /api/articles/:article_id/comments', () => {
  test('returns a comment object with required keys and right values', () => {
    const body = {
      body: 'test',
      username: 'butter_bridge',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(200)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toEqual({
          comment_id: 19,
          body: 'test',
          article_id: 1,
          author: 'butter_bridge',
          votes: 0,
          created_at: new Date(new Date().setMilliseconds(0)).toISOString(),
        });
      });
  });
  test('returns a an error if article_id doesnt exists', () => {
    const body = {
      body: 'testComment',
      username: 'butter_bridge',
    };
    return request(app)
      .post('/api/articles/99999999/comments')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns a an error if author doesnt exists', () => {
    const body = {
      body: 'testComment',
      username: 'Smooth_Operator',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns a an error if author hasnt been passed', () => {
    const body = {
      body: 'testComment',
      // username: 'Smooth_Operator',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns a an error if body hasnt been passed', () => {
    const body = {
      // body: 'testComment',
      username: 'Smooth_Operator',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
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
