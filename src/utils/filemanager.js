import fs from 'fs-extra';
import * as path from 'path';

/**
 * checks if a directory is empty
 */
export function isDirectoryEmpty(dir) {
  try {
    return fs.readdirSync(dir).length === 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * empty a directory
 */
export function emptyDirectory(path, cb = null) {
  // check if node module folder exist and remove firstly
  if (fs.existsSync(`${path}/node_modules`)) {
    fs.removeSync(`${path}/node_modules`);
  }

  fs.emptyDirSync(path);

  cb && cb();
}

/**
 * update file content using template string {{sample}} 
 * it replaces with data passed in the datas argument . 
 * this would delete any {{sample}} that is not sent in datas
 */
export function updateFileContent(filePath, newContent, datas) {
  try {
    // Replace placeholders like {{template_string}} with values from datas
    const updatedContent = newContent.replace(/{{\s*[\w.]+\s*}}/g, (match) => {
      const key = match.replace(/[{}]/g, '').trim();

      if (datas[key] !== undefined) {
        return datas[key];
      }

      return match; // If the dynamic data doesn't exist, keep the placeholder
    });

    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf8');

    console.log(`File '${filePath}' has been updated successfully.`);
  } catch (err) {
    console.error(`Error updating file '${filePath}': ${err}`);
  }
}

/**
 * removes a file 
 * @param {*} filePath 
 */
export function removeFile(filePath) {
  try {
    fs.unlink(filePath);
    console.log(`File '${filePath}' has been removed successfully.`);
  } catch (err) {
    console.error(`Error removing file '${filePath}': ${err}`);
  }
}

/**
 * removes a folder 
 * @param {*} folderPath 
 */
export function removeFolder(folderPath) {
  try {
    fs.remove(folderPath);
    console.log(`Folder '${folderPath}' has been removed successfully.`);
  } catch (err) {
    console.error(`Error removing folder '${folderPath}': ${err}`);
  }
}

/**
 * add content to a file 
 * @param {*} filePath 
 * @param {*} content 
 */
export function writeToFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('writeToFile success');
  } catch (err) {
    console.log(`writeToFile error ${filePath}, error: ${err}`);
  }
}

/**
 * copy file content to another file
 * @param {*} source 
 * @param {*} destination 
 */
export function copyFile(source, destination) {
  // destination = path.join(process.cwd(), destination);
  fs.copySync(source, destination, {
    filter: (src, dest) => {
      const relativePath = path.relative(source, src);

      if (relativePath.startsWith('node_modules')) {
        return false;
      }

      return true;
    }
  });
}

/**
 * create file if not exist and add content
 * @param {*} path 
 * @param {*} content 
 */
export function createAndUpdateFile(path, content) {
  // fs.writeFile(path, content, (err) => {
  //   if (err) {
  //     console.log(`createAndUpdateFile err : ${er}`);
  //   } else {
  //     console.log(`createAndUpdateFile success`);
  //   }
  // });

  fs.outputFile(path, content, (err) => {
    if (err) return console.log(err);

    console.log('Data successfully written onto the file', path);
    console.log('Written data is: ');
    //   Reading data after writing on file
    console.log(fs.readFileSync(path, 'utf-8'));
  });
}

/**
 * create folder 
 * @param {*} path 
 */
export function createFolder(path) {
  fs.ensureDir(path, (err) => {
    if (err) {
      console.log(`createFolder success`);
    } else {
      console.log(`createFolder err : ${err}`);
    }
  });
}
