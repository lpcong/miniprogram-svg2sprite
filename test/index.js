/*
 * @Author: andypliang 
 * @Date: 2018-12-18 17:16:16 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-21 11:41:20
 */

const path = require('path');
const svg2sprite = require('../index');

svg2sprite({
    src: path.join(__dirname, 'svg'),
    dest: path.join(__dirname, 'dest'),
    spriteName: 'ws-iconsprite',
    useTimestamp: true,
    noSizeStyle: true,
    publishConfig: {  // 文件发布配置
        remoteDomain: '', // 服务器域名，eg：https://cdn.com/
        remotePath: '', // 文件发布远程目录路径，eg: xxx/xxx/
        config: {
            AppId: '',
            SecretId: '',
            SecretKey: '',
            Bucket: '',
            Region: ''
        }
    }
});