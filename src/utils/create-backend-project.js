import { MongodbDatabaseConfig } from './nestjs/database.js';
import {
  copyFile,
  createAndUpdateFile,
  removeFile,
  removeFolder,
  updateFileContent,
  writeToFile
} from './filemanager.js';
import { AppModuleContent } from '../../templates/backend/nestjs/base/app-module.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import fs from 'fs-extra';
import { MongodbSchema } from '../../templates/backend/nestjs/base/databases.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program.parse(process.argv);

const getTemplateDir = (filePath) => {
  return path.join(__dirname, '..', '../templates', filePath);
};

export async function createBackendProject(
  destination,
  projectName,
  framework,
  database,
  orm
) {
  console.log('creating backend project');
  const destinationPath = path.join(process.cwd(), projectName ?? `project-starter-${framework}-template`);

  console.log('destinationPath', destinationPath);

  if (framework == 'nestjs') {
    let appModules = '';
    let appModuleImports = '';

    // copy nestjs template to directory
    copyFile(getTemplateDir('backend/nestjs/nestjs'), destinationPath);

    if (database) {
      switch (database) {
        case 'mongodb':
          switch (orm) {
            case 'mongoose':
              // write db config
              writeToFile(
                `${destinationPath}/src/module/v1/database/database.module.ts`,
                MongodbDatabaseConfig
              );

              // create sample schema file for db
              createAndUpdateFile(
                `${destinationPath}/src/module/v1/database/sample.schema.ts`,
                MongodbSchema
              );

              appModules += 'DatabaseModule';
              appModuleImports +=
                'import { DatabaseModule } from "./module/v1/database/database.module";';
              break;
          }
          break;
      }

      // update app module
      updateFileContent(
        `${destinationPath}/src/app.module.ts`,
        AppModuleContent,
        {
          database_module_path: appModuleImports,
          database_module: appModules
        }
      );
    } else {
      // removeFolder(`${destination}/src/module/v1/testdb`);
    }

    // if (database && database == 'mongodb') {
    //   if (orm === 'mongoose') {
    //     writeToFile(destination, MongodbDatabaseConfig());
    //     appModules += ',DatabaseModule';
    //     appModuleImports +=
    //       'import { DatabaseModule } from "./module/v1/database/database.module";';
    //   }
    // }
  }
}
