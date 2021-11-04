# Welcome to the Federation Project!

This project was created to study the GraphQL/React ecosystem + several other important web dev technologies. Here's the handy list:

### Back-End

- GraphQL
- Apollo Federation 1 (V2 in progress)
- Prisma ORM
- PostgresQL
- Node.js with Express

### Front-End

- ReactJS
- NextJS
- Apollo Client
- Redux

### Generator

- Plop (Inquirer)
- Handlebars
- Exec API

---

## How to INITIALIZE

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>;`

### Back-End (do this for every federation service under **services/**)

- Install every dependency in every federation project using `yarn`
- Go to the .env file and add the DB connection string to the `DATABASE_URL` key
- Fire the command `npx prisma generate` to generate the Prisma client
- Create the **"init"** migration running this command on the project root `yarn generate:migration`
- Seed the database using the command `yarn generate:seed`

### Gateway

- Go to the root of the back-end side in the command line
- Follow the guide to register and run your gateway with all of the services through [Apollo Studio](<[https://link](https://www.apollographql.com/docs/federation/quickstart/)>); Register the API key, the subgraphs through the rover module and create your project in Apollo Studio
- This is an example command to register a new subgraph

```console
rover subgraph publish the-federation@current \
  --name federation-auth --schema services/federation-auth/src/graphql/generated/schema.graphql \
  --routing-url http://localhost:4001/graphql
```

- In the gateway `package.json` there are several commands powered by bash files that can help you with the setup. Fire up the `yarn federation:dev` command and the `yarn federation:publish` command on another terminal to start and update the entire supergraph on Apollo Studio

### Front-End

- WIP

---

## How to START

### Back-End

- Fire up the command `yarn prisma:studio` to get the Prisma GUI OR use your **DBMS** of choice
- Go to the root of the project and start the dockerized ecosystem with `yarn docker:up`
- [OPTIONAL] update the supergraph by running `yarn federation:publish`
- Check your [Apollo Studio Web Environment](<[https://link](https://studio.apollographql.com/)>)

### Front-End

- WIP

---

## How to GENERATE

This project comes with a handy micro-generator tool under `/_generator`. This tool helps generate some redundant and repetitive code to easy the DevX.

The following steps are needed to install the utility:

- open the terminal and go to `cd _generator`
- Install [Plop](https://plopjs.com/) using `yarn global add plop`
- Install the tool using `npm i -g`

After succesfully installing the utility, go to the **root** of your federation micro-service and fire up the command `federation-generator` and follow the GUI to choose your code generator of choice.

These are the currently available generators

| Backend Gen. |           Description            |
| ------------ | :------------------------------: |
| Model        | Adds a Prisma model w/ resolvers |
| Mutation     | Adds a Prisma query w/ resolver  |
| Query        |  Adds a Prisma mutation w/ res.  |
| Service      |  Adds a new configured service   |

---

## How to RE-USE CODE

This project has a local package called `federation-utils`, under `_utilities`. Shared code can be added there, and a new tarball can be created and updated on every project with the following procedure:

- Edit your **utils** code
- Updated the `package.json` version
- Fire up the command `yarn publish:local`
- [OPTIONAL] if the config doesn't have it yet, add the package with `yarn add ../../bin/federation-utils/federation-utils.tgz`
- In the gateway and every service, fire up the command `yarn install`

---

## How to TEST

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>_test;`

### Back-End

- Go into the `env.test` and `env.docker.test` file and change the `DATABASE_URL` connection string
- Create your test under the micro-service folder `__tests__/(integration or unit)` with the pattern `*.test.ts or *.unit.test.ts`
- Go to the root of the project and fire the testing command: `yarn federation:test` or `yarn federation:test:docker`
