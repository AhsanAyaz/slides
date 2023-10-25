const fs = require('fs');
const path = require('path');

const listFilesInDirectory = (directory, fileNames) => {
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFilesInDirectory(filePath, fileNames);
    } else {
      fileNames.push(filePath);
    }
  });
}

const extractSlideData = async () => {
  const talksPath = path.resolve("../talks/");
  const dataPath = path.resolve("../data/slides.json")
  const htmlFilter = /\.html$/;
  const folderFilter = /\./;

    fs.readdir(talksPath, (err, files) => {
      try {
        let talks = files.filter(file => {
          if(!folderFilter.test(file)) {
            const fileNames = [];
            listFilesInDirectory(talksPath + "/" + file, fileNames);

            return fileNames.some(file => htmlFilter.test(file));
          }

          return htmlFilter.test(file);
        })

        talks = talks.map(file => {
          return {link: file, title: file};
        });
        const jsonTalks = JSON.stringify(talks);
        fs.writeFileSync(dataPath, jsonTalks);
      } catch {
        console.log(err)
      }
    });
}
  
extractSlideData();