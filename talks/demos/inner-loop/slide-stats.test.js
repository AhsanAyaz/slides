const assert = require('node:assert/strict');
const { countBreaks } = require('./slide-stats');

const deck = [
  '# Title',
  '',
  '---',
  '',
  '## Slide 1',
  '',
  '--',
  '',
  '## Sub-slide',
  '',
  '---',
  '',
  '## Slide 2 with code',
  '',
  '```bash',
  '# example showing slide separators in docs',
  '---',
  '--',
  '```',
  '',
].join('\n');

const counts = countBreaks(deck);

assert.equal(
  counts.horizontal,
  2,
  `horizontal: expected 2 (separators outside code fences), got ${counts.horizontal}`,
);
assert.equal(
  counts.vertical,
  1,
  `vertical: expected 1 (separators outside code fences), got ${counts.vertical}`,
);

console.log('OK — slide-stats counts breaks correctly');
