const { recursiveDownload } = require("../gh-retrieve.js");
const ora = require("ora");

console.log("test 2: recursive download\n")

const spinner = ora("downloading files...").start();

recursiveDownload({
	author: "DarthCucumber", //repository owner
	repo: "gofuzz", //repository name
	targetdir: "pkg", //target directory to download
	outdir: "../testdownload", //directory to download in
}).then(() => {
	spinner.succeed("download complete...");
}).catch((err) => {
	spinner.fail(err.message);
	console.log(err.stack);
});