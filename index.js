/*
 * @Author: andypliang 
 * @Date: 2018-12-18 17:11:59 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-19 16:39:17
 */

const svg2sprite = require('./src/svg2sprite');
const maskSpriteStyle = require('./src/maskSpriteStyle');
const publishFile = require('./src/libs/publishFile');
const { getCurrentTime } = require('./src/libs/utils');
const CONSTS = require('./src/libs/consts');

module.exports = function({ 
    src = CONSTS.src, 
    dest = CONSTS.dest, 
    spriteName = CONSTS.spriteName,
    noSizeStyle = CONSTS.noSizeStyle,
    useTimestamp = CONSTS.useTimestamp,
    publishConfig = CONSTS.publish
} = params) {
    // use timestamp name
    useTimestamp && (spriteName += getCurrentTime());

    svg2sprite({ src, dest, spriteName }).then(({ 
        spriteDatas, 
        cssData,
        spriteFile 
    } = res) => {
        // 注意小程序样式内不能直接引用本地图片文件，需上传到服务器
        // 测试使用的是腾讯云对象存储，可根据需要重写publishFile函数
        publishFile(spriteFile, publishConfig, (remotePath) => {
            maskSpriteStyle({
                spriteFile,
                remotePath,
                spriteDatas,
                cssData,
                noSizeStyle
            });
        });
    });
};