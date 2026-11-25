/**
 * The one identity every form test submits with. Obviously fake on purpose, so if a test
 * submission ever reaches a real inbox, HR can tell at a glance it is not a real lead.
 * EmailJS is mocked (helpers/mock-emailjs.ts), so nothing should be sent in the first place.
 */
export const TEST_LEAD = {
  firstName: 'Playwright',
  lastName: 'Tester One',
  // Letters only: /contact rejects digits in the name field.
  name: 'Playwright Tester One',
  // example.com is reserved (RFC 2606): it can never be a real inbox.
  email: 'playwright.tester1@example.com',
  // 202 is a valid DC area code; 555-01xx is reserved for fictional use in the NANP.
  phone: '+12025550143',
  jobOrWebsite: '[PLAYWRIGHT TEST] Automated test, please ignore',
  subject: '[PLAYWRIGHT TEST] Automated test, please ignore',
  message: '[PLAYWRIGHT TEST] Automated Playwright submission. Not a real enquiry, please ignore.',
} as const;
