module.exports = function (plop) {
  // GENERATORS
  let modelGenerator = require("./Back-End/Model/Model.js");
  plop.setGenerator("model", modelGenerator);

  // CUSTOM ACTIONS
  plop.setActionType("prettify", (_, config) => {
    const shell = require("shelljs");
    const data = config.data;

    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return "";
  });

  plop.setActionType("signalSuccess", (_, config) => {
    console.log(config);
    const chalk = require("chalk");
    const data = config.data.callToAction;

    console.log(chalk.cyanBright(" -------------------------- "));
    console.log(chalk.green("✅ Operation completed!"));
    console.log(chalk.yellow(data));
    return "";
  });
};
