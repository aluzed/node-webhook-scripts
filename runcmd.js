const { exec } = require('child_process');

module.exports = function(command, cwd) {
  return new Promise((resolve, reject) => {
    return exec(command, { cwd }, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      } 

      if(stderr) {
        return reject(new Error(stderr));
      }

      return resolve(stdout);
    })
  });
}