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
