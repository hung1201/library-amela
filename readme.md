## Used tech :computer:

- Typescript
- Docker Compose
- Next JS and React front end
- React Context API and hooks
- Node with Express back end
- JWT authentication
- Sequelize database using PostgreSQL
- useQuery, Material UI

## Structure :triangular_ruler:

This project has two sections:

- Client side Next.js application built on a [custom Node server] for the server side rendered React application.
- Server side API built in Node and Express to handle requests from the Next.js application.

The Next app doesn't have an associated database, as all data is handled on the Node API.

## Prerequisite

1. Node v16

## Installation (with Docker) :rocket:

1. Change the name of `api/.env.sample` file to `api/.env`, and `client/.env.sample` to `client/.env`. (The client .env file is only needed for production, as the local version uses the environment variables from `docker-compose.yml`).

2. Ensure Docker is installed, and run Docker Compose from the top level directory of the repo:

- Development: run `docker-compose up -d --build`
- Development (optional): run `npm install` on the host machine to install dependencies for Typescript definitions

## Installation (manual, no Docker)

Clone the repository:

`git clone https://github.com/hung1201/library-amela.git`

Install dependencies for the front end:

`cd client && npm i`

Install dependencies for the back end:

`cd api && npm i`

### Setting up the database (manual, no Docker)

- Change the name of the `api/.env.sample` file to `api/.env`
- Update the `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `DB_HOST` variables to your own

If you'd rather not use Postgres, you could easily swap it out for MySQL, MSSQL or MariaDB:

- Just go to `api/db/config.ts` and update the `dialect` property from `postgres` to any database

### Database migrations and seeding (manual, no Docker)

To migrate all files:

`npm run migrate-db`

To seed all files:

`npm run seed-db`

#### Running locally for development (manual, no Docker)

To run the Next.js app locally:

`cd client && npm run dev`

Run the Node API locally:

`cd api && npm run dev`

#### Running in production (manual, no Docker)

To run the Next.js app in production:

`cd client && npm run start`

Run the Node API in production:

`cd api && npm run prod`
