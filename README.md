# miniprogram-svg2sprite

svg图标转换成适合小程序内使用的svg雪碧图和对应的wxss

## 安装
```javascript
npm install --save-dev miniprogram-svg2sprite
```

## 使用
```javascript
const path = require('path');
const svg2font = require('miniprogram-svg2sprite');

svg2sprite({
    src: path.join(__dirname, 'svg'), // svg列表目录
    dest: path.join(__dirname, 'dest'), // 生成svg雪碧图和对应wxss样式文件目录
    spriteName: 'testSprite',
    useTimestamp: false, // 文件名称是否使用时间戳
    noSizeStyle: false // 是否需要生成图标对应的宽高尺寸样式
});
```

