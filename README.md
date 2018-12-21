# miniprogram-svg2sprite

svg图标转换成适合小程序内使用的svg雪碧图和对应的wxss

## 安装
```javascript
npm install --save-dev miniprogram-svg2sprite
```

## 使用
### 初始化
```javascript
const path = require('path');
const svg2font = require('miniprogram-svg2sprite');

svg2sprite(opts);
```

opts是可选的配置参数，具体如下：
### src：
svg列表目录，default：当前目录下的svg目录

### dest：
生成svg雪碧图和对应wxss样式文件的目标目录，default：当前目录下的dest目录

### spriteName：
雪碧图名称，default：miniprogram-sprite

### useTimestamp：
文件名称是否使用时间戳，防止上传的雪碧图把旧图覆盖，default：true

### noSizeStyle：
样式文件是否需要生成图标对应的宽高尺寸样式，defautl：false

### publishConfig：
文件发布的配置，**小程序内样式文件不能直接引用本地图片文件，需发布到服务器再引用**，本例中使用的是腾讯云的对象存储。如有其它需要可重写src/libs/publishFile文件

完整调用例子：
```javascript
const path = require('path');
const svg2font = require('miniprogram-svg2sprite');

svg2sprite({
    src: path.join(__dirname, 'svg'), // svg列表目录
    dest: path.join(__dirname, 'dest'), // 生成svg雪碧图和对应wxss样式文件目录
    spriteName: 'testSprite',
    useTimestamp: false, // 文件名称是否使用时间戳
    noSizeStyle: false, // 是否需要生成图标对应的宽高尺寸样式
    publishConfig: {  // 文件发布配置 可选
        remoteDomain: '', // 服务器域名，eg：https://cdn.com/
        remotePath: '', // 文件发布远程目录路径，eg: xxx/xxx/
        config: { // 腾讯云对象存储配置，说明文档：https://cloud.tencent.com/document/product/436/8629
            AppId: '',
            SecretId: '',
            SecretKey: '',
            Bucket: '',
            Region: ''
        }
    }
});
````

在小程序内使用雪碧图需要注意，提供的svg icon尺寸须是偶数，且建议icon边沿预留1像素的透明边，因为rpx单位在使用时，会以750宽度为基准，等比缩放到其他屏幕时计算的单位值会把小数点部分做floor取整，导致显示的icon可能会被切掉1像素的边
