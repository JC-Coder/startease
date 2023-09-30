import { MongodbDatabaseConfig } from './nestjs/database.js';
import {
  copyFile,
  createAndUpdateFile,
  getTemplateDir,
  removeFile,
  removeFolder,
  updateFileContent,
  writeToFile
} from './filemanager.js';
import { AppModuleContent } from '../../templates/backend/nestjs/base/app-module.js';
import path from 'path';
import { MongodbSchema } from '../../templates/backend/nestjs/base/databases.js';
import {
  NEST_MONGOOSE_PACKAGE,
  NEST_PACKAGE_JSON
} from '../../templates/backend/nestjs/base/nestjs-package-json.js';
import { ENVIRONMENT_TEMPLATE } from '../../templates/backend/nestjs/base/environment.js';

export async function createBackendProject(
  projectName,
  framework,
  database,
  orm
) {
  try {
    console.log('creating backend project');
    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`
    );

    // update app module file content
    writeToFile(`${destinationPath}/src/app.module.ts`, AppModuleContent);

    if (framework === 'nestjs') {
      let appModules = '';
      let appModuleImports = '';
      let packageJson = NEST_PACKAGE_JSON;
      let environmentInterface = '';
      let environmentContent = '';

      // copy nestjs template to directory
      copyFile(getTemplateDir('backend/nestjs/nestjs-temp'), destinationPath);

      // add config file
      createAndUpdateFile(
        `${destinationPath}/src/common/configs/environment.ts`,
        ENVIRONMENT_TEMPLATE
      );

      if (database) {
        switch (database) {
          case 'mongodb':
            switch (orm) {
              case 'mongoose':
                // write db config
                createAndUpdateFile(
                  `${destinationPath}/src/module/v1/database/database.module.ts`,
                  MongodbDatabaseConfig
                );

                // create sample schema file for db
                createAndUpdateFile(
                  `${destinationPath}/src/module/v1/database/sample.schema.ts`,
                  MongodbSchema
                );

                // add mongoose dependencies
                packageJson.dependencies = {
                  ...packageJson.dependencies,
                  ...NEST_MONGOOSE_PACKAGE.dependencies
                };

                // update environment
                environmentInterface += `hello: string`;
                environmentContent += `hello: 'world'`;

                // update app module
                appModules += 'DatabaseModule';
                appModuleImports +=
                  'import { DatabaseModule } from "./module/v1/database/database.module";';
                break;
              default:
                packageJson.dependencies = {
                  ...packageJson.dependencies,
                  ...NEST_PACKAGE_JSON.dependencies
                };
                break;
            }
            break;
        }

        // update app module
        updateFileContent(
          `${destinationPath}/src/app.module.ts`,
          AppModuleContent,
          {
            new_modules_path: appModuleImports,
            new_modules: appModules
          }
        );

        console.log({ environmentInterface, environmentContent });

        // update environment config file
        updateFileContent(
          `${destinationPath}/src/common/configs/environment.ts`,
          ENVIRONMENT_TEMPLATE,
          {
            environment_interface: environmentInterface,
            environment_content: environmentContent
          }
        );
      }

      // update packageJsonFile
      createAndUpdateFile(
        `${destinationPath}/package.json`,
        JSON.stringify(packageJson)
      );

      // success message
      console.log(`Backend project created successfully! : ${destinationPath}`);
    }
  } catch (e) {
    console.log(`Error Creating Backend Project: ${e}`);
  }
}
