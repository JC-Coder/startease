import {
  copyFile,
  createAndUpdateFile,
  createFolder,
  getTemplateDir,
  updateFileContent,
  writeToFile,
} from "./file-manager.js";
import { AppModuleContent } from "../../templates/backend/nestjs/base/app-module.js";
import path from "path";
import {
  MongodbDatabaseConfig,
  MongodbSchema,
} from "../../templates/backend/nestjs/base/databases.js";
import {
  NEST_MONGOOSE_PACKAGE,
  NestjsPackageJsonTemplate,
} from "../../templates/backend/nestjs/base/nestjs-package-json.js";
import { ENVIRONMENT_TEMPLATE } from "../../templates/backend/nestjs/base/environment.js";
import { EXPRESSJS_SERVER_TEMPLATE } from "../../templates/backend/expressjs/base/server.js";
import {
  ExpressJsMongodbMongooseConnectionTemplate,
  ExpressJsMongoDbMongooseSampleSchema,
} from "../../templates/backend/expressjs/base/database.js";
import { ExpressJsPackageJsonTemplate } from "../../templates/backend/expressjs/base/package-json.js";
import { ExpressJsEnvironmentTemplate } from "../../templates/backend/expressjs/base/config.js";
import { DJANGO_MANAGER } from "../../templates/backend/django/base/manage.js";
import { DJANGO_WSGI } from "../../templates/backend/django/base/wsgi.js";
import { DJANGO_ASGI } from "../../templates/backend/django/base/asgi.js";
import { DJANGO_SETTINGS } from "../../templates/backend/django/base/settings.js";
import { DJANGO_ENV_VARIABLES } from "../../templates/backend/django/base/env.js";
import {
  DJANGO_POSTGRES_SETUP,
  DJANGO_SQLITE_SETUP,
} from "../../templates/backend/django/base/database.js";
import ora from "ora";
import shell from "shelljs";
import crypto from "crypto";
import {  processDependenciesInstall } from "./helper.js";
import { sendStat } from "./stat.js";


/**
 * function to create backend projects
 */

