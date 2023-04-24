import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the website
  await page.goto('https://tgw.dmp.wa.gov.au/tgw/#');

  // Click "I Want To"
  await page.click('text="I Want To"');

  // Click "Find a Mining Tenement"
  await page.click('text="Find a Mining Tenement"');

  // Read the CSV file
  const csv = await Deno.readTextFile('data.csv');
  const rows = csv.split('\n');

  // Iterate through the CSV rows
  for (const row of rows) {
    // Get the text to enter in the textbox
    const [name] = row.split(',');

    // Enter the text in the textbox
    await page.fill('input[type="search"]', name);

    // Click "Search"
    await page.click('text="Search"');

    // Wait for the search results to load
    await page.waitForSelector('.esriViewPopup');

    // Click the context menu button
    await page.click('.esriPopupWrapper button');

    // Click the "Quick Appraisal Report" button
    await page.click('text="Quick Appraisal Report"');

    // Click the "Download Quick Appraisal" link
    await page.click('.esriPopupWrapper a');
  }

  await browser.close();
}

main();
