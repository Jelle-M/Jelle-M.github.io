const handlebars = require('handlebars');
const fs = require('fs-extra');
const markdownHelper = require('./utils/helpers/markdown');
const templateData = require('./metadata/metadata');
const Puppeteer = require('puppeteer');
const getSlug = require('speakingurl');
const dayjs = require('dayjs');

const srcDir = __dirname;
const outputDir = __dirname + '/../docs';

// Clear dest dir
fs.emptyDirSync(outputDir);

// Copy assets
fs.copySync(srcDir + '/assets', outputDir);

// Build HTML
handlebars.registerHelper('markdown', markdownHelper);
const source = fs.readFileSync(srcDir + '/templates/index.html', 'utf-8');
const template = handlebars.compile(source);
const pdfFileName_EN = `CV_Jelle_Meeus_EN.pdf`;
const pdfFileName_NL = `CV_Jelle_Meeus_NL.pdf`;
const html = template({
  ...templateData,
  pdfFileName_EN,
  pdfFileName_NL,
  updated: dayjs().format('MMMM D, YYYY'),
});
fs.writeFileSync(outputDir + '/index.html', html);

// buildPdf = async function (inputFile, outputFile) {
//   const browser = await Puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(`file://${inputFile}`, {
//     waitUntil: 'networkidle0'
//   });
// //  await page.pdf({
// //    path: outputFile,
// //    format: 'A4',
// //    border: 0,
// //    margin: {
// //      top: '2.54cm',
// //      right: '2.54cm',
// //      bottom: '2.54cm',
// //      left: '2.54cm',
// //    },
// //  });
//   await browser.close();
// };
// 
// // Build PDF
// buildPdf(`${outputDir}/index.html`, `${outputDir}/${pdfFileName}`);
