const { test, expect, chromium } = require('@playwright/test');

// Helper Functions
async function openApp(page) {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle', timeout: 60000 });
}

function getLocators(page) {
  return {
    input: page.locator('textarea').first(),
    output: page.locator('div.whitespace-pre-wrap').first()
  };
}

// --- TEST DATA ---

const positiveFunctionalTests = [
  { id: 'Pos_Fun_0001', desc: 'Convert simple daily sentence', input: 'aayuboovan!', expected: 'ආයුබෝවන්!' },
  { id: 'Pos_Fun_0002', desc: 'Convert request', input: 'raeeta bath oone', expected: 'රෑට බත් ඕනෙ.' },
  { id: 'Pos_Fun_0003', desc: 'Convert interrogative', input: 'Harine dhaen, ehenam api yamudha?', expected: 'හරිනෙ දැන්, එහෙනම් අපි යමුද?' },
  { id: 'Pos_Fun_0004', desc: 'Convert imperative', input: 'vaessa unath api dhaen yanna epaeyi', expected: 'වැස්ස උනත් අපි දැන් යන්න එපැයි' },
  { id: 'Pos_Fun_0005', desc: 'Convert greeting', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
  { id: 'Pos_Fun_0006', desc: 'Convert command', input: 'vahaama enna.', expected: 'වහාම එන්න.' },
  { id: 'Pos_Fun_0007', desc: 'Convert past tense', input: 'mama iiyee gedhara giyaa.', expected: 'මම ඊයේ ගෙදර ගියා.' },
  { id: 'Pos_Fun_0008', desc: 'Convert future tense', input: 'mama heta paasal enavaa', expected: 'මම හෙට පාසල් එනවා' },
  { id: 'Pos_Fun_0009', desc: 'Convert negative', input: 'mama dhannee naee.', expected: 'මම දන්නේ නෑ.' },
  { id: 'Pos_Fun_0010', desc: 'Plural pronoun', input: 'oyaalaa enavadha?', expected: 'ඔයාලා එනවද?' },
  { id: 'Pos_Fun_0011', desc: 'Family sentence', input: 'eyaalaa gedhara giyaa.', expected: 'එයාලා ගෙදර ගියා.' },
  { id: 'Pos_Fun_0012', desc: 'Polite request', input: 'karuNaakara paena dhenavadha?', expected: 'කරුණාකර පැන දෙනවද?' },
  { id: 'Pos_Fun_0013', desc: 'Food sentence', input: 'me kaeema eka kanna', expected: 'මෙ කෑම එක කන්න' },
  { id: 'Pos_Fun_0014', desc: 'App mention', input: 'Oyaa WhatsApp innavadha?', expected: 'ඔයා WhatsApp ඉන්නවද?' },
  { id: 'Pos_Fun_0015', desc: 'City mention', input: 'mama Colombo yanna hadhannee.', expected: 'මම Colombo යන්න හදන්නේ.' },
  { id: 'Pos_Fun_0016', desc: 'Mixed identification', input: 'ID card eka', expected: 'ID card එක' },
  { id: 'Pos_Fun_0017', desc: 'Currency', input: 'Rs. 5643', expected: 'Rs. 5643' },
  { id: 'Pos_Fun_0018', desc: 'Morning greeting', input: 'suba udhaeesanak!', expected: 'සුබ උදෑසනක්!' },
  { id: 'Pos_Fun_0019', desc: 'Travel home', input: 'mama gedhara yanavaa.', expected: 'මම ගෙදර යනවා.' },
  { id: 'Pos_Fun_0020', desc: 'Daily activities', input: 'Mee, Adha monaadha karanne?', expected: 'මේ, අද මොනාද කරන්නේ?' },
  { id: 'Pos_Fun_0021', desc: 'Food preference', input: 'mata koththu kanna oone', expected: 'මට කොත්තු කන්න ඕනෙ' },
  { id: 'Pos_Fun_0022', desc: 'Questioning', input: 'Adha gedhara yanavadha oyaa?', expected: 'අද ගෙදර යනවද ඔයා?' },
  { id: 'Pos_Fun_0023', desc: 'Pet care', input: 'ballava naavanna', expected: 'බල්ලව නාවන්න' },
  { id: 'Pos_Fun_0024', desc: 'Weight units', input: '10 kg', expected: '10 kg' }
];

const negativeFunctionalTests = [
  { id: 'Neg_Fun_0001', desc: 'Joined words error', input: 'man kadeeta yanavaa' },
  { id: 'Neg_Fun_0002', desc: 'Slang usage', input: 'anee eeka dhiyan.' },
  { id: 'Neg_Fun_0003', desc: 'Interrogative slang', input: 'dhaen ithin monavadha karanne?' },
  { id: 'Neg_Fun_0004', desc: 'Emphasis slang', input: 'gaemmak thamay' },
  { id: 'Neg_Fun_0005', desc: 'English mix', input: 'machan maara scene eka ' },
  { id: 'Neg_Fun_0006', desc: 'Mixed location', input: 'Kandy gihin call karannam' },
  { id: 'Neg_Fun_0007', desc: 'Aggressive command', input: 'kata vahapan!' },
  { id: 'Neg_Fun_0008', desc: 'Repetitive slang', input: 'api yanavaa ban yanna' },
  { id: 'Neg_Fun_0009', desc: 'Campus slang', input: 'sonaal adha campus enne nadhdha?' },
  { id: 'Neg_Fun_0010', desc: 'Slow motion slang', input: 'himin himin aave ' }
];

// --- TEST EXECUTION ---

test.describe('ITPM Assignment 1 Automation', () => {
  let browser;
  let context;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false, slowMo: 500 }); 
    context = await browser.newContext();
    page = await context.newPage();
  });

  // Loop 1: Positive Functional Tests
  for (const tc of positiveFunctionalTests) {
    test(`${tc.id} - ${tc.desc}`, async () => {
      await openApp(page);
      const { input, output } = getLocators(page);
      await input.fill(tc.input);
      await expect(output).not.toBeEmpty({ timeout: 15000 });
      if (tc.expected) await expect(output).toHaveText(tc.expected);
    });
  }

  // Loop 2: Negative Functional Tests
  for (const tc of negativeFunctionalTests) {
    test(`${tc.id} - ${tc.desc}`, async () => {
      await openApp(page);
      const { input, output } = getLocators(page);
      await input.fill(tc.input);
      await expect(output).toBeVisible();
    });
  }

  // UI Test Case
  test('Pos_UI_0001 - Clear input field resets Sinhala output', async () => {
    await openApp(page);
    const { input, output } = getLocators(page);
    await input.fill('man gedhara yanavaa');
    await expect(output).not.toBeEmpty({ timeout: 10000 });
    await input.fill('');
    await expect(output).toHaveText('');
  });

  test.afterAll(async () => {
    if (browser) await browser.close();
  });
});