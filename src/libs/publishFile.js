/*
 * @Author: andypliang 
 * @Date: 2018-12-18 19:16:28 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-18 19:53:15
 */

const fs = require('fs');
const path = require('path');
const CONSTS = require('./consts');
const COS = require('cos-nodejs-sdk-v5');
const publish = CONSTS.publish;
const publishConfig = publish.config;
const cos = new COS({
    SecretId: publishConfig.SecretId,
    SecretKey: publishConfig.SecretKey
});

module.exports = function(src, cb) {
    if (!src) throw new Error(`empty upload source: ${err}`);;
    const fileName = path.basename(src);
    cos.sliceUploadFile({
        Bucket: publishConfig.Bucket,
        Region: publishConfig.Region,
        Key: `${publish.remotePath}${fileName}`,
        FilePath: src
    }, (err) => {
        if (err) throw new Error(`upload file error: ${err}`);
        const remoteFile = `${publish.remoteDomain}${publish.remotePath}${fileName}`;
        console.log('publish done:', remoteFile);
        cb && cb(remoteFile);
    });
}