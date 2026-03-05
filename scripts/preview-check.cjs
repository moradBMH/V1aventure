const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure && req.failure().errorText));
  try{
    const resp = await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' , timeout: 15000});
    console.log('STATUS', resp && resp.status());
    await page.screenshot({ path: 'preview-screenshot.png', fullPage: true });
    console.log('Saved preview-screenshot.png');
  }catch(e){
    console.error('NAV ERROR', e.message);
  } finally{
    await browser.close();
  }
})();
