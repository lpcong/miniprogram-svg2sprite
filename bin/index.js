#!/usr/bin/env node

'use strict';
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const svg2font = require('../index');
const dirname = process.cwd();
const version = require('../package.json').version;

if (argv.v || argv.version) {
    console.log(`v${version}`);
} else if (argv._ && argv._.length) {
    let src = argv._[0],
        dest = argv._[1] || src;
    svg2font({
        src: path.join(dirname, src),
        dest: path.join(dirname, dest),
        spriteName: argv.n || argv.name,
        useTimestamp: !!(argv.t || argv.timestamp),
        noSizeStyle: !!(argv.nosize)
    });
} else {
    console.log([
        'usage: svg2sprite [src] [dest] [options]',
        '',
        'options: -n   --name       sprite name(default: miniprogram-sprite)',
        '         -t   --timestamp  using timestamp in sprite name',
        '         --nosize          make style file without width&height attributes',
    ].join('\n'));
    process.exit();
}