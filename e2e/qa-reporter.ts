import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { stripVTControlCharacters } from 'node:util';

/**
 * Flat QA table: one row per test with expected vs actual.
 * Expected = test title, unless the test adds `test.info().annotations.push({ type: 'expected', description })`.
 * Actual = "as expected" on pass, otherwise the Expected/Received lines from the failing assertion
 * (override with an `actual` annotation).
 */
const OUTPUT = 'test-results/qa-report.json';

type Row = {
  testId: string;
  project: string;
  module: string;
  test: string;
  expected: string;
  actual: string;
  status: TestResult['status'] | 'known-bug';
  durationMs: number;
  screenshot?: string;
};

function failureDetail(result: TestResult): string {
  const msg = stripVTControlCharacters(result.error?.message ?? '').split('Call log:')[0];
  const lines = msg.split('\n').map((l) => l.trim().replace(/^Error: /, '')).filter(Boolean);
  const keep = lines.filter(
    (l, i) =>
      (i === 0 && !l.startsWith('expect(')) || // custom assertion message
      /^(Expected|Received|Locator|Timeout)\b/.test(l) || // toHaveTitle-style
      (/^[-+] /.test(l) && !/^[-+] (Expected|Received) /.test(l)) // toEqual-style diff body
  );
  return (keep.length ? keep : lines.slice(0, 3)).join(' | ') || result.status;
}

export default class QaReporter implements Reporter {
  private rows = new Map<string, Row>();

  onTestEnd(test: TestCase, result: TestResult) {
    const note = (type: string) => test.annotations.find((a) => a.type === type)?.description;
    const [, project, , ...describe] = test.titlePath();
    const passed = result.status === 'passed' || result.status === 'skipped';
    // test.fail() marks an open bug: it fails as expected, so it's not a suite failure.
    const knownBug = test.expectedStatus === 'failed' && result.status === 'failed';
    const shot = result.attachments.find((a) => a.name === 'screenshot')?.path;
    // Keyed by test id, so a retry overwrites the earlier attempt.
    this.rows.set(test.id, {
      testId: test.id,
      project,
      module: [relative(process.cwd(), test.location.file), ...describe.slice(0, -1)].join(' › '),
      test: test.title,
      expected: note('expected') ?? test.title,
      actual:
        note('actual') ??
        (passed
          ? ['as expected', ...test.annotations.filter((a) => a.type === 'known-bug').map((a) => `known bug ignored: ${a.description}`)].join(' | ')
          : failureDetail(result)),
      status: knownBug ? 'known-bug' : result.status,
      durationMs: result.duration,
      screenshot: shot && relative(process.cwd(), shot),
    });
  }

  onEnd() {
    const rows = [...this.rows.values()];
    const count = (s: string) => rows.filter((r) => r.status === s).length;
    const summary = {
      total: rows.length,
      passed: count('passed'),
      failed: rows.length - count('passed') - count('skipped') - count('known-bug'),
      knownBugs: count('known-bug'),
      skipped: count('skipped'),
    };
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, JSON.stringify({ summary, results: rows }, null, 2));
    console.log(
      `\nQA report: ${OUTPUT} (${summary.passed}/${summary.total} passed, ${summary.failed} failed, ${summary.knownBugs} known bugs)`
    );
  }
}
