# Serene

## Setup

Install Brew, Docker, docker-compose, node:
- https://docs.docker.com/docker-for-mac/
- https://nodejs.org/en/download/
- http://brew.sh/

```
git clone https://github.com/brad-larson/serene
cd serene
npm install
brew install postgresql
docker-compose up postgres
node bin/db/setup
```

## Running

```
npm start
```

Now visit http://localhost:3000 in your browser to test it out.

## Connect to local Postgres DB

```
psql -U postgres -p 5432 -h 0.0.0.0
```

Basic guide adapted from: http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/#.WGUiObaLSEI
