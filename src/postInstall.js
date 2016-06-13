/**
 * Copy the .eslintrc file into the project if one doesn't exist already
 */

const path = require('path');
const fs = require('fs');

const eslintrcSource = path.join(__dirname, 'eslintrc.template');
const eslintrcTarget = path.join(process.cwd(), '.eslintrc');

fs.readFile(eslintrcSource, (errRead, data) => {
  if (!errRead) {
    fs.access(eslintrcTarget, errWrite => {
      if (errWrite) {
        fs.writeFile(eslintrcTarget, data, { flags: 'wx' });
      }
    });
  }
});
