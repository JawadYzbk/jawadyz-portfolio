// Browser checks for the behaviour that is easy to break: project filters and
// expansion, the project dialog, language/theme persistence, the mobile menu,
// and the contact form. Web3Forms is always intercepted; no message is sent.
//
// Usage: start the app with a placeholder form key, then run the script.
//   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=placeholder npm run build && npx next start -p 3100
//   npm run verify:ui -- http://localhost:3100
import { chromium } from 'playwright';

const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '') + '/';
const results = [];
const cors = { 'access-control-allow-origin': '*' };
const check = (name, ok, detail = '') => {
  results.push({ name, ok: Boolean(ok), detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};

const browser = await chromium.launch();

async function newPage(options = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...options });
  const page = await context.newPage();
  page.consoleErrors = [];
  page.on('console', (message) => message.type() === 'error' && page.consoleErrors.push(message.text()));
  page.on('pageerror', (error) => page.consoleErrors.push(String(error)));
  // Never let the form reach the real provider.
  await page.route('https://api.web3forms.com/**', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', headers: cors, body: '{"success":false}' }),
  );
  await page.goto(base, { waitUntil: 'networkidle' });
  return page;
}

const cards = (page) => page.locator('#project-list article');
const status = (page) => page.locator('#projects p[aria-live]');

