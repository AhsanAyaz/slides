const fs = require('fs');
const path = require('path');
const {
  listFilesInDirectory,
  extractTitle,
  extractSlideData,
} = require('../scripts/extractSlideData');

describe('listFilesInDirectory', () => {
  it('should list all files in the directory', () => {
    const fileNames = [];
    listFilesInDirectory(path.join('test', 'assets'), fileNames);
    expect(fileNames).toStrictEqual([
      path.join('test', 'assets', 'external-script-a.js'),
      path.join('test', 'assets', 'external-script-b.js'),
      path.join('test', 'assets', 'external-script-c.js'),
      path.join('test', 'assets', 'external-script-d.js'),
      path.join('test', 'assets', 'index.html'),
    ]);
  });
});

describe('extractTitle', () => {
  it('should extract title from HTML content', () => {
    const title = extractTitle(path.join('test', 'test.html'));
    expect(title).toBe('reveal.js - Tests');
  });

  it('should extract title from nested HTML content', () => {
    const title = extractTitle(path.join('test', 'nested', 'index.html'));
    expect(title).toBe('reveal.js - Nested Tests');
  });
});

describe('extractSlideData', () => {
  it("should get html files' names and titles as JSON", () => {
    const data = extractSlideData(path.join('test', 'assets'));
    expect(JSON.parse(data)).toStrictEqual([
      { link: 'index.html', title: 'reveal.js - Simple Tests' },
    ]);
  });

  it("should recursively get all index.html files' names and titles as JSON", () => {
    const data = extractSlideData(path.join('test', 'nested'));
    expect(JSON.parse(data)).toStrictEqual([
      { link: 'index.html', title: 'reveal.js - Nested Tests' },
      {
        link: path.join('very-nested', 'index.html'),
        title: 'reveal.js - Very Nested Tests',
      },
      {
        link: path.join('very-nested', 'mega-nested', 'index.html'),
        title: 'reveal.js - Mega Nested Tests',
      },
    ]);
  });

  it('should get empty JSON if no html in folder', () => {
    const data = extractSlideData(path.join('test', 'no-content'));
    expect(JSON.parse(data)).toStrictEqual([]);
  });
});
