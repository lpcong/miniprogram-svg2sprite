/*
 * @Author: andypliang 
 * @Date: 2018-12-18 16:50:26 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-18 20:47:02
 */

module.exports = {
    src: 'svg',
    dest: 'dest',
    spriteName: 'miniprogram-sprite',
    noSizeStyle: false, // 生成的wxss文件是否不带尺寸样式（全局设置尺寸可减少代码量）
    useTimestamp: true, // 雪碧图名称是否使用时间戳以防覆盖
    publish: {
        remoteDomain: '', // 服务器域名，eg：https://cdn.com/
        remotePath: '', // 文件发布远程目录路径，eg: xxx/xxx/
        config: { // 腾讯云对象存储配置
            AppId: '',
            SecretId: '',
            SecretKey: '',
            Bucket: '',
            Region: ''
        }
    }
};