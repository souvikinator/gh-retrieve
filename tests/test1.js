const { sparseDownload } = require("../gh-retrieve.js");
const ora = require("ora");

console.log("test 1: sparse download\n")

const spinner = ora("downloading files...").start();

sparseDownload({
	cloneurl: "https://github.com/DarthCucumber/gofuzz.git",
	targetdir: "pkg/utils",
	outdir: "../testdownload",
	branch: "master"
}).then(data => {
	spinner.succeed("done");
	console.log(data);
}).catch(err => {
	spinner.fail(err.message);
	console.log(err.stack);
})