# gh-retrieve

Nodejs module to download/retrieve a specific directory or sub-directory from a public GitHub repository

Any contribution is appreciated and please do report bugs if you find any.

## Installation

```js
npm install gh-retrieve
```

## Demo:

```js
const GithubDownloadDir = require("gh-retrieve");

GithubDownloadDir({
  author: "DarthCucumber", //repository owner
  repo: "gofuzz", //repository name
  dir: "pkg", //target directory to download
  outdir: "test", //directory to download in
})
  .then(() => {
    console.log("download complete...");
  })
  .catch((err) => {
    console.log(err);
  });
```

and boom! you have the files downloaded.

to download any sub directory, just enter the path like so:

```js
const GithubDownloadDir = require("gh-retrieve");

GithubDownloadDir({
  author: "DarthCucumber",
  repo: "gofuzz",
  dir: "pkg/data",
  outdir: "test",
})
  .then(() => {
    console.log("download complete...");
  })
  .catch((err) => {
    console.log(err);
  });
```

how to use with [ora](https://www.npmjs.com/package/ora)  with **gh-retrieve**?

```js
const GithubDownloadDir = require("gh-retrieve");
const ora=require("ora");

const spinner=ora("downloading files...").start();

GithubDownloadDir({
  author: "DarthCucumber", //repository owner
  repo: "gofuzz", //repository name
  dir: "pkg", //target directory to download
  outdir: "test", //directory to download in
})
  .then(() => {
    spinner.succeed("download complete...");
  })
  .catch((err) => {
    spinner.fail(err.message);
  });
```

### API

### GithubDownloadDir(options)

takes options object as argument.

**option** consists of following properties:

```js
{
  author: string, //required
  repo: string, //required
  dir: string, //required
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
