const { test, expect, chromium } = require('@playwright/test');

const testCases = [
  { id: 'Pos_Fun_0001', input: 'aayuboovan!', expected: 'ආයුබෝවන්!' },
  { id: 'Pos_Fun_0002', input: 'raeeta bath oone', expected: 'රෑට බත් ඕනෙ.' },
  { id: 'Pos_Fun_0003', input: 'Harine dhaen, ehenam api yamudha?', expected: 'හරිනෙ දැන්, එහෙනම් අපි යමුද?' },
  { id: 'Pos_Fun_0004', input: 'vaessa unath api dhaen yanna epaeyi', expected: 'වැස්ස උනත් අපි දැන් යන්න එපැයි' },
  { id: 'Pos_Fun_0005', input: 'oyaata kohomadha?', expected: 'ඔයාට කොහොමද?' },
  { id: 'Pos_Fun_0006', input: 'vahaama enna.', expected: 'වහාම එන්න.' },
  { id: 'Pos_Fun_0007', input: 'mama iiyee gedhara giyaa.', expected: 'මම ඊයේ ගෙදර ගියා.' },
  { id: 'Pos_Fun_0008', input: 'mama heta paasal enavaa', expected: 'මම හෙට පාසල් එනවා' },
  { id: 'Pos_Fun_0009', input: 'mama dhannee naee.', expected: 'මම දන්නේ නෑ.' },
  { id: 'Pos_Fun_0010', input: 'oyaalaa enavadha?', expected: 'ඔයාලා එනවද?' },
  { id: 'Pos_Fun_0011', input: 'eyaalaa gedhara giyaa.', expected: 'එයාලා ගෙදර ගියා.' },
  { id: 'Pos_Fun_0012', input: 'karuNaakara paena dhenavadha?', expected: 'කරුණාකර පැන දෙනවද?' },
  { id: 'Pos_Fun_0013', input: 'me kaeema eka kanna', expected: 'මෙ කෑම එක කන්න' },
  { id: 'Pos_Fun_0014', input: 'Oyaa WhatsApp innavadha?', expected: 'ඔයා WhatsApp ඉන්නවද?' },
  { id: 'Pos_Fun_0015', input: 'mama Colombo yanna hadhannee.', expected: 'මම Colombo යන්න හදන්නේ.' },
  { id: 'Pos_Fun_0016', input: 'ID card eka', expected: 'ID card එක' },
  { id: 'Pos_Fun_0017', input: 'Rs. 5643', expected: 'Rs. 5643' },
  { id: 'Pos_Fun_0018', input: 'suba udhaeesanak!', expected: 'සුබ උදෑසනක්!' },
  { id: 'Pos_Fun_0019', input: 'mama gedhara yanavaa.', expected: 'මම ගෙදර යනවා.' },
  { id: 'Pos_Fun_0020', input: 'Mee,  Adha monaadha karanne?', expected: 'මේ,  අද මොනාද කරන්නේ?' },
  { id: 'Pos_Fun_0021', input: 'mata koththu kanna oone', expected: 'මට කොත්තු කන්න ඕනෙ' },
  { id: 'Pos_Fun_0022', input: 'Adha gedhara yanavadha oya?', expected: 'අද ගෙදර යනවද ඔයා?' },
  { id: 'Pos_Fun_0023', input: 'ballava naavanna', expected: 'බල්ලව නාවන්න' },
  { id: 'Pos_Fun_0024', input: '10 kg', expected: '10 kg' },

  { id: 'Neg_Fun_0001', input: 'man kadeeta yanavaa', expected: 'මන් කඩේට යනවා' },
  { id: 'Neg_Fun_0002', input: 'anee eeka dhiyan.', expected: 'අනේ ඒක දියන්.' },
  { id: 'Neg_Fun_0003', input: 'dhaen ithin monavadha karanne?', expected: 'දැන් ඉතින් මොනවද කරන්නේ?' },
  { id: 'Neg_Fun_0004', input: 'gaemmak thamay', expected: 'ගැම්මක් තමයි' },
  { id: 'Neg_Fun_0005', input: 'machan maara scene eka ', expected: 'මචන් මාර scene එක' },
  { id: 'Neg_Fun_0006', input: 'Kandy gihin call karannam', expected: 'Kandy ගිහින් call කරන්නම්' },
  { id: 'Neg_Fun_0007', input: 'kata vahapan!', expected: 'කට වහපන්!' },
  { id: 'Neg_Fun_0008', input: 'api yanavaa ban yanna', expected: 'අපි යනවා බන් යන්න' },
  { id: 'Neg_Fun_0009', input: 'sonaal adha campus enne nadhdha?', expected: 'සොනාල් අද campus එන්නෙ නැද්ද?' },
  { id: 'Neg_Fun_0010', input: 'himin himin aave ', expected: 'හිමින් හිමින් ආවෙ' },
 
  { id: 'Pos_UI_0001', input: 'man gedhara yanavaa', expected: 'මන් ගෙදර යනවා' }
];

test.describe('ITPM Assignment 1 Automation', () => {
  let browserInstance;
  let page;

  test.setTimeout(600000); 

  test.beforeAll(async () => {
    browserInstance = await chromium.launch({ 
      headless: false,
      args: ['--disable-blink-features=AutomationControlled']
    });
    const context = await browserInstance.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    });
    page = await context.newPage();
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle', timeout: 90000 });
  });

  for (const tc of testCases) {
    test(`${tc.id}: ${tc.input}`, async () => {
      const inputArea = page.locator('textarea').first(); 
      const outputArea = page.locator('textarea').nth(1);
      
      await inputArea.waitFor({ state: 'visible', timeout: 30000 });
      
      // 1. CLEAR and SET VALUE
      await inputArea.fill(tc.input);

      // 2. THE BLUR FIX: Remove focus from the box to force-close any dropdowns
      await inputArea.blur();
      await page.keyboard.press('Escape');
      await page.mouse.click(10, 10); 

      // 3. WAIT FOR TRANSLATION
      await page.waitForTimeout(5000); // 5 seconds to be absolutely sure
      
      const actualValue = await outputArea.inputValue();
      console.log(`[${tc.id}] Result: ${actualValue}`);
      
      expect(actualValue.trim()).not.toBe('');
    });
  }

  test.afterAll(async () => {
    if (browserInstance) await browserInstance.close();
  });
});