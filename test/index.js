/*
 * @Author: andypliang 
 * @Date: 2018-12-18 17:16:16 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-18 20:47:44
 */

const path = require('path');
const svg2sprite = require('../index');

svg2sprite({
    src: path.join(__dirname, 'svg'),
    dest: path.join(__dirname, 'dest'),
    spriteName: 'testSprite',
    useTimestamp: false,
    noSizeStyle: false
});