const execa = require('execa');
const fs = require('fs-extra');
exports.sparseCheckout = async function (options) {
    // check if directory exists
    try {
        await fs.access(options.outdir);
        process.chdir(options.outdir);
    } catch (err) {
        await fs.ensureDir(options.outdir)
            .catch(err => {
                throw new Error(err);
            });
        process.chdir(options.outdir);
        await execa('git', ['init']).catch(err => { throw new Error(err) });
        await execa('git', ['remote', 'add', 'origin', options.cloneurl]);
    }
    // change directory
    // sparse checkout
    await execa('git', ['config', 'core.sparsecheckout', 'true']).catch(err => { throw new Error(err) });
    await fs.appendFile('.git/info/sparse-checkout', `${options.targetdir}\n`).catch(err => { throw new Error(err) });
    await execa('git', ['fetch']).catch(err => { throw new Error(err) });
    await execa('git', ['checkout', options.branch]).catch(err => { throw new Error(err) });
    await execa('git', ['pull', 'origin', options.branch]).catch(err => { throw new Error(err) });
}