export async function createBackendProject(
  projectName,
  framework,
  database,
  orm,
  installDependencies
) {
  const spinner = ora('Creating Project ...').start();
  try {
    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`,
    );

    if (framework === "nestjs") {
      let appModules = "";
      let appModuleImports = "";
      let packageJson = NestjsPackageJsonTemplate;
      let environmentInterface = "";
      let environmentContent = "";

      // copy nestjs template to directory
      copyFile(getTemplateDir("backend/nestjs/nestjs-temp"), destinationPath);

      // update app module file content
      writeToFile(`${destinationPath}/src/app.module.ts`, AppModuleContent);

      // add environment file
      writeToFile(
        `${destinationPath}/src/common/configs/environment.ts`,
        ENVIRONMENT_TEMPLATE,
      );

      if (database) {
        spinner.succeed();
        spinner.start('Adding Database Module ...');

        switch (database) {
          case "mongodb":
            switch (orm) {
              case "mongoose":
                // write db config
                createAndUpdateFile(
                  `${destinationPath}/src/module/v1/database/database.module.ts`,
                  MongodbDatabaseConfig,
                );

                // create sample schema file for db
                createAndUpdateFile(
                  `${destinationPath}/src/module/v1/database/sample.schema.ts`,
                  MongodbSchema,
                );

                // add mongoose dependencies
                packageJson.dependencies = {
                  ...packageJson.dependencies,
                  ...NEST_MONGOOSE_PACKAGE.dependencies,
                };

                // update environment
                environmentInterface += `\nDB: {
    URL: string;}`;
                environmentContent += `\n  DB: {
    URL: process.env.DB_URL,}`;

                // update app module
                appModules += "DatabaseModule";
                appModuleImports +=
                  'import { DatabaseModule } from "./module/v1/database/database.module";';
                break;
              default:
                packageJson.dependencies = {
                  ...packageJson.dependencies,
                  ...NestjsPackageJsonTemplate.dependencies,
                };
                break;
            }
            break;
        }
      }

      // update app module
      updateFileContent(
        `${destinationPath}/src/app.module.ts`,
        AppModuleContent,
        {
          new_modules_path: appModuleImports,
          new_modules: appModules,
        },
      );

      // update environment config file
      updateFileContent(
        `${destinationPath}/src/common/configs/environment.ts`,
        ENVIRONMENT_TEMPLATE,
        {
          environment_interface: environmentInterface,
          environment_content: environmentContent,
        },
      );

      // update packageJsonFile
      createAndUpdateFile(
        `${destinationPath}/package.json`,
        JSON.stringify(packageJson, null, "  "),
      );
    } else if (framework === "expressjs") {
      let database_config = "";
      let database_config_import = "";
      let additional_environment_variables = "";
      let packageJson = ExpressJsPackageJsonTemplate;

      // copy expressjs template to directory
      copyFile(
        getTemplateDir("backend/expressjs/expressjs-temp"),
        destinationPath,
      );

      // add server.js file
      writeToFile(
        `${destinationPath}/src/server.js`,
        EXPRESSJS_SERVER_TEMPLATE,
      );

      if (database) {
        spinner.succeed();
        spinner.start('Adding Database Module ...');

        // create schema folder
        createFolder(`${destinationPath}/src/modules/schemas`);

        switch (database) {
          case "mongodb":
            switch (orm) {
              case "mongoose":
              default:
                // create db config file
                createAndUpdateFile(
                  `${destinationPath}/src/common/config/database.js`,
                  ExpressJsMongodbMongooseConnectionTemplate,
                );

                // create sample schema file
                createAndUpdateFile(
                  `${destinationPath}/src/modules/schemas/sample.schema.js`,
                  ExpressJsMongoDbMongooseSampleSchema,
                );

                // update database config for server js file
                database_config_import = `import { connectDb } from "./common/config/database.js";`;
                database_config = ` connectDb()`;

                // update packageJson
                packageJson.dependencies = {
                  ...packageJson.dependencies,
                  mongoose: "^7.5.2",
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
          database_config_import,
        },
      );

      // add and update config file
      updateFileContent(
        `${destinationPath}/src/common/config/environment.js`,
        ExpressJsEnvironmentTemplate,
        { additional_environment_variables },
      );

      // add package json file
      createAndUpdateFile(
        `${destinationPath}/package.json`,
        JSON.stringify(ExpressJsPackageJsonTemplate, null, "  "),
      );
    } else if (framework === "django") {
      // django does not support some file namings so the name has to be parsed into a valid python identifier.
      projectName = projectName.replaceAll(/[-\. ]/g, "");

      // copy django template to directory

      copyFile(getTemplateDir("backend/django/django-temp"), destinationPath);

      // rename project name in final source

      shell.mv(
        `${destinationPath}/django_boilerplate`,
        `${destinationPath}/${projectName}`,
      );

      writeToFile(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES);

      writeToFile(`${destinationPath}/manage.py`, DJANGO_MANAGER);

      writeToFile(
        `${destinationPath}/${projectName}/settings.py`,
        DJANGO_SETTINGS,
      );

      writeToFile(`${destinationPath}/${projectName}/wsgi.py`, DJANGO_WSGI);

      writeToFile(`${destinationPath}/${projectName}/asgi.py`, DJANGO_ASGI);

      if (database && database !== "sqlite3") {
        switch (database) {
          case "postgresql":
            updateFileContent(
              `${destinationPath}/${projectName}/settings.py`,
              DJANGO_SETTINGS,
              {
                projectName,
                DATABASE_IMPORT: "import dj_database_url",
                DATABASE_SETUP: DJANGO_POSTGRES_SETUP,
              },
            );

            updateFileContent(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES, {
              SECRET_KEY: crypto.randomUUID().split("-").join(""),
              DATABASE_ENV:
                "DATABASE_URL=postgres://username:password@localhost:5432",
            });
            break;
        }
      } else {
        updateFileContent(
          `${destinationPath}/${projectName}/settings.py`,
          DJANGO_SETTINGS,
          {
            projectName,
            DATABASE_IMPORT: "",
            DATABASE_SETUP: DJANGO_SQLITE_SETUP,
          },
        );

        updateFileContent(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES, {
          SECRET_KEY: crypto.randomUUID().split("-").join(""),
          DATABASE_ENV: "",
        });
      }

      // add updates to django starter files

      updateFileContent(`${destinationPath}/.env`, DJANGO_ENV_VARIABLES, {
        SECRET_KEY: crypto.randomUUID().split("-").join(""),
      });

      updateFileContent(`${destinationPath}/manage.py`, DJANGO_MANAGER, {
        projectName,
      });

      updateFileContent(
        `${destinationPath}/${projectName}/wsgi.py`,
        DJANGO_WSGI,
        {
          projectName,
        },
      );

      updateFileContent(
        `${destinationPath}/${projectName}/asgi.py`,
        DJANGO_ASGI,
        {
          projectName,
        },
      );
    }

    // process dependencies install
    if (installDependencies) {
      spinner.succeed()
      spinner.start("Installing dependencies ...")
      await processDependenciesInstall(framework, destinationPath);
    }

    // success message
    spinner.succeed()
    spinner.succeed(`Backend project created successfully! : ${destinationPath}`)

    // send stat
    sendStat("startease", framework).then(() => {
    })

  } catch (e) {
    console.log(`Error Creating Backend Project: ${e}`);
  }
}
