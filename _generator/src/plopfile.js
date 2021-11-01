module.exports = function (plop) {
  // GENERATORS
  let modelGenerator = require("./Back-End/Model/index.js");
  plop.setGenerator("model", modelGenerator);

  // HELPERS
  plop.setHelper("capital", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  plop.setHelper("firstLower", function (text) {
    return text.charAt(0).toLowerCase() + text.slice(1);
  });

  // CUSTOM ACTIONS
  plop.setActionType("prettify", (_, config) => {
    const shell = require("shelljs");
    const data = config.data;

    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return "";
  });

  plop.setActionType("signalSuccess", (_, config) => {
    const chalk = require("chalk");
    const data = config.data.callToAction;

    console.log(chalk.cyanBright(" -------------------------- "));
    console.log(chalk.green("✅ Operation completed!"));
    console.log(chalk.yellow(data));
    return "";
  });
};
