const { default: axios } = require("axios");

module.exports = async function GetFileRecursive(respData,targetdir) {
    let filesToDownload = {};//will contain download urls

    if (respData.length === 0) return filesToDownload;
    for (i in respData) {
        let dirInfo = respData[i];
        //if file type is directory
        if (dirInfo.type === "dir") {
            let recResp = await axios.get(dirInfo.url).catch(err => { throw new Error(err) });
            if (recResp.status === 200) {
                // makes sure to pass targetdir as well 
                let f = await GetFileRecursive(recResp.data,targetdir).catch(err => { throw new Error(err) });
                filesToDownload = Object.assign(filesToDownload, f);
            }
        }
        // if type is file
        if (dirInfo.type === "file") {
            //removing target directory from the path name
            //to ensure proper output directory structure
            let filePath = dirInfo.path.substring(targetdir.length);
            // store download url
            filesToDownload[filePath] = dirInfo.download_url;
        }

    }
    return filesToDownload;
}