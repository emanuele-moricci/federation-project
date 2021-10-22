const path = require("path");
const chalk = require("chalk");

module.exports = {
  description: "Add an empty Model",
  prompts: [
    {
      type: "input",
      name: "ModelName",
      message: "What should it be called?",
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
      message: "What is it?",
    },
    {
      type: "confirm",
      name: "wantQuery",
      default: true,
      message: 'Do you want to add the "get" query?',
    },
    {
      type: "confirm",
      name: "wantMutation",
      default: true,
      message: 'Do you want to add the "create" mutation?',
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const componentPath = `${path.join(cwd, "/src/graphql/schema/Models")}`;
    const capitalizedModelName =
      data.ModelName.charAt(0).toUpperCase() + data.ModelName.slice(1);
    const modelPath = `${componentPath}/${capitalizedModelName}`;

    // Adds the main Model Class, under 'graphql/schema/Models/<MODEL_NAME>.ts'
    const actions = [
      {
        type: "add",
        path: `${modelPath}/${capitalizedModelName}.ts`,
        templateFile: `${__dirname}/Model.ts.hbs`,
        abortOnFail: true,
      },
    ];

    // Adds the 'get' Query Class, under 'graphql/schema/Models/<MODEL_NAME>/query/getAll<MODEL_NAME>s.ts'
    if (data.wantQuery) {
      actions.push({
        type: "add",
        path: `${modelPath}/queries/GetAll${capitalizedModelName}s.ts`,
        templateFile: `${__dirname}/queries/Model.query.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${componentPath}/../query.ts`,
        pattern: new RegExp(/.*\/\/.*\[ADD NEW QUERY IMPORTS ABOVE\].+\n/),
        templateFile: `${__dirname}/queries/Model.query.add.import.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${componentPath}/../query.ts`,
        pattern: new RegExp(/.*\/\/.*\[ADD NEW QUERY TYPES ABOVE\].+\n/),
        templateFile: `${__dirname}/queries/Model.query.add.type.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${componentPath}/../query.ts`,
        pattern: new RegExp(
          /.*\/\/.*\[ADD NEW QUERY RESOLVERS ABOVE\].+\n/
        ),
        templateFile: `${__dirname}/queries/Model.query.add.resolver.hbs`,
        abortOnFail: true,
      });
    }

    // Adds the 'create' Mutation Class, under 'graphql/schema/Models/<MODEL_NAME>/query/create<MODEL_NAME>.ts'
    if (data.wantMutation) {
      actions.push(
        {
          type: "add",
          path: `${modelPath}/mutations/Create${capitalizedModelName}.ts`,
          templateFile: `${__dirname}/mutations/Model.mutation.ts.hbs`,
          abortOnFail: true,
        },
        {
          type: "modify",
          path: `${componentPath}/../mutation.ts`,
          pattern: new RegExp(/.*\/\/.*\[ADD NEW MUTATION IMPORTS ABOVE\].+\n/),
          templateFile: `${__dirname}/mutations/Model.mutation.add.import.hbs`,
          abortOnFail: true,
        },
        {
          type: "modify",
          path: `${componentPath}/../mutation.ts`,
          pattern: new RegExp(/.*\/\/.*\[ADD NEW MUTATION TYPES ABOVE\].+\n/),
          templateFile: `${__dirname}/mutations/Model.mutation.add.type.hbs`,
          abortOnFail: true,
        },
        {
          type: "modify",
          path: `${componentPath}/../mutation.ts`,
          pattern: new RegExp(
            /.*\/\/.*\[ADD NEW MUTATION RESOLVERS ABOVE\].+\n/
          ),
          templateFile: `${__dirname}/mutations/Model.mutation.add.resolver.hbs`,
          abortOnFail: true,
        }
      );
    }

    actions.push({
      type: "prettify",
      data: { path: `${componentPath}/${capitalizedModelName}/**` },
    });

    actions.push({
      type: "signalSuccess",
      data: { callToAction: "Don't forget to add the Model to the prisma configuration file and migrate!" },
    });

    return actions;
  },
};
