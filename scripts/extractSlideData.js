const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const getGitCommitDate = (filePath) => {
  try {
    const stdout = execSync(`git log -1 --format="%as" -- "${filePath}"`, { encoding: 'utf8' }).trim();
    if (stdout) return stdout;
  } catch (err) {
    // fallback
  }
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
};

const listFilesInDirectory = (directory, fileNames) => {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFilesInDirectory(filePath, fileNames);
    } else {
      fileNames.push(filePath);
    }
  });
};

const extractTitle = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const titleRegex = /<title>\s*([\s\S]*?)\s*<\/title>/i;
    const match = data.match(titleRegex);

    if (match) {
      const titleContent = match[1];
      return titleContent;
    } else {
      console.log({ data });
      return '';
    }
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

const extractMetadata = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    
    // Extract Title
    const titleRegex = /<title>\s*([\s\S]*?)\s*<\/title>/i;
    const titleMatch = data.match(titleRegex);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract Venue
    const venueRegex = /<meta\s+name=["']venue["']\s+content=["']([\s\S]*?)["']/i;
    const venueRegexAlt = /<meta\s+content=["']([\s\S]*?)["']\s+name=["']venue["']/i;
    const venueMatch = data.match(venueRegex) || data.match(venueRegexAlt);
    const venue = venueMatch ? venueMatch[1].trim() : '';

    // Extract Date
    const dateRegex = /<meta\s+name=["']date["']\s+content=["']([\s\S]*?)["']/i;
    const dateRegexAlt = /<meta\s+content=["']([\s\S]*?)["']\s+name=["']date["']/i;
    const dateMatch = data.match(dateRegex) || data.match(dateRegexAlt);
    let date = dateMatch ? dateMatch[1].trim() : '';

    // Fallback date to file git log or modification time if meta date not provided
    if (!date) {
      date = getGitCommitDate(filePath);
    }

    // Extract Tags
    const tagsRegex = /<meta\s+name=["']tags["']\s+content=["']([\s\S]*?)["']/i;
    const tagsRegexAlt = /<meta\s+content=["']([\s\S]*?)["']\s+name=["']tags["']/i;
    const tagsMatch = data.match(tagsRegex) || data.match(tagsRegexAlt);
    const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim()).filter(Boolean) : [];

    // Extract Description
    const descRegex = /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i;
    const descRegexAlt = /<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']/i;
    const descMatch = data.match(descRegex) || data.match(descRegexAlt);
    const description = descMatch ? descMatch[1].trim() : '';

    return { title, venue, date, tags, description };
  } catch (err) {
    console.log(`Error extracting metadata from ${filePath}: ${err.message}`);
    return { title: '', venue: '', date: '', tags: [], description: '' };
  }
};

const extractSlideData = (folderName) => {
  try {
    const talksPath = path.resolve(folderName);
    const files = fs.readdirSync(talksPath);

    const indexFilter = /index\.html$/;
    const htmlFilter = /\.html$/;
    const folderFilter = /\./;

    let talks = [];
    files.forEach((file) => {
      if (!folderFilter.test(file)) {
        const fileNames = [];
        listFilesInDirectory(path.join(talksPath, file), fileNames);

        return fileNames.forEach((file) => {
          if (indexFilter.test(file)) {
            talks.push(file.replace(talksPath, '').substring(1));
          }
        });
      }

      if (htmlFilter.test(file)) {
        talks.push(file);
      }
    });

    talks = talks.map((link) => {
      if (htmlFilter.test(link)) {
        const meta = extractMetadata(path.join(talksPath, link));
        return { link, ...meta };
      }

      const filePath = path.join(talksPath, link, 'index.html');

      if (fs.existsSync(filePath)) {
        const meta = extractMetadata(filePath);
        return { link, ...meta };
      }
    });

    const jsonTalks = JSON.stringify(talks);
    return jsonTalks;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const saveSlideData = () => {
  try {
    const jsonTalks = extractSlideData('talks');
    const dataPath = path.resolve(path.join('data', 'slides.json'));
    fs.writeFileSync(dataPath, jsonTalks);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

saveSlideData();

module.exports = { extractTitle, extractSlideData, listFilesInDirectory };
