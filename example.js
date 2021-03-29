const ghdowndir=require("./github-download-dir");

ghdowndir({
	author:"DarthCucumber",
	repo:"gofuzz",
	dir:"pkg",
	outdir:"test"
}).then(()=>{
	console.log("finished download!");
}).catch(err=>{
	console.log(err);
});
