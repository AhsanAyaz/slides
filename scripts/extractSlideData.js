const fs = require('fs');
const path = require('path');

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
    const titleRegex = /<title>(.*?)<\/title>/;
    const match = data.match(titleRegex);

    if (match) {
      const titleContent = match[1];
      return titleContent;
    } else {
      return '';
    }
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

const extractSlideData = (folderName) => {
  try {
    const talksPath = path.resolve(folderName);
    const files = fs.readdirSync(talksPath);
    const htmlFilter = /\.html$/;
    const folderFilter = /\./;

    let talks = files.filter((file) => {
      if (!folderFilter.test(file)) {
        const fileNames = [];
        listFilesInDirectory(path.join(talksPath, file), fileNames);

        return fileNames.some((file) => htmlFilter.test(file));
      }

      return htmlFilter.test(file);
    });

    talks = talks.map((file) => {
      return { link: file, title: file };
    });

    const titles = talks.map(({ link }) => {
      if (htmlFilter.test(link)) {
        const title = extractTitle(path.join(talksPath, link));
        return { link, title };
      }

      if (!htmlFilter.test(link)) {
        const filePath = path.join(talksPath, link, 'index.html');

        if (fs.existsSync(filePath)) {
          const title = extractTitle(filePath);
          return { link, title };
        }
      }
    });

    const jsonTalks = JSON.stringify(titles);
    return jsonTalks;
  } catch (err) {
    console.log(err);
  }
};

const saveSlideData = () => {
  try {
    const jsonTalks = extractSlideData('talks');
    const dataPath = path.resolve(path.join('data', 'slides.json'));
    fs.writeFileSync(dataPath, jsonTalks);
  } catch (err) {
    console.log(err);
  }
};

saveSlideData();

module.exports = { extractTitle, extractSlideData, listFilesInDirectory };
