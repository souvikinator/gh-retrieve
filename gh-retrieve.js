const axios = require('axios');
const GetFileRecursive = require('./utils/recursive');
const { verifyRecursiveOptions, verifySparseOptions, formUrl, downloadFiles, gitExists } = require('./utils/helper');
const { sparseCheckout } = require('./utils/sparseDownload');

/**
 * @description downloads file recursively, however is limited by github API limits (60 request to a repo per hour)
 */
exports.recursiveDownload = async function (options) {
    options = Object.assign({
        author: "",
        repo: "",
        targetdir: "",
        branch: "",
        outdir: "./"
    }, options);

    // throws error if anything wrong with options
    verifyRecursiveOptions(options);
    //generates api URL based on options
    const url = formUrl(options);
    // make request to github api
    let resp = await axios.get(url).catch(err => { throw new Error(err) });
    let files = {};
    if (resp.status === 200) {
        //get downloadable url list of files
        //passing response data and target directory
        files = await GetFileRecursive(resp.data, options.targetdir).catch(err => { throw new Error(err) });
    }
    // if empty file list
    if (Object.keys(files).length === 0) {
        throw new Error(`no files to download!`);
    }

    // begin download
    // passing collected files and output directory
    await downloadFiles(files, options.outdir)
    return Object.keys(files);
};

/**
 * @description download specific directory without breaking the git workflow and also is not limited by
 * the github api, however one should have git installed
 */
exports.sparseDownload = async function (options) {
    options = Object.assign({
        cloneurl: "",
        targetdir: "",
        branch: "",
        outdir: ""
    }, options);

    //git exists?
    if(!gitExists()){
        throw new Error("To use sparseCheckout git must be installed");
    }
    // throws error if anything wrong with options
    verifySparseOptions(options);
    await sparseCheckout(options)
        .catch(err => {
            throw new Error(err);
        });
}