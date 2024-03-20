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

## Installation (with Docker) :rocket:

1. Change the name of `api/.env.sample` file to `api/.env`, and `client/.env.sample` to `client/.env`. (The client .env file is only needed for production, as the local version uses the environment variables from `docker-compose.yml`).

2. Ensure Docker is installed, and run Docker Compose from the top level directory of the repo:

- Development: run `docker-compose up -d --build`
- Development (optional): run `npm install` on the host machine to install dependencies for Typescript definitions
