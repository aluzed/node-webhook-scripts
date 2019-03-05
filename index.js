const express = require('express');
const app = express();
const runCmd = require('./runcmd');
const hooks = require('./hooks.json');

hooks.forEach(hook => {
  app.get(hook.path, function(req, res) {
    runCmd(hook.command, hook.cwd)
      .then(stdout => {
        return res.send('DONE : ' + stdout + "\n");
      })
      .catch(err => {
        return res.status(500).send(err.message);
      })
  });
})

app.get('/*', function(req, res) {
  return res.status(404).send('Not found');
})

app.listen('9550', function() {
  console.log('listening on 9550');
})