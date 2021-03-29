# gh-download-dir

Nodejs module to download a specific directory from a GitHub repository

## Demo:

```js
const GithubDownloadDir = require("gh-download-dir");

GithubDownloadDir({
  author: "DarthCucumber",
  repo: "gofuzz",
  dir: "pkg",
  outdir: "test",
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
const GithubDownloadDir = require("gh-download-dir");

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

Using this module's repo as example. `https://github.com/DarthCucumber/gh-download-dir`

- **author** takes username of the repository owner _(required)_

example: **DarthCucumber** is **author** in the example url

- **repo** takes the repository name from where you want to download a specific directory _(required)_

example: **gh-download-dir** is **repo**

- **dir** takes in target directory you want to download. _(required)_
- **branch** takes in branch of the repo _(optional)_
- **outdir** takes in output directory path where your files will get downloaded. (default: current directory) _(optional)_
