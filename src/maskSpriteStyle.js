/*
 * @Author: andypliang 
 * @Date: 2018-12-18 19:03:20 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-18 20:43:44
 */

const fs = require('fs');
const path = require('path');

module.exports = ({ spriteFile, spriteDatas, cssData, noSizeStyle, remotePath } = params) => {
    let data = '';
    for (let file of spriteDatas) {
        let className = path.basename(file.svgPath, `.svg`);
        if (className.endsWith('@2x')) {
            className = className.substring(0, className.length - 3);
        }
        const sWidth = file.width.outer; // inner有时会返回NaN，故使用outer
        const sHeight = file.height.outer;
        const spriteWidth = cssData.css.spriteWidth;
        const spriteHeight = cssData.css.spriteHeight;
        const xSizePercent = (spriteWidth / sWidth ) * 100 + '%';
        const ySizePercent = (spriteHeight / sHeight) * 100 + '%';
        const x = file.position.absolute.x === 0 ? '0%' : ((file.position.absolute.x - 1) / (spriteWidth - sWidth)).toFixed(4)  * - 100 + '%';
        const y = file.position.absolute.y === 0 ? '0%' : ((file.position.absolute.y - 1) / (spriteHeight - sHeight)).toFixed(4) * - 100 + '%';
        data += `.${className}{background-image:url(${remotePath});background-size:${xSizePercent} ${ySizePercent};background-position:${x} ${y};`;
        if (noSizeStyle) {
            data += `}`;
        } else {
            data += `display:inline-block;width:${sWidth}rpx;height:${sHeight}rpx;}`;
        }
    }
    fs.writeFile(spriteFile.replace('.svg', '.wxss'), data, () => {});
}