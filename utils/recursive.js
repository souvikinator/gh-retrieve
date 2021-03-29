const { default: axios } = require("axios");

module.exports = async function GetFileRecursive(respData) {
    let filesToDownload = {};//will contain download urls

    if (respData.length === 0) return filesToDownload;
    for (i in respData) {
        let dirInfo = respData[i];
        //if file type is directory
        if (dirInfo.type === "dir") {
            let recResp = await axios.get(dirInfo.url).catch(err => { throw new Error(err) });
            if (recResp.status === 200) {
                let f = await GetFileRecursive(recResp.data).catch(err => { throw new Error(err) });
                filesToDownload = Object.assign(filesToDownload, f);
            }
        }
        // if type is file
        if (dirInfo.type === "file") {
            // store download url
            filesToDownload[dirInfo.path] = dirInfo.download_url;
        }

    }
    return filesToDownload;
}