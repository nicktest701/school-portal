const ejs = require('ejs');
const fs = require('fs')
const path = require('path');

module.exports = generateReportTemplate = async (data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(process.cwd(), '/views/', `test.ejs`),
      { encoding: 'utf8' },
      (err, compiledHtmlText) => {
        if (err) reject(err);
        // console.log(compiledHtmlText);

        const compiled = ejs.compile(compiledHtmlText);
        const html = compiled(data);
        resolve(html);
      }
    );
  });
};
