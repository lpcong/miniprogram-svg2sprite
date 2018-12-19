/*
 * @Author: andypliang 
 * @Date: 2018-12-18 19:16:28 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-19 16:36:45
 */

const fs = require('fs');
const path = require('path');
const CONSTS = require('./consts');
const COS = require('cos-nodejs-sdk-v5');

module.exports = function(src, publishConfig, cb) {
    if (!src) throw new Error(`empty upload source: ${err}`);
    const config = publishConfig.config || {};
    const cos = new COS({
        SecretId: config.SecretId,
        SecretKey: config.SecretKey
    });
    const fileName = path.basename(src);
    if (!publishConfig.remoteDomain) {
        console.log(`上传配置为空，可在/miniprogram-svg2sprite/src/libs/consts.js中加入你的上传配置`);
        cb && cb(fileName);
        return;
    }
    cos.sliceUploadFile({
        Bucket: config.Bucket,
        Region: config.Region,
        Key: `${publishConfig.remotePath}${fileName}`,
        FilePath: src
    }, (err) => {
        if (err) throw new Error(`upload file error: ${err}`);
        const remoteFile = `${publishConfig.remoteDomain}${publishConfig.remotePath}${fileName}`;
        console.log('publish done:', remoteFile);
        cb && cb(remoteFile);
    });
}