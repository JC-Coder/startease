import fs from 'fs-extra';

export function isDirectoryEmpty(dir) {
  try {
    return fs.readdirSync(dir).length === 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function emptyDirectory(path, cb = null) {
  // check if node module folder exist and remove firstly
  if (fs.existsSync(`${path}/node_modules`)) {
    fs.removeSync(`${path}/node_modules`);
  }

  fs.emptyDirSync(path);

  cb && cb();
}
