import toobusy from 'toobusy-js';

const secureApp = app => {
  app.use(function (_, res, next) {
    if (toobusy()) {
      res.status(503).send("🚫 I'm busy right now, sorry.");
    } else {
      next();
    }
  });
};

// Return the App, Server and Gateway
export default secureApp;
