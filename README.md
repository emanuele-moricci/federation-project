# Welcome to the Federation Project!

This project was created to study the GraphQL/React ecosystem + several other important web dev technologies. Here's the handy list:

### Back-End

- GraphQl
- Apollo Server
- Prisma ORM
- PostgresQL
- Node.js

### Front-End

- ReactJS
- NextJS
- Apollo Client
- Redux

---

## How to initialize

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>;`

### Back-End

- Install every dependency in every federation project using `yarn`
- Go to the .env file and add the DB connection string to the `DATABASE_URL` key
- Create the **"init"** migration running this command on the project root `yarn generate:migration`
- Seed the database using the command `yarn generate:seed`

### Front-End

- WIP

---

## How to START

### Back-End

- Fire up the command `yarn prisma:studio` to get the Prisma GUI
- Start the project with `yarn dev`
- Check your [Apollo Studio Web Environment](<[https://link](https://studio.apollographql.com/sandbox/explorer)>)

### Front-End

- WIP

---

## How to generate

This project comes with a handy micro-generator tool under `utils/federation-generator`. This tool helps generate some redundant and repetitive code to easy the DevX.

The following steps are needed to install the utility:

- open the terminal and go to `cd utils/federation-generator`
- Install [Plop](https://plopjs.com/) using `yarn global add plop`
- Install the tool using `npm -i g`

After succesfully installing the utility, go to the **root** of your federation micro-service and fire up the command `federation-generator` and follow the GUI to choose your code generator of choice.

These are the currently available generators

| Backend Gen. |           Description            |
| ------------ | :------------------------------: |
| Model        | Adds a Prisma model w/ resolvers |
