// Counts horizontal (`---`) and vertical (`--`) slide breaks in a reveal.js
// markdown deck. Used as the inner-loop demo for the agy crash course.

function countBreaks(markdown) {
  const lines = markdown.split('\n');
  let horizontal = 0;
  let vertical = 0;
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (trimmed === '---') {
      horizontal++;
    } else if (trimmed === '--') {
      vertical++;
    }
  }

  return { horizontal, vertical };
}

module.exports = { countBreaks };
