const urljoin = require('url-join');
const download = require('download');
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');

// verify passed options for recursive download
exports.verifyRecursiveOptions = function (options) {
    let requireProp = ["author", "repo", "targetdir"];
    for (prop in options) {
        //if compulsory option and no value provided
        if (options[prop].length === 0 && requireProp.includes(prop)) {
            throw new Error(`${prop} is require field`);
        }
        if (typeof options[prop] !== "string") {
            throw new Error(`${prop} only takes string as input, ${typeof options[prop]} is provided`);
        }
    }
};

// verify passed options for sparse download
exports.verifySparseOptions = function (options) {
    let requireProp = ["cloneurl", "targetdir", "branch","outdir"];
    for (prop in options) {
        //if compulsory option and no value provided
        if (options[prop].length === 0 && requireProp.includes(prop)) {
            throw new Error(`${prop} is require field`);
        }
        if (typeof options[prop] !== "string") {
            throw new Error(`${prop} only takes string as input, ${typeof options[prop]} is provided`);
        }
    }
};

//generates github api as per the options passed
exports.formUrl = function (options) {
    let apiEndpoint = urljoin(`https://api.github.com/repos/`, options.author, options.repo, "contents", options.targetdir);
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
        // create file before downloading
        fs.outputFile(dirpath, await download(downloadUrl));
    }
}

// to execute a previledges of a script
exports.chmod = async function (scriptPath) {
    const platform = process.platform;
    let cmd = "chmod"
    let args = ["+x", scriptPath];
    if (platform === "win32") {
        cmd = "ICACLS";
        args = [scriptPath, "/grant:r", "users:(RX)", "/C"]
    }
    await execa(cmd, args).catch(err => { throw new Error(err) });
}

// execute script
exports.runScript = async function (scriptPath, options) {
    // execute worker script
    await execa(scriptPath, [options.outdir, options.cloneurl, options.targetdir])
        .catch(err => {
            throw new Error(err);
        })
}