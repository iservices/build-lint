# build-lint

## Overview
This is a node package that defines gulp tasks that can be used to perform linting.
It uses [eslint](https://www.npmjs.com/package/eslint) to perform linting and includes the [eslint-config-iservices](https://www.npmjs.com/package/eslint-config-iservices) package which defines the linting rules to be applied.

## Guide

To install this package execute the following npm console command from within your project.

```
npm install --save-dev build-lint
```

When the package installs it will include the definitions for the linting gulp tasks as well as the eslint and eslint-config-iservices packages as dependencies.

In order for eslint to work with the iservices standardized rules the eslint-config-iservices package needs to be installed at the root level within the node_modules folder of your project.
If you are using npm version 3 or greater this should happen automatically.  Older versions of npm will install the eslint-config-iservices package within the build-lint folder so you will 
need to execute the `npm dedupe` console command from within your project after installing the build-lint package.  This will remove duplicate dependencies and flatten out the dependency structure of your installed packages.

Before you start using the linting tasks you will need to add an `.eslintrc` file to the root folder of your project.  The contents of this file should look like the following.

```
{
  "extends": "iservices",
  "rules": {
  }
}
```

This file tells eslint to use the rules defined in the eslint-config-iservices package when linting your project.
It also has a rules section where you can override the standardized iservices rules with any custom rules that are appropriate for your project if needed.
See the [eslint](http://eslint.org/) site for documentation on how to define rules.

Once you have setup the .eslintrc file you will need to create a `gulpfile.js` file within the root folder of your project if you don't have one already.
Within this file you will register the gulp tasks that are defined within this package using the `registerTasks` function.
The following is an example of this.

```
'use strict';

const lint = require('build-lint');

lint.registerTasks({
  glob: 'src/**/*.js'
});
```

Once you have registered the lint tasks in the gulpfile.js file you can run the linting tasks using gulp.  To run the lint task you simply need to execute the following console command from within your project.

```
gulp lint
```

In addition to executing tasks from the command line you can also chain the gulp linting tasks together with other gulp tasks to utilize the linting functionality however it's needed.  

Normally you will only want to use these tasks as part of a check-in process or build server step where command line output is preferable.
A better option for developers who want to see linting results inline with the code they are writing is to use their IDE instead of the gulp tasks.  Most major IDEs 
support eslint either directly or through a plugin.  Check with your IDE documentation to see if it supports eslint or check the eslint [integration](http://eslint.org/docs/user-guide/integrations) site for a partial list of IDEs that have support.

## API

### build-lint.registerTasks(options)

The registerTasks function will register 2 taks with gulp which are named as follows:

- 'lint' - This task will perform linting using eslint and output any warning or errors to the console.
- 'watch-lint' - This is a long running task that will listen for any changes to files.  When a file is change that file will then be linted and any errors or warnings will be output to the console.  If there are any errors or warnings a pop-up will also be presented to the user that notifies them of linting issues. 

#### options

Type: `Object`

This parameter is an object that holds the various options to use when registering the tasks.

#### options.glob

Type: `String` or `Array`

A glob or array of globs that identify the files in your project that will be linted.  Use [node-glob syntax](https://github.com/isaacs/node-glob) when specifying patterns.

#### options.tasksPrefix

Type: `String`

This is an optional parameter that when set will add a prefix to the names of the tasks that get registered.  For example, if tasksPrefix is set to 'hello' then the task that 
would have been registered with the name 'lint' will be registered with the name 'hello-lint' instead.
 