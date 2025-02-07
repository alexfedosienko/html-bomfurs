const fs = require('fs');
const mkdirp = require('mkdirp');

const blockName = process.argv[2];
const extensions = ['html', 'scss'];

if (blockName) {
  const dirPath = `./src/blocks/${blockName}/`;
  mkdirp(dirPath);


  extensions.forEach((extention) => {
    const filePath = `${dirPath}${blockName}.${extention}`;

    // Если это SCSS
    if (extention === 'scss') {
      fileContent = `// В этом файле должны быть стили для БЭМ-блока ${blockName}, его элементов, \n// модификаторов, псевдоселекторов, псевдоэлементов, @media-условий...\n\n.${blockName} {\n\n  $block-name:                &; // #{$block-name}__element\n\n}\n`;
    }

    // Если это HTML
    else if (extention === 'html') {
      fileContent = `<!--DEV\n\nДля использования этого файла как шаблона:\n\n@ @include('./src/blocks/${blockName}/${blockName}.html')\n\n(Нужно убрать пробел между символами @)\nПодробнее: https://www.npmjs.com/package/gulp-file-include\n\n\n\n<div class="${blockName}">content</div>\n\n-->\n\n${blockName}\n`;
    }

    // Создаем файл, если он еще не существует
    if (fileExist(filePath) === false && extention !== 'img' && extention !== 'bg-img') {
      fs.writeFile(filePath, fileContent, (err) => {
      });
    }
  });

}

// Проверка существования файла
function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}
