const path = require("path");
const { firstLower, capital } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add a new Micro-Service",
  prompts: [
    {
      type: "input",
      name: "ServiceName",
      message: "What should your service be called?",
      default: "federation-test",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "ServicePort",
      message: "On which port will it be served?",
      default: "4200",
      validate: (value) => {
        if (/^\d+$/.test(value)) {
          return true;
        }

        return "The port is required and has to be a number";
      },
    },
    {
      type: "input",
      name: "ServiceDescription",
      message: "Write a small description",
      default:
        "GQL microservice project structure with prisma, codegen, apolloserver and typescript",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const serviceName = (
      data.ServiceName.startsWith("federation-")
        ? data.ServiceName
        : `federation-${data.ServiceName}`
    ).toLowerCase();

    const rootPath = `${path.join(cwd, "/services")}`;
    const servicePath = `${rootPath}/${serviceName}`;

    const actions = [
      // Adds the Prisma schema
      {
        type: "add",
        path: `${servicePath}/prisma/schema.prisma`,
        templateFile: `${__dirname}/prisma/Service.schema.prisma.hbs`,
        abortOnFail: true,
      },
      // Adds the Prisma DB Seeder
      {
        type: "add",
        path: `${servicePath}/prisma/db/seeder.ts`,
        templateFile: `${__dirname}/prisma/Service.seeder.ts.hbs`,
        abortOnFail: true,
      },
      // Adds a default Typescript configuration file
      {
        type: "add",
        path: `${servicePath}/tsconfig.json`,
        templateFile: `${__dirname}/main/Service.tsconfig.json.hbs`,
        abortOnFail: true,
      },
      // Adds a default Package configuration file
      {
        type: "add",
        path: `${servicePath}/package.json`,
        templateFile: `${__dirname}/main/Service.package.json.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${servicePath}/**` },
    });

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction:
          "Your micro-service was created! Remember to create the .env files, generate the yarn packages/prisma context/db migration+seeding and publish the new apollo federation config.",
      },
    });

    return actions;
  },
};
