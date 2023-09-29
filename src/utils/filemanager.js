import fs from 'fs-extra';
import * as path from 'path';

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

// Example usage:
const filePath = 'path/to/your/file.ts';

const newContent = `
import { Module } from '@nestjs/common';
{{database_module_import_path}}

@Module({
  imports: [
    {{database_module_config}}
  ],
})
export class DatabaseModule {}
`;

const datas = {
  database_module_import_path:
    "import { MongooseModule } from '@nestjs/mongoose';",
  database_module_config: 'MongooseModule.forRoot(ENVIRONMENT.DB.URL)'
};

// updateFileContent(filePath, newContent, datas);

export function removeFile(filePath) {
  try {
    fs.unlink(filePath);
    console.log(`File '${filePath}' has been removed successfully.`);
  } catch (err) {
    console.error(`Error removing file '${filePath}': ${err}`);
  }
}

export function removeFolder(folderPath) {
  try {
    fs.remove(folderPath);
    console.log(`Folder '${folderPath}' has been removed successfully.`);
  } catch (err) {
    console.error(`Error removing folder '${folderPath}': ${err}`);
  }
}

export function writeToFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('writeToFile success');
  } catch (err) {
    console.log(`writeToFile error ${filePath}, error: ${err}`);
  }
}

export async function copyFile(source, destination) {
  // destination = path.join(process.cwd(), destination);
  await fs.copySync(source, destination, {
    filter: (src, dest) => {
      const relativePath = path.relative(source, src);

      if (relativePath.startsWith('node_modules')) {
        return false;
      }

      return true;
    }
  });
}

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

    console.log('Data successfully written onto the file');
    console.log('Written data is: ');
    //   Reading data after writing on file
    console.log(fs.readFileSync(path, 'utf-8'));
  });
}
