const axios = require('axios');
const GetFileRecursive = require('./utils/recursive');
let { verifyOptions, formUrl,downloadFiles } = require('./utils/helper');
module.exports = async function GithubDirDownload(options) {
    options = Object.assign({
        author: "",
        repo: "",
        dir: "",
        branch: "",
        outdir: "./"
    }, options);

    // throws error if anything wrong with options
    verifyOptions(options);
    //generates api URL based on options
    const url = formUrl(options);
    // make request to github api
    let resp = await axios.get(url).catch(err => { throw new Error(err) });
    let files = {};
    if (resp.status === 200) {
        //get downloadable url list of files
        files = await GetFileRecursive(resp.data).catch(err => { throw new Error(err) });
    }
    // if empty file list
    if(Object.keys(files).length===0){
        throw new Error(`no files to download!`);
    }

    // begin download
    await downloadFiles(files,options.outdir)
    return Object.keys(files);
};