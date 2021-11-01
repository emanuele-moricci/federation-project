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
      name: "ServiceDescription",
      message: "Write a small description",
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
