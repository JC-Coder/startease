#!/usr/bin/env node

import figlet from 'figlet';
import inquirer from 'inquirer';
import * as path from 'path';
import fs from 'fs-extra';
import { program } from 'commander';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';
import chalk from 'chalk';
import useGradient from './src/utils/useGradient.js';
import {
  copyFile,
  createAndUpdateFile,
  emptyDirectory,
  removeFile,
  removeFolder,
  writeToFile
} from './src/utils/filemanager.js';
import {
  DATABASE_MODULE,
  MongodbSchema
} from './templates/backend/nestjs/base/databases.js';
import { MongodbDatabaseConfig } from './src/utils/nestjs/database.js';
import { createBackendProject } from './src/utils/create-backend-project.js';
import {
  getInitGit,
  promptBackendFramework,
  promptDatabase,
  promptFrontendFramework,
  promptInitDatabase,
  promptOrm,
  promptProjectName,
  promptProjectStack
} from './src/utils/prompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program.version('1.0.0').description('Project Starter CLI');

program.description('Generate a starter project').action(async () => {
  await startProject();
});

program.parse(process.argv);

async function startProject() {
  let framework;
  let projectName;
  let projectStack;
  let initGit;
  let initDB;
  let database;
  let orm;
  let templateDir;

  const initialMsg = `\n Effortlessly Scaffold Any Project with ${chalk.green(
    'project-starter'
  )} CLI Tool.`;

  // render cli title
  renderTitle();
  console.log(chalk.white(initialMsg));

  projectName = await promptProjectName();
  projectStack = await promptProjectStack();

  // get framework
  if (projectStack === 'frontend') {
    framework = await promptFrontendFramework();
  } else if (projectStack === 'backend') {
    framework = await promptBackendFramework();
  }

  // projectType = await promptProjectType();
  initGit = await getInitGit();

  if (projectStack === 'backend') {
    initDB = await promptInitDatabase();

    if (initDB) {
      database = await promptDatabase();

      orm = await promptOrm(database);
    }
  }

  /**
   * template dir
   */
  templateDir = `backend/nestjs/nestjs-temp`;
  console.log('tempDir', templateDir);
  templateDir = path.join(__dirname, './src/templates', templateDir);

  /**
   * Create Project
   */
  switch (projectStack) {
    case 'backend':
      await createBackendProject(projectName, framework, database, orm);
      break;
    case 'frontend':
      console.log('frontend templates coming soon .....');
      break;
  }
}

function renderTitle() {
  const figletConfig = {
    font: 'big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  };

  useGradient({
    title: figlet.textSync('Project Starter', figletConfig)
  });
}

// async function copyTemplateFiles(projectName, templateDir, initGit, framework) {
//   // Copy the template files to the destination directory
//   const destinationDir = path.join(
//     process.cwd(),
//     projectName ? projectName : `project-starter-${framework}-template`
//   );

//   console.log(destinationDir);

//   return;

//   await fs.copy(templateDir, destinationDir);

//   if (initGit) {
//     const git = simpleGit(destinationDir);
//     await git.init();
//   }

//   console.log(`Generated ${framework} project in ${destinationDir}`);
// }

/**
 * This is to test programs
 */
async function startProject2() {
  // removeFolder(
  //   '/Users/jccoder/Documents/projects/tool/project-starter-cli/test-project/src/module/v1/newdb'
  // );

  // await copyFile(
  //   '/Users/jccoder/Documents/projects/tool/project-starter-cli/templates/backend/nestjs/nestjs', 'test-project'
  // );

  // await writeToFile(
  //   '/Users/jccoder/Documents/projects/tool/project-starter-cli/test-project/src/module/v1/database/database.module.ts',
  //   MongodbDatabaseConfig()
  // );

  await createBackendProject(
    'simple-projecttttt',
    'expressjs',
    'mongodb',
    'mongoose'
  );

  // createAndUpdateFile(
  //   `/Users/jccoder/Documents/projects/tool/project-starter-cli/test-file.ts`,
  //   MongodbSchema()
  // );
}