try {
  // Projects: filters, counts, expansion
  {
    const page = await newPage();
    check('page renders the hero headline', (await page.locator('h1').innerText()).includes('Complex systems.'));
    check('selected work shows 5 projects', (await cards(page).count()) === 5);
    check('status reports 5 of 13', (await status(page).innerText()).trim() === 'Showing 5 of 13 projects');

    const expected = { 'Business platforms': 6, 'Desktop & tools': 3, 'Open source': 4 };
    for (const [label, count] of Object.entries(expected)) {
      const button = page.getByRole('button', { name: new RegExp(`^${label}`) });
      await button.click();
      await page.waitForTimeout(500);
      check(`filter "${label}" shows ${count}`, (await cards(page).count()) === count, `got ${await cards(page).count()}`);
      check(`filter "${label}" is pressed`, (await button.getAttribute('aria-pressed')) === 'true');
    }
    check('expand control hidden inside a category', (await page.getByRole('button', { name: /Explore all/ }).count()) === 0);

    await page.getByRole('button', { name: /^All work/ }).click();
    await page.waitForTimeout(500);
    const toggle = page.getByRole('button', { name: 'Explore all 13 projects' });
    await toggle.click();
    await page.waitForTimeout(500);
    check('expanding shows all 13', (await cards(page).count()) === 13);
    check('expand control reports expanded', (await page.locator('[aria-controls="project-list"]').getAttribute('aria-expanded')) === 'true');
    await page.getByRole('button', { name: 'Show selected work' }).click();
    await page.waitForTimeout(500);
    check('collapsing returns to 5', (await cards(page).count()) === 5);

    // Dialog: open, Escape, focus restoration
    const trigger = page.locator('article', { hasText: 'NexaISP' }).getByRole('button', { name: /Explore project/ });
    await trigger.click();
    const dialog = page.locator('dialog[open]');
    await dialog.waitFor();
    check('dialog opens with the project title', (await dialog.locator('h2').innerText()) === 'NexaISP');
    check('focus moves into the dialog', await page.evaluate(() => document.activeElement?.closest('dialog') !== null));
    check('source link points at the repository', (await dialog.getByRole('link', { name: /Source code/ }).getAttribute('href')) === 'https://github.com/JawadYzbk/ISPResellerPlatform');
    check('no live demo is labelled honestly', await dialog.getByText('Public demo unavailable').isVisible());
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    check('Escape closes the dialog', (await page.locator('dialog[open]').count()) === 0);
    check('focus returns to the trigger', await trigger.evaluate((element) => element === document.activeElement));

    await page.locator('article', { hasText: 'Rust Genetics Lab' }).getByRole('button', { name: /Explore project/ }).click();
    await dialog.waitFor();
    check('live project links to its website', (await dialog.getByRole('link', { name: /Visit website/ }).getAttribute('href')) === 'https://genetics.rustplusdesktop.cloud/');
    await page.mouse.click(5, 5);
    await page.waitForTimeout(400);
    check('backdrop click closes the dialog', (await page.locator('dialog[open]').count()) === 0);

    // Links
    const links = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors.map((a) => ({ href: a.getAttribute('href'), target: a.target, rel: a.rel })),
    );
    check('no dead "#" links', links.every((link) => link.href !== '#'));
    const anchors = links.filter((link) => link.href.startsWith('#')).map((link) => link.href.slice(1));
    const missing = [];
    for (const id of new Set(anchors)) if ((await page.locator(`[id="${id}"]`).count()) === 0) missing.push(id);
    check('in-page anchors resolve', missing.length === 0, missing.join(', '));
    check(
      'external links open safely',
      links.filter((link) => link.href.startsWith('http')).every((link) => link.target === '_blank' && link.rel.includes('noopener')),
    );
    check('no console errors', page.consoleErrors.length === 0, page.consoleErrors.join(' | '));
    await page.context().close();
  }

  // Language and theme persistence
  {
    const page = await newPage({ colorScheme: 'dark' });
    await page.getByRole('button', { name: 'Switch to Arabic' }).click();
    check('language toggle switches to RTL Arabic', await page.evaluate(() => document.documentElement.dir === 'rtl' && document.documentElement.lang === 'ar'));
    check('Arabic copy is rendered', (await page.locator('h1').innerText()).includes('أنظمة معقّدة.'));
    await page.getByRole('button', { name: 'تغيير المظهر' }).click();
    check('theme toggle switches to dark', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');
    const response = await page.reload({ waitUntil: 'networkidle' });
    const html = await response.text();
    check('server renders the saved language', html.includes('lang="ar"') && html.includes('dir="rtl"'));
    check('server renders the saved theme', html.includes('data-theme="dark"'));
    await page.getByRole('button', { name: 'Switch to English' }).click();
    check('language toggles back to English', (await page.evaluate(() => document.documentElement.dir)) === 'ltr');
    await page.context().close();
  }

  // Mobile navigation
  {
    const page = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check('no horizontal overflow at 390px', overflow === 0, `${overflow}px`);
    const menu = page.getByRole('button', { name: 'Open navigation' });
    await menu.click();
    const mobileNav = page.locator('#mobile-nav');
    check('menu opens', await mobileNav.isVisible());
    check('menu button reports expanded', (await page.locator('[aria-controls="mobile-nav"]').getAttribute('aria-expanded')) === 'true');
    await page.keyboard.press('Escape');
    check('Escape closes the menu', !(await mobileNav.isVisible()));
    check('focus returns to the menu button', await page.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'mobile-nav'));
    await menu.click();
    await mobileNav.getByRole('link', { name: 'About' }).click();
    check('choosing a link closes the menu', !(await mobileNav.isVisible()));
    await page.getByRole('button', { name: 'Switch to Arabic' }).click();
    const overflowAr = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check('no horizontal overflow at 390px in Arabic', overflowAr === 0, `${overflowAr}px`);
    await page.context().close();
  }

  // Contact form (only when the form is configured)
  {
    const page = await newPage();
    const form = page.locator('form[aria-label="Send a message"]');
    if ((await form.count()) === 0) {
      check('contact form configured (skipped form checks)', false, 'start the app with NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY');
    } else {
      check('labels are associated with fields', (await page.getByLabel('Name', { exact: true }).count()) === 1 && (await page.getByLabel('Email', { exact: true }).count()) === 1 && (await page.getByLabel('Message', { exact: true }).count()) === 1);
      await form.getByRole('button', { name: 'Send message' }).click();
      check('empty submit shows three errors', (await form.locator('[aria-invalid="true"]').count()) === 3);
      check('focus moves to the first invalid field', await page.evaluate(() => document.activeElement?.id === 'contact-name'));

      await page.getByLabel('Name', { exact: true }).fill('Test Visitor');
      await page.getByLabel('Email', { exact: true }).fill('not-an-email');
      await page.getByLabel('Message', { exact: true }).fill('Testing the form.');
      await form.getByRole('button', { name: 'Send message' }).click();
      check('invalid email is rejected', (await page.getByText('Enter a valid email address.').count()) === 1);

      await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
      await page.unroute('https://api.web3forms.com/**');
      let body = '';
      await page.route('https://api.web3forms.com/**', async (route) => {
        body = route.request().postData() ?? '';
        await new Promise((resolve) => setTimeout(resolve, 600));
        await route.fulfill({ status: 500, contentType: 'application/json', headers: cors, body: '{"success":false}' });
      });
      await form.getByRole('button', { name: 'Send message' }).click();
      check('sending state disables the button', await form.getByRole('button', { name: 'Sending…' }).isDisabled());
      await form.getByRole('alert').waitFor();
      check('provider error shows an alert with an email fallback', await form.getByRole('alert').getByRole('link', { name: 'Email me' }).isVisible());
      check('values are kept after an error', (await page.getByLabel('Message', { exact: true }).inputValue()) === 'Testing the form.');
      check('request carries the expected fields', ['access_key', 'name', 'email', 'message', 'subject'].every((field) => body.includes(`name="${field}"`)) && !body.includes('name="botcheck"'));

      await page.unroute('https://api.web3forms.com/**');
      await page.route('https://api.web3forms.com/**', (route) =>
        route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: '{"success":true}' }),
      );
      await form.getByRole('button', { name: 'Send message' }).click();
      await page.getByText('Message sent. Thanks for reaching out!').waitFor();
      check('success state is announced', (await page.locator('[role="status"]', { hasText: 'Message sent' }).count()) === 1);
      await page.getByRole('button', { name: 'Send another message' }).click();
      check('form can be used again', (await page.getByLabel('Message', { exact: true }).inputValue()) === '');
    }
    // The mocked 500 response is logged by the browser on purpose.
    const formErrors = page.consoleErrors.filter((text) => !text.includes('status of 500'));
    check('no console errors on the form page', formErrors.length === 0, formErrors.join(' | '));
    await page.context().close();
  }

  // Reduced motion
  {
    const page = await newPage({ reducedMotion: 'reduce' });
    const animation = await page.locator('h1').evaluate((element) => getComputedStyle(element).animationName);
    check('reduced motion disables the hero entrance', animation === 'none', animation);
    await page.context().close();
  }
} finally {
  await browser.close();
}

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
