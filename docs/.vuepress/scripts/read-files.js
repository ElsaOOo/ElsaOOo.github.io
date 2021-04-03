const fs = require('fs');
const path = require('path');
/**
 * 根据目录名读取该docs目录下各目录中的markdown文件
 * @param {string} dirname
 */
const readFiles =  (dirname) => {
    const files = [];
    if (!dirname) {
        return files;
    }
    // 当前进程的目录
    const currentProjectDir = process.cwd();
    const filenames = fs.readdirSync(path.join(currentProjectDir, 'docs', dirname));
    for (const filename of filenames) {
        if (filename !== 'README.md') {
            files.push(`/${dirname}/${filename}`);
        }
    }
    return files
}

module.exports = {
    readFiles
}