import {
  copyFile,
  createAndUpdateFile,
  createFolder,
  getTemplateDir,
  updateFileContent,
  writeToFile
} from './filemanager.js';
import { AppModuleContent } from '../../templates/backend/nestjs/base/app-module.js';
import path from 'path';
import {MongodbDatabaseConfig, MongodbSchema} from '../../templates/backend/nestjs/base/databases.js';
import {
  NEST_MONGOOSE_PACKAGE,
  NEST_PACKAGE_JSON
} from '../../templates/backend/nestjs/base/nestjs-package-json.js';
import { ENVIRONMENT_TEMPLATE } from '../../templates/backend/nestjs/base/environment.js';
import { EXPRESSJS_SERVER_TEMPLATE } from '../../templates/backend/expressjs/base/server.js';
import {
  ExpressJsMongodbMongooseConnectionTemplate,
  ExpressJsMongoDbMongooseSampleSchema
} from '../../templates/backend/expressjs/base/database.js';
import { ExpressJsPackageJsonTemplate } from '../../templates/backend/expressjs/base/package-json.js';
import { ExpressJsEnvironmentTemplate } from '../../templates/backend/expressjs/base/config.js';
import ora from 'ora';

/**
 * loader
 */
let stages = [{ message: 'Creating Project ...', duration: 2000 }];

async function startSpinner() {
  for (const stage of stages) {
    const spinner = ora(stage.message).start();
    await new Promise((resolve) => setTimeout(resolve, stage.duration));
    spinner.succeed(stage.message.replace('...', ' completed.'));
  }

  stages = [{ message: 'Creating Project ...', duration: 2000 }];
}

/**
 * function to create backend projects
 */

export async function createBackendProject(
  projectName,
  framework,
  database,
  orm
) {
  try {
    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`
    );

    if (framework === 'nestjs') {
      let appModules = '';
      let appModuleImports = '';
      let packageJson = NEST_PACKAGE_JSON;
      let environmentInterface = '';
      let environmentContent = '';

      // copy nestjs template to directory
      copyFile(getTemplateDir('backend/nestjs/nestjs-temp'), destinationPath);

      // update app module file content
      writeToFile(`${destinationPath}/src/app.module.ts`, AppModuleContent);

      // add environment file
      writeToFile(
        `${destinationPath}/src/common/configs/environment.ts`,
        ENVIRONMENT_TEMPLATE
      );

      if (database) {
        stages.push({ message: 'Adding Database Module ...', duration: 1000 });

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
                environmentInterface += `\nDB: {
    URL: string;}`;
                environmentContent += `\n  DB: {
    URL: process.env.DB_URL,}`;

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
      stages.push({
        message: `Backend project created successfully! : ${destinationPath}`,
        duration: 1000
      });

      await startSpinner();
    } else if (framework === 'expressjs') {
      let database_config = '';
      let database_config_import = '';
      let additional_environment_variables = '';
      let packageJson = ExpressJsPackageJsonTemplate;

      // copy expressjs template to directory
      copyFile(
        getTemplateDir('backend/expressjs/expressjs-temp'),
        destinationPath
      );

      // add server.js file
      writeToFile(
        `${destinationPath}/src/server.js`,
        EXPRESSJS_SERVER_TEMPLATE
      );

      if (database) {
        stages.push({ message: 'Adding Database Module ...', duration: 1000 });

        // create schema folder
        createFolder(`${destinationPath}/src/modules/schemas`);

        switch (database) {
          case 'mongodb':
            switch (orm) {
              case 'mongoose':
              default:
                // create db config file
                createAndUpdateFile(
                  `${destinationPath}/src/common/config/database.js`,
                  ExpressJsMongodbMongooseConnectionTemplate
                );

                // create sample schema file
                createAndUpdateFile(
                  `${destinationPath}/src/modules/schemas/sample.schema.js`,
                  ExpressJsMongoDbMongooseSampleSchema
                );

                // update database config for server js file
                database_config_import = `import { connectDb } from "./common/config/database.js";`;
                database_config = ` connectDb()`;

                // update packageJson
                packageJson.dependencies = {
                  ...packageJson.dependencies,
                  mongoose: '^7.5.2'
                };

                // update db config
                additional_environment_variables += `DB: {
                    URL: process.env.DB_URL
                }`;
            }
        }
      }

      // update server template
      updateFileContent(
        `${destinationPath}/src/server.js`,
        EXPRESSJS_SERVER_TEMPLATE,
        {
          database_config,
          database_config_import
        }
      );

      // add and update config file
      updateFileContent(
        `${destinationPath}/src/common/config/environment.js`,
        ExpressJsEnvironmentTemplate,
        { additional_environment_variables }
      );

      // add package json file
      createAndUpdateFile(
        `${destinationPath}/package.json`,
        JSON.stringify(ExpressJsPackageJsonTemplate)
      );

      // success message
      stages.push({
        message: `Backend project created successfully! : ${destinationPath}`,
        duration: 1000
      });

      await startSpinner();
    }
  } catch (e) {
    console.log(`Error Creating Backend Project: ${e}`);
  }
}
