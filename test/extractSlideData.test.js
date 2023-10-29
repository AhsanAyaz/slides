const fs = require('fs');
const path = require('path');
const {
listFilesInDirectory,
  extractTitle,
  extractSlideData
} = require('../scripts/extractSlideData'); 

describe('extractTitle', () => {
    it('should extract title from HTML content', () => {
        const title = extractTitle('test/test.html');
        expect(title).toBe('reveal.js - Tests'); 
    });
});

describe('listFilesInDirectory', () => {
    it('should list all files in the directory', () => {
      const fileNames = [];
      listFilesInDirectory('test/assets', fileNames);
      expect(fileNames).toEqual(["test/assets/external-script-a.js", "test/assets/external-script-b.js","test/assets/external-script-c.js","test/assets/external-script-d.js"])
    });
  });

