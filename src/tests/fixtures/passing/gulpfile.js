const lint = require('../../../index');

lint.registerTasks({
  glob: __dirname + '/chat/**/*.js',
  tasksPrefix: 'passing'
});
