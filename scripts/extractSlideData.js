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
    return err.message;
  }
};

const extractSlideData = async () => {
  const talksPath = path.resolve('talks/');
  const dataPath = path.resolve('data/slides.json');
  const htmlFilter = /\.html$/;
  const folderFilter = /\./;

  fs.readdir(talksPath, (err, files) => {
    try {
      let talks = files.filter((file) => {
        if (!folderFilter.test(file)) {
          const fileNames = [];
          listFilesInDirectory(talksPath + '/' + file, fileNames);

          return fileNames.some((file) => htmlFilter.test(file));
        }

        return htmlFilter.test(file);
      });

      talks = talks.map((file) => {
        return { link: file, title: file };
      });

      const titles = talks.map(({ link }) => {
        if (htmlFilter.test(link)) {
          const title = extractTitle(`${talksPath}/${link}`);
          return { link, title };
        }

        if (!htmlFilter.test(link)) {
          const filePath = `${talksPath}/${link}/index.html`;

          if (fs.existsSync(filePath)) {
            const title = extractTitle(filePath);
            return { link, title };
          }
        }
      });

      const jsonTalks = JSON.stringify(titles);
      fs.writeFileSync(dataPath, jsonTalks);
    } catch {
      console.log(err);
    }
  });
};

extractSlideData();
