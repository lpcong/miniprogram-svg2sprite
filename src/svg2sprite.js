/*
 * @Author: andypliang 
 * @Date: 2018-12-16 00:24:50 
 * @Last Modified by: andypliang
 * @Last Modified time: 2018-12-19 10:57:25
 */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const SVGSpriter = require('svg-sprite');
const spriteConfig = {
	log: false, 
	shape: {
		spacing: {
			padding: 2,
			box: 'content'
		}
    },
    mode: {
		css: true
	}
};

/**
 * 获取svg文件列表
 * @param {String} src svg文件目录
 */
function initSvgs(src) {
    const files = fs.readdirSync(src, 'utf8');
    const result = [];
    if (!files) throw new Error(`空的SVG目录：${src}`);
    for (let i in files) {
        if (typeof files[i] !== 'string' || path.extname(files[i]) !== '.svg') continue;
        result.push(path.join(src, files[i]));
    }
    return result;
}

module.exports = ({ spriteName, src, dest } = params) => {
    return new Promise((resolve, reject) => {
        try {
            const svgList = initSvgs(src);
            const spriteFile = path.join(dest, `${spriteName}.svg`);
            const spriter = new SVGSpriter(spriteConfig);
            
            for (let s of svgList) {
                spriter.add(s, path.basename(s), fs.readFileSync(s, { encoding: 'utf-8' }));
            }

            // mkdir
            mkdirp.sync(dest, (err) => {
                if (err) throw new Error(`创建目录异常: ${err}`);
            });

            // Composite
            spriter.compile((err, result, cssData) => {
                if (err) throw new Error(`sprite compile error：${err}`);
                const datas = [];
                const shapes = cssData.css.shapes;
                shapes.forEach((data) => {
                    svgList.forEach((s) => {
                        if (path.basename(s) === `${data.name}.svg`) {
                            data.svgPath = s;
                            datas.push(data);
                        }
                    });
                });
                fs.writeFile(spriteFile, result.css.sprite._contents, (err) => {
                    if (err) throw new Error(`write file error：${err}`);
                    console.log('create sprite done!');
                    resolve({
                        spriteDatas: datas,
                        cssData,
                        spriteFile
                    });
                });
            });
        } catch (err) {
            throw new Error(`make sprite error：${err}`);
        }
    });
}