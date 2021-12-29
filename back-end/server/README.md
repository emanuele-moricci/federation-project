<div align="center">
  <h1>Welcome to the Back-End part of the Federation Project!</h1>
  <h3>
    This "Micro-Services Oriented" app was made using the <a href="https://github.com/emanuele-moricci/galactagraph-boilerplate">GalactaGraph Boilerplate</a>. Use those Docs for a full-overview of how everything works.
  </h3>

<br />

![Apollo Badge](https://img.shields.io/badge/-Apollo-%23311C87?logo=apollo-graphql&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-GraphQL-%23E10098?logo=graphql&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Node.js-%23339933?logo=node.js&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Typescript-%233178C6?logo=typescript&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Jest-%23C21325?logo=jest&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Docker-%232496ED?logo=docker&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Prisma-%232D3748?logo=prisma&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Postgres-%234169E1?logo=postgresql&logoColor=white&style=flat-square)

<br />

</div>

## How to INITIALIZE

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>;`

### Back-End (do this for every federation service under **services/**)

- Install every dependency in every federation project using `yarn` (sometimes you may need to manually add the rover module with `yarn add @apollo/rover`)
- Create the .env, .env.test and .env.docker.test files using the .env.example file and add the DB connection string to the `DATABASE_URL` key

### Gateway

- Go to the root of the back-end side in the command line
- Follow the guide to register and run your gateway with all of the services through [Apollo Studio](<[https://link](https://www.apollographql.com/docs/federation/quickstart/)>); Register the API key, the subgraphs through the rover module and create your project in Apollo Studio
- This is an example command to register a new subgraph

```console
rover subgraph publish the-federation@current \
  --name federation-auth --schema services/federation-auth/src/graphql/generated/schema.graphql \
  --routing-url http://localhost:4001/graphql
```

- **IMPORTANT** > Go to every service under `/services`, fire up the command `yarn dev`, then open up another terminal and fire up the command `yarn apollo:update`.
- In the gateway `package.json` there are several commands powered by bash files that can help you with the setup. Fire up the `yarn federation:dev` command and the `yarn federation:publish` command on another terminal to start and update the entire supergraph on Apollo Studio

---

## How to GENERATE

---

This project comes with a handy micro-generator tool under `/GG_generator`. This tool helps generate some redundant and repetitive code to improve your DevX and shorten the development time.

The following steps are needed to install the utility:

- open the terminal and go to `cd GG_generator`
- Install [Plop](https://plopjs.com/) using `yarn global add plop`
- Install the tool using `npm i -g`

After succesfully installing the utility, go to the **root** of your federation micro-service or gateway and fire up the command `galactagraph-generator`. Follow the GUI to choose your code generator of choice.

These are the currently available generators

| Name      |               Description               | Root          |
| --------- | :-------------------------------------: | ------------- |
| Model     |    Adds a Prisma model w/ resolvers     | Micro-service |
| Extension | Links two model from different services | Gateway       |
| Mutation  |     Adds a Prisma query w/ resolver     | Micro-service |
| Query     |     Adds a Prisma mutation w/ res.      | Micro-service |
| Service   |      Adds a new configured service      | Gateway       |

## How to CREATE A SERVICE

- Go to the root of the project and fire up the command `federation-generator`
- Select the `service` generator and follow the GUI to create a new service
- Follow the ### INITIALISE => Database && Back-End ### sections to set-up the service
- Fire up the `federation-generator` and create a `model`
- Go to the gateway root and fire up the command `yarn federation:dev`
- open another terminal and fire up the command `yarn federation:publish` (could fail, re-run it if it does)

---

## How to RE-USE CODE

This project has a local package called `federation-utils`, under `_utilities`. Shared code can be added there, and a new tarball can be created and updated on every project with the following procedure:

- Edit your **utils** code
- Updated the `package.json` version
- Fire up the command `yarn publish:local`
- [OPTIONAL] if the config doesn't have it yet, add the package with `yarn add ../../bin/federation-utils/federation-utils.tgz`
- In the gateway and every service, fire up the command `yarn install`

---

## How to START WITHOUT DOCKER

- Fire up the command `yarn prisma:studio` to get the Prisma GUI OR use your **DBMS** of choice
- Go to the root of the project and start the federation ecosystem with `yarn federation:dev`

## How to START WITH DOCKER

- Fire up the command `yarn prisma:studio` to get the Prisma GUI OR use your **DBMS** of choice
- Go to the root of the project and start the dockerized ecosystem with `yarn docker:up` (for the docker version, check the `POSTGRESQL_DATABASES` url in your .env files and make sure that every database you need is correctly written there)

## OPTIONAL

- Update the supergraph by running `yarn federation:publish`
- Check your [Apollo Studio Web Environment](<[https://link](https://studio.apollographql.com/)>)

---

## How to TEST

- Go into the `env.test` file and change the `DATABASE_URL` connection string
- Create your test under the micro-service folder `__tests__/(integration or unit)` with the pattern `*.test.ts or *.unit.test.ts`
- Go to the root of the project and fire the testing command: `yarn federation:test`

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>_test;`
