<div align="center">
<pre>
___________        .___                   __  .__                __________                   __     
\_   _____/___   __| _/________________ _/  |_|__| ____   ____   \______   \_______  ____    |__|    
 |    __)/ __ \ / __ |/ __ \_  __ \__  \\   __\  |/  _ \ /    \   |     ___/\_  __ \/  _ \   |  |    
 |     \\  ___// /_/ \  ___/|  | \// __ \|  | |  (  <_> )   |  \  |    |     |  | \(  <_> )  |  |    
 \___  / \___  >____ |\___  >__|  (____  /__| |__|\____/|___|  /  |____|     |__|   \____/\__|  | /\ 
     \/      \/     \/    \/           \/                    \/                          \______| \/
</pre>

# Welcome to the GalactaGraph Federation-project!

This project is designed to provide real-world examples on how to use [GalactaGraph](https://github.com/emanuele-moricci/galactagraph-boilerplate)!

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

##### Created by Emanuele Moricci with ❤️ and 🍕

</div>

<br />
<br />

> Looking for contributors, PRs and issues welcome! Come join the development! &nbsp; 🚀

## Index

---

<h3>

1. [What is the Federation Project](#what-is-the-federation-project)
2. [Quick start](#quick-start)
3. [How to Start](#how-to-start)
4. [How to Test](#how-to-test)
5. [How-To Guides](#how-to-guides)
6. [License](#license)

</h3>
<br />

## What is Federation Project?

---

The Federaiton-Project aims to provide a clear example on how to use the [GalactaGraph Boilerplate](https://github.com/emanuele-moricci/galactagraph-boilerplate)e to reduce the countless hours spent setting up and bootstrapping a NodeJS+GraphQL application with a Federated Schema.

It is designed to be used with the [Prisma](https://www.prisma.io) ORM and multiple Postgres databases, and offers typescript generation at runtime using [GraphQL Codegen](https://www.graphql-code-generator.com/).

<br />

## Quick Start

---

### Database

- Install PostgresQL
- Enter the environment with the command `psql`
- Create a database with the command `create database <DB_NAME>;`

### Back-End (do this for every service under **services/**)

- Install the dependencies using `yarn`
- Create the `.env`, `.env.test` and `.env.docker.test` files using the `.env.example` file and add the DB connection string to the `DATABASE_URL` key

### Gateway

- Go to the root of the `server/` in the command line
- Follow the guide to register and run your gateway with all of the services through [Apollo Studio](https://www.apollographql.com/docs/federation/quickstart/); Register the API key, the subgraphs through the rover module and create your project in Apollo Studio with the **Managed Mode**. When prompted to publish your federated schema, fill the data in the micro-service and gateway `.env` files and do one of the following steps:

  - **[ONLY FOR THE FIRST TIME]** Go to the `federation-auth` service, fire up the command `yarn dev`, then open up another terminal and fire up the command `yarn apollo:update`
  - **[FOR EVERY OTHER TIME]** In the gateway `package.json` there are several commands powered by bash files that can help you with the setup. Fire up the `yarn federation:dev` command and the `yarn federation:publish` command on another terminal to start and update the entire supergraph on Apollo Studio.

<br />

## How to START

---

### Without Docker

- Go to the root of the gateway and start the federation ecosystem with `yarn federation:dev`

### With Docker

- Go to the root of the project and start the dockerized ecosystem with `yarn docker:up` (for the docker version, check the `POSTGRESQL_DATABASES` url in your `.env` files and make sure that every database you need is correctly written there)

### Optional Steps

- update the supergraph by running `yarn federation:publish` on another terminal while the application is running
- Check your [Apollo Studio Web Environment](https://studio.apollographql.com/)
- Fire up the command `yarn prisma:studio` to get the Prisma GUI OR use your **DBMS** of choice

<br />

## How to TEST

---

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>_test;` (or use your personal naming convention)

### Back-End

- Go into the `env.test` and `env.docker.test` file and change the `DATABASE_URL` connection string. Add the database name to the `POSTGRESQL_DATABASES` key in the `.env.docker.test` file in the gateway
- Create your test under the micro-service folder `__tests__/(integration or unit)` with the pattern `*.test.ts or *.unit.test.ts`
- Go to the root of the project and fire the testing command: `yarn federation:test` or `yarn federation:docker:test`

<br />

## How-to GUIDES

<p style=margin-left:20px>
GalactaGraph can take care of a lot of code by itself, but it cannot be of much help if you don't know some stuff first, here are some guides to help you get started:

- [Apollo Federation](https://www.apollographql.com/docs/federation/quickstart/)
- [Express](https://expressjs.com/en/starter/installing.html)
- [GraphQL Codegen](https://www.graphql-code-generator.com/docs/getting-started/index)
- [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart)

</p>
<br />
<p style=margin-left:20px>
Aside from that, there can be moments where you need to bind two models from different subgraphs, with different relations, add new non-model mutations, create new GraphQL fields with resolvers ecc...
</p>
<p style=margin-left:20px>
For that you can find everything you need here, or in this README file:
</p>

- [README Guide](https://github.com/emanuele-moricci/galactagraph-boilerplate/blob/main/server/services/README.md)

<br />

## License

---

This project is licensed under the MIT license, Copyright (c) 2021 Emanuele Moricci. For more information see the `LICENSE` file.
