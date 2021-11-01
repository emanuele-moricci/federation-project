const path = require("path");
const { firstLower, capital } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add an empty Model",
  prompts: [
    {
      type: "input",
      name: "ModelName",
      message: "What should your model be called?",
      default: "Table",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "ModelDescription",
      message: "Write a small description",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const capitalizedModelName = capital(data.ModelName);
    const firstLowerModelName = firstLower(data.ModelName);

    const componentPath = `${path.join(cwd, "/src/graphql/schema/Models")}`;
    const servicePath = `${path.join(cwd, "/src/services")}`;
    const prismaPath = `${path.join(cwd, "/prisma")}`;
    const modelPath = `${componentPath}/${capitalizedModelName}`;

    /**
     * Adds the main Model Class, under 'graphql/schema/Models/<MODEL_NAME>.graphql' and 'graphql/schema/Models/<MODEL_NAME>.resolver.ts'
     * Also adds the Model Service, under 'services/<MODEL_NAME>service.ts'
     * Also adds the Prisma Model, under 'prisma/schema.prisma' and migrates it automatically
     *
     */
    const actions = [
      {
        type: "add",
        path: `${modelPath}/${capitalizedModelName}.graphql`,
        templateFile: `${__dirname}/Model.graphql.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${modelPath}/${capitalizedModelName}.resolver.ts`,
        templateFile: `${__dirname}/Model.resolver.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${servicePath}/${firstLowerModelName}Service.ts`,
        templateFile: `${__dirname}/Model.service.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${prismaPath}/schema.prisma`,
        pattern: /\/\/.*\[ADD NEW PRISMA TYPES ABOVE\].*/gi,
        transform: (str) => str,
        templateFile: `${__dirname}/Model.prisma.hbs`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${componentPath}/${capitalizedModelName}/**` },
    });

    actions.push({
      type: "execCommand",
      data: { command: "npx prisma generate" },
    });

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction:
          "Don't forget to update the Model to the prisma configuration file and migrate!",
      },
    });

    return actions;
  },
};
