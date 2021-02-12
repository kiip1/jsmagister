const magister = require('jsmagister');

const { username, password, school } = require('../config.json');

const pages = ['vandaag', 'agenda', 'afwezigheid', 'cijfers', 'elo/bronnen', 'elo/studiewijzers', 'elo/opdrachten', 'activiteiten', 'leermiddelen', 'berichten'];

(async () => {
  await magister.login(username, password, school);

  console.log(`Logged in to ${username}.`);

  await magister.waitForPageLoad();

  for (const page of pages) {
    await magister.navigate(page);

    await magister.waitForTimeout(1000);

    await magister.takeScreenShot(`screenshots/${page}.png`);

    console.log(`Screenshotted: ${page}`);
  }

  await magister.logout();

  await magister.waitForTimeout(1000);

  await magister.takeScreenShot(`screenshots/login.png`);

  console.log('Screenshotted: login');

  await magister.close();
})();
