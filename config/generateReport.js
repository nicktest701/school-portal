const puppeteer = require('puppeteer');

const generateReport = async (htmltext) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
    });

    //page
    const page = await browser.newPage();
    await page.setContent(htmltext, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('screen');

    // await page.waitForNetworkIdle();
    await page.waitForSelector('img');

    const reports = await page.$$('.report');

    const generated = reports.map(async (report) => {
      await report.evaluate((element) => element);

      const id = await report.evaluate(
        (element) => element.querySelector('.student-id').textContent
      );

      await report.screenshot({
        path: `views/${id.trim()}.webp`,
        type: 'webp',
      });
    });

    await Promise.all(generated);

    //close browser

    await browser.close();

    return 'done';
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateReport;
