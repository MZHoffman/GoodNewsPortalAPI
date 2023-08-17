# 📰🔌 News Site API 📊📚

Welcome to the News Site Backend Project! This API serves as the backbone for a news site, offering a range of endpoints to manage articles, comments, topics, and users. Whether you're retrieving information, adding comments, updating articles, or fetching user details, this API has got you covered! 🌐

##### 🌐 Hosted Version: [News Site API](https://news-site-backend-project.onrender.com)🌐

## 📋 Endpoints

- 📥 **GET /api**: Get an overview of all available API endpoints.
- 📥 **GET /api/topics**: Fetch an array of all topics for your perusal.
- 📥 **GET /api/articles**: Retrieve an array of articles, with optional filters and sorting.
- 📥 **GET /api/articles/:article_id**: Grab a specific article using its unique ID.
- 📥 **GET /api/articles/:article_id/comments**: Get a list of comments for a particular article.
- 📤 **POST /api/articles/:article_id/comments**: Post a new comment on a specific article.
- 📤 **PATCH /api/articles/:article_id**: Update details of an article.
- 🗑️ **DELETE /api/comments/:comment_id**: Remove a comment using its ID.
- 📥 **GET /api/users**: Fetch details of all users in the system.

## 🛠️ How to Use

### 🐑 Clone and Install 📦

1. Clone the repository: `git clone https://github.com/MZHoffman/northcoders-back-end.git`
2. Navigate to the project directory: `cd northcoders-back-end`
3. Install dependencies: `npm install`

### 🌱 Seed Local Database

1. Create a `.env.development` file with your database name: `PGDATABASE=your_database_name`
2. Populate the local database: `npm run seed`

### 🧪 Running Tests

1. Create a `.env.test` file with your **test** database name: `PGDATABASE=your_database_name`
2. Run tests: `npm test` or `npm test:watch` for watch mode.

### 📜 Known Requirements

- Node.js version: 20.3 or higher (maybe lower)
- PostgreSQL version: 13 or higher (maybe lower)

Explore, test, and enjoy the power of this News Site Backend API! 🚀🗞️
