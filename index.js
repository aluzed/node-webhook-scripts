const express = require('express');
const app = express();
const runCmd = require('./runcmd');
const cfg = require('./config');
const hooks = require('./hooks.json');

const verbose = process.env.VERBOSE ? true : false;

// For each path in hooks.json attach to our router
hooks.forEach(hook => {
  app[hook.method.toLowerCase() || "get"](hook.path, function (req, res, next) {
    if(cfg.token && req.headers.token !== cfg.token) {
      return res.status(403).send('Forbidden');
    }
    return next();
  },function(req, res) {
    if(verbose) {
      console.log(`webhook ${hook.method.toUpperCase()} ON ${hook.path}`);
    }

    runCmd(hook.command, hook.cwd)
      .then(stdout => {
        return res.send('DONE : ' + stdout + "\n");
      })
      .catch(err => {
        return res.status(500).send('ERROR : ' + err.message + "\n");
      })
  });
})

app
.post('/*', function(req, res) {
  return res.status(404).send('Not found');
})
.get('/*', function(req, res) {
  return res.status(404).send('Not found');
})
.put('/*', function(req, res) {
  return res.status(404).send('Not found');
})
.delete('/*', function(req, res) {
  return res.status(404).send('Not found');
})

app.listen(cfg.port, function() {
  console.log(`listening on ${cfg.port}`);
})