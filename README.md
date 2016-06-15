# build-lint

This tool is currently in **BETA**

## Overview
This is a command line tool that performs linting.
It uses [eslint](https://www.npmjs.com/package/eslint) to perform linting and includes the
[eslint-config-iservices](https://www.npmjs.com/package/eslint-config-iservices) package which defines the linting rules to be applied.

## Guide

To install this tool execute the following npm console command from within your project.

```
npm install --save-dev build-lint
```

When the package is installed it will create a new `.eslintrc` file within the root of your project if one doesn't exist already.  This file is
required and can be modified to fine tune the linting rules that will be applied to your project.  See the
[eslint configuration](http://eslint.org/docs/user-guide/configuring) documentation for details about configuration options.

Once the package is installed you can run the tool from a terminal using the `build-lint` command.  Normally you will
do this within an npm script element.  Take the following excerpt from an example package.json file:

```JSON
{
  "scripts": {
    "lint": "build-lint \"src/**/*.js\" \"!src/tests/**/*.js\"",
    "lint-watch": "build-lint \"src/**/*.js\" \"!src/tests/**/*.js\" -w",
  }
}
```

In the example above the `lint` script will perform linting on files with an extension of `.js` within the `src` folder but not within the
`src/tests` folder.  The `lint-watch` script will perform linting on the same files whenever one of them is updated or added.

Also notice that the glob patterns are surrounded by double quotes.  This is necessary in order to prevent the terminal from expanding
the glob patterns into actual file paths.

## API

Usage:
```
build-lint <files> [<files>] [-w]
```
Options:

| Option | Description |
| ---    | ---         |
| `<files>` | A glob pattern that identifies files to lint.  Multiple glob patterns can be specified. |
| -w     | When present the files specified in the glob pattern(s) will be watched for changes and linted when they do change. |
| -W     | This is the same as the -w command except that the specified files will be linted before the watch begins. |


 