const puppeteer = require('puppeteer');

const generateReport = async ({ template, id }) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      protocolTimeout: 0,
      timeout: 0,
    });

    //page
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setContent(template, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('screen');

    // await page.waitForNetworkIdle();
    // await page.waitForSelector('img');

    // const reports = await page.$$('.report');

    const margin = {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };

    await page.pdf({
      path: `reports/${id}.pdf`,
      format: 'A4',
      margin,
      timeout: 0,
      printBackground: true,
      footerTemplate:
        '<small style="font-size:10px;font-style:italic;">Powered by Frebbytech consults(0543772591)</small>',
    });

    // const generated = reports.map(async (report) => {
    //   const id = await report.evaluate(
    //     (element) => element.querySelector('.student-id').textContent
    //   );

    //   await report.screenshot({
    //     path: `reports/${id?.trim()}.webp`,
    //     type: 'webp',
    //     quality:100
    //   });

    // });

    // await Promise.all(generated);

    //close browser

    await browser.close();

    return 'done';
  } catch (error) {
    console.log(error);
    throw "An error has occured.Couldnt generate vouchers";
  }
};

module.exports = generateReport;

// const reportContents = await page.evaluate(() => {
//   const reportElements = document.querySelectorAll('.report');
//   const contents = [];

//   reportElements.forEach(reportElement => {
//     const id= reportElement.querySelector('.student-id').textContent;
//     contents.push({
//       id,
//       element: reportElement.outerHTML, // HTML of the element
//       text: reportElement.textContent,   // Text content of the element
//     });
//   });

//   return contents;
// });

// const generated= reportContents.forEach(async(report, index) => {

//   await page.setContent(report.text
//     )

//     // await page.waitForSelector("img");

//   await page.pdf({
//     path: `reports/${report?.id.trim()}.pdf`,
//     format:'A4',
//     margin

//   })
//   console.log(report?.id);
//   console.log("done");
//   // console.log(report.text);
// });

// const boundingBox = await report.boundingBox();

// const pdfOptions = {
//   path: `reports/${id?.trim()}.pdf`, // Use selector as part of the filename
//   format: 'A4',
//   margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
// };

// page.setDefaultTimeout(0)
// // Print the element as PDF
// await page.pdf({
//   path: pdfOptions.path,
//   format: pdfOptions.format,
//   margin: pdfOptions.margin,
//   clip: {
//     x: boundingBox.x,
//     y: boundingBox.y,
//     width: boundingBox.width,
//     height: boundingBox.height,
//   },

// });

// for (const selector of reports) {
//   // Wait for the element to be ready
//   await page.waitForSelector(selector);

//   // Get the bounding box of the element
//   const elementHandle = await page.$(selector);
//   const boundingBox = await elementHandle.boundingBox();

//   // Set up the PDF options
//   const pdfOptions = {
//     path: `${selector.replace('#', '')}.pdf`, // Use selector as part of the filename
//     format: 'A4',
//     margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
//   };

//   // Print the element as PDF
//   await page.pdf({
//     path: pdfOptions.path,
//     format: pdfOptions.format,
//     margin: pdfOptions.margin,
//     clip: {
//       x: boundingBox.x,
//       y: boundingBox.y,
//       width: boundingBox.width,
//       height: boundingBox.height,
//     },
//   });
// }
