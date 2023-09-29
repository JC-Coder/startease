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

const getDestination = (projectName) => {
  path.join(process.cwd(), projectName ?? `project-starter-demo-template`);
};

export async function createBackendProject(
  destination,
  projectName,
  framework,
  database,
  orm
) {
  console.log('creating backend project');
  const destinationPath = path.join(process.cwd(), projectName);

  console.log(destinationPath);

  if (framework == 'nestjs') {
    let appModules = '';
    let appModuleImports = '';

    console.log(getTemplateDir('backend'));

    // copy nestjs template to directory
    await copyFile(getTemplateDir('backend/nestjs/nestjs'), destinationPath);

    if (database) {
      switch (database) {
        case 'mongodb':
          // remove sample model file
          // removeFile(`${destination}/src/module/v1/database/sample.model.ts`);

          switch (orm) {
            case 'mongoose':
              writeToFile(
                `${destination}/src/module/v1/database/database.module.ts`,
                MongodbDatabaseConfig()
              );
              // await createAndUpdateFile(
              //   `${destination}/src/module/v1/database/new-schema.ts`,
              //   MongodbSchema()
              // );
              writeToFile(`${destination}/src/new-schema.ts`, MongodbSchema());
              appModules += 'DatabaseModule';
              appModuleImports +=
                'import { DatabaseModule } from "./module/v1/database/database.module";';
              break;
          }
          break;
      }

      // update app module
      updateFileContent(
        `${destination}/src/app.module.ts`,
        AppModuleContent(),
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
