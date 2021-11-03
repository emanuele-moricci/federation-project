import express from 'express';
import hpp from 'hpp';
import toobusy from 'toobusy-js';

const secureApp = app => {
  app.use(express.urlencoded({ extended: false }));
  app.use(hpp());

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
