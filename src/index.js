const puppeteer = require('puppeteer');

/** @type {puppeteer.Browser} */
var browser;

/** @type {puppeteer.Page} */
var page;

const magister = {
  /** @type {puppeteer.PuppeteerNode} */
  _puppeteer: puppeteer,
  /** @type {puppeteer.Browser} */
  _browser: browser,
  /** @type {puppeteer.Page} */
  _page: page,
  /**
   * Logs into Magister.
   * 
   * @param {string} username The username.
   * @param {string} password The password.
   * @param {string} school The school of the account. It's the subdomain you will be redirected to once you login. If your URL is example.magister.net once you're logged in, your school is example.
   */
  login: async (username, password, school) => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    magister.setViewPort(1920, 1080);

    await page.goto(`https://${school}.magister.net`);
  
    await page.waitForSelector('#username');
    await page.type('#username', username);
    await page.type('#username', String.fromCharCode(13));
  
    await page.waitForSelector('#rswp_password');
    await page.type('#rswp_password', password);
    await page.type('#rswp_password', String.fromCharCode(13));
  
    await page.waitForSelector('#rswp_submit');
    await page.click('#rswp_submit');
  
    return { username: username, password: password, school: school };
  },
  /**
   * Logs out of magister.
   */
  logout: async () => await page.evaluate('document.getElementById(\'user-menu\').click();document.getElementById(\'log-off\').click();'),
  /**
   * Navigate to a page within Magister.
   * 
   * @param {string} target The page to navigate to.
   */
  navigate: async (target) => {
    const url = `${await page.evaluate('location.origin')}/magister/#/${target}`;

    await page.goto(url);

    return { url: url };
  },
  /**
   * Waits for the current page to load.
   */
  waitForPageLoad: async () => await page.waitForNavigation(),
  /**
   * Waits for the given amount of milliseconds.
   * 
   * @param {number} duration The duration to wait for in milliseconds.
   */
  waitForTimeout: async (duration) => await page.waitForTimeout(duration),
  /**
   * Sets the viewport to the given dimensions.
   * 
   * @param {number} width The width of the viewport.
   * @param {number} height The height of the viewport.
   */
  setViewPort: async (width, height) => await page.setViewport({ width: width, height: height }),
  /**
   * Takes a screenshot and saves it to the disk.
   * 
   * @param {string} filename The filename to store the screenshot as.
   */
  takeScreenShot: async (filename) => await page.screenshot({ path: filename }),
  /**
   * Stops the API.
   */
  close: async () => await browser.close(),
};

module.exports = magister;
