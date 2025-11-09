const puppeteer = require("puppeteer");

const generateReport = async ({ template, id }) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      protocolTimeout: 0,
      timeout: 0,
    });

    //page
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setContent(template, { waitUntil: "domcontentloaded" });
    await page.emulateMediaType("screen");

    const margin = {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    };

    await page.pdf({
      path: `reports/${id}.pdf`,
      format: "A4",
      margin,
      timeout: 0,
      printBackground: true,
      footerTemplate:
        ` <div>
                    Powered by
                    <a
                        href="https://nanaakwasi.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Frebby Tech Consult
                    </a>
                    (+233543772591). &copy; <script>document.write(new Date().getFullYear());</script> | All rights
                    reserved.
                </div>`,
    });

    //close browser
    await browser.close();

    return "done";
  } catch (error) {
    console.log(error);
    throw "An error has occured.Couldnt generate vouchers";
  }
};

module.exports = generateReport;
