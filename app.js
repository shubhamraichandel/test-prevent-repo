const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const middlewares = require('./middlewares');
const { Octokit} = require("@octokit/rest");



const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors("*"));
app.use(middlewares.setHeaders);

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });
  
getuser();

  
  
  async function getuser(){
    const data = await octokit.rest.repos.listWebhookDeliveries
      console.log(data);
  }


// Error Handling

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
    });
  });

module.exports = app;