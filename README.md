# gh-retrieve

Nodejs module to download/retrieve a specific directory or sub-directory from a public GitHub repository

**NOTE:** since it uses github API, making more than 60 request may give 403,433 or 404 error so simply wait for an hour.

Any contribution is appreciated.
please do report bugs if you find any over here: [issues](https://github.com/DarthCucumber/gh-retrieve/issues)

- **v1.1.2**: minor bug fix

- **v1.1.1**:

  - **Breaking changes**

  now users have the choices to select the type of download.

  - **recursiveDownload(options)**: doesn't require github to the installed in the users device and also is limited by github api limits i.e 60 requests/hour a repo.

  - **sparseDownload(options)**: requires git to be installed and it maintains the git workflow of the target repository but downloading only the target directory.

  choice is yours ;)

- **v1.0.2**: previous fix lead to bug, not downloading file contents. Fixed now

- **v1.0.1**: fixed minor directory bug

## Installation

```js
npm install gh-retrieve
```

## Demo:

### Using recursiveDownload()

```js
const { recusiveDownload } = require("gh-retrieve");

recursiveDownload({
  author: "DarthCucumber", //repository owner
  repo: "gofuzz", //repository name
  targetdir: "pkg", //target directory to download
  outdir: "test", //directory to download in
}).catch((err) => {
  console.log(err.stack);
});
```

and boom! you have the files downloaded.

### using sparseDownload()

```js
const { sparseDownload } = require("gh-retrieve");

sparseDownload({
  //can use https clone url as well if ssh is not set up
  cloneurl: "git@github.com:DarthCucumber/gofuzz.git",
  targetdir: "pkg",
  outdir: "../test",
  branch: "master",
}).catch((err) => {
  console.log(err.stack);
});
```

to download any sub directory, just enter the path like so (works for both **recursiveDownload** and **sparseDownload**):

```js
const { sparseDownload } = require("gh-retrieve");

sparseDownload({
  //can use http clone url as well instead of SSH
  cloneurl: "git@github.com:DarthCucumber/gofuzz.git",
  targetdir: "pkg/data",
  outdir: "../test",
  branch: "master",
}).catch((err) => {
  console.log(err.stack);
});
```

how to use with [ora](https://www.npmjs.com/package/ora) with **gh-retrieve**?

```js
const { recusiveDownload } = require("gh-retrieve");
const ora = require("ora");

const spinner = ora("downloading files...").start();

recursiveDownload({
  author: "DarthCucumber", //repository owner
  repo: "gofuzz", //repository name
  targetdir: "pkg", //target directory to download
  outdir: "test", //directory to download in
})
  .then(() => {
    spinner.succeed("download complete.");
  })
  .catch((err) => {
    spinner.fail(err.message);
    console.log(err.stack);
  });
```

### API

### recusiveDownload(options)

**NOTE:** options argument for both *recusiveDownload* and *sparseDownload* are different.

takes options object as argument.

**option** consists of following properties:

```js
{
  author: string, //required
  repo: string, //required
  targetdir: string, //required
  branch: string, //optional
  outdir: string //optional
}
```

Using this module's repo as example. `https://github.com/DarthCucumber/gh-retrieve`

- **author** takes username of the repository owner _(required)_

example: **DarthCucumber** is **author** in the example url

- **repo** takes the repository name from where you want to download a specific directory _(required)_

example: **gh-retrieve** is **repo**

- **dir** takes in target directory you want to download. _(required)_

- **branch** takes in branch of the repo _(optional)_

- **outdir** takes in output directory path where your files will get downloaded. (default: current directory) _(optional)_

### sparseDownload(options)

takes options object as argument.

**option** consists of following properties:

```js
{
  cloneurl: string,
  targetdir: string,
  outdir: string,
  branch: string,
}
```

**All options are required**

**cloneurl** is the url used for cloning a repo. Ex: https://github.com/DarthCucumber/gh-retrieve.git

**targetdir** is the directory name you want to download

**outdir** is the directory where you want to download the target directory in your workspace.

*NOTE:* make sure you don't set **outdir** as an existing git repo.

**branch:** takes the repository branch.
