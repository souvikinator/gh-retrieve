const urljoin = require('url-join');
const download = require('download');
const fs = require('fs-extra');
const path = require('path');

// verify passed options
exports.verifyOptions = function (options) {
    let requireProp = ["author", "repo", "dir"];
    for (prop in options) {
        //if compulsory option and no value provided
        if (options[prop].length === 0 && requireProp.includes(prop)) {
            throw new Error(`${prop} is require field and cannot be empty`);
        }
        if (typeof options[prop] !== "string") {
            throw new Error(`${prop} only takes string as input, ${typeof options[prop]} is provided`);
        }
    }
};

//generates github api as per the options passed
exports.formUrl = function (options) {
    let apiEndpoint = urljoin(`https://api.github.com/repos/`, options.author, options.repo, "contents", options.dir);
    if (options.branch.length !== 0) {
        apiEndpoint = urljoin(apiEndpoint, `?ref=${options.branch}`);
    }
    // console.log(apiEndpoint);
    return apiEndpoint;
}

exports.downloadFiles = async function (fileList, outdir) {
    for (filepath in fileList) {
        let dirpath = path.join(outdir, filepath);
        // createParentDir(dirpath);
        let downloadUrl = fileList[filepath];
        fs.ensureFile(dirpath,async (err) => {
            if(err) throw new Error(err);
            await download(downloadUrl); 
        });
    }
}