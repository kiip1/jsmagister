const magister = require('jsmagister');

(async () => {
  // Log in to Magister. 
  // Note: The school is the subdomain you will be on once you're logged in to Magister.
  await magister.login('<username>', '<password>', '<school>');

  // Wait for the page to load.
  await magister.waitForPageLoad();

  // Navigate to the 'cijfers' tab.
  await magister.navigate('cijfers');

  // Wait for page content to load.
  await magister.waitForTimeout(1000);

  // Take a screenshot and save it.
  await magister.takeScreenShot('grades.png');

  // Close magister.
  await magister.close();
})();
