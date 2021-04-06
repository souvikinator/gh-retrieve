const { recursiveDownload, sparseDownload } = require("./gh-retrieve.js");
const ora = require("ora");

const spinner = ora("downloading files...").start();

// recursiveDownload({
// 	author: "DarthCucumber", //repository owner
// 	repo: "gofuzz", //repository name
// 	targetdir: "pkg", //target directory to download
// 	outdir: "test", //directory to download in
// })
// 	.then(() => {
// 		spinner.succeed("download complete...");
// 	})
// 	.catch((err) => {
// 		spinner.fail(err.message);
// 		console.log(err.stack);
// 	});

sparseDownload({
	cloneurl: "git@github.com:DarthCucumber/gofuzz.git",
	targetdir: "pkg/utils",
	outdir: "../test",
	branch:"master"
}).then(data => {
	spinner.succeed("done");
	console.log(data);
}).catch(err => {
	spinner.fail(err.message);
	console.log(err.stack);
})