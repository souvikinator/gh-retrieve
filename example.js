const GithubDownloadDir = require("./gh-retrieve.js");
const ora = require("ora");

const spinner = ora("downloading files...").start();

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