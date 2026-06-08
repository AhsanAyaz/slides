// Counts horizontal (`---`) and vertical (`--`) slide breaks in a reveal.js
// markdown deck. Used as the inner-loop demo for the agy crash course.

function countBreaks(markdown) {
  const lines = markdown.split('\n');
  let horizontal = 0;
  let vertical = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '---') {
      horizontal++;
    } else if (trimmed === '--') {
      vertical++;
    }
  }

  return { horizontal, vertical };
}

module.exports = { countBreaks };
