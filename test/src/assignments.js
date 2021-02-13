const magister = require('jsmagister');

const { username, password, school } = require('../config.json');

(async () => {
  await magister.login(username, password, school);

  console.log(`Logged in to ${username}.`);

  await magister.waitForPageLoad();

  await magister.navigate('elo/opdrachten');

  await magister.waitForTimeout(1000);

  console.log(await magister.assignments.getAssignments());

  await magister.close();
})();
