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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program.version('1.0.0').description('Project Starter CLI');

program
  .command('start')
  .description('Generate a starter project')
  .action(async () => {
    await startProject();
  });

program.parse(process.argv);

async function startProject() {
  const {
    projectName,
    projectStack,
    framework,
    initGit,
    initDB,
    database,
    orm
  } = await promptProjectDetails();

  const templatePathSuffix = buildTemplatePathSuffix(
    projectStack,
    framework,
    initDB,
    database,
    orm
  );
  const templateDir = path.join(
    __dirname,
    './src/templates',
    projectStack,
    templatePathSuffix
  );

  if (!fs.existsSync(templateDir)) {
    console.error(`Template for ${framework} not found.`);
    return;
  }

  await copyTemplateFiles(projectName, templateDir, initGit, framework);
}

async function promptProjectDetails() {
  renderTitle();
  console.log(
    chalk.white(
      '\n Effortlessly Scaffold Any Project with project-starter CLI Tool.\n'
    )
  );

  const projectName = await promptProjectName();
  const projectStack = await promptProjectStack();
  const framework = await promptFramework(projectStack);
  const initGit = await promptInitGit();
  const initDB =
    projectStack === 'backend' ? await promptInitDatabase() : false;
  const database = initDB ? await promptDatabase() : '';
  const orm = initDB ? await promptOrm(database) : '';

  return {
    projectName,
    projectStack,
    framework,
    initGit,
    initDB,
    database,
    orm
  };
}

async function promptProjectName() {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:'
    }
  ]);

  return projectName;
}

async function promptProjectStack() {
  const { projectStack } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectStack',
      message: 'Choose your stack:',
      choices: ['Frontend', 'Backend']
    }
  ]);

  return projectStack.toLowerCase();
}

async function promptFramework(projectStack) {
  const choices =
    projectStack === 'frontend' ? ['ReactJs'] : ['NestJS', 'ExpressJs'];
  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Choose a framework:',
      choices
    }
  ]);

  return framework.toLowerCase().replace(/ /g, '-');
}

async function promptDatabase() {
  const { database } = await inquirer.prompt([
    {
      type: 'list',
      name: 'database',
      message: 'Select a database:',
      choices: ['MongoDB', 'PostgreSQL', 'MySQL']
    }
  ]);

  return database.toLowerCase();
}

async function promptInitDatabase() {
  const { initDB } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'initDB',
      message: 'Initialize Database?',
      default: false
    }
  ]);

  return initDB;
}

async function promptInitGit() {
  const { initGitRepo } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'initGitRepo',
      message: 'Initialize a Git repository?',
      default: false
    }
  ]);

  return initGitRepo;
}

async function promptOrm(database) {
  const ormChoices = database === 'mongodb' ? ['Mongoose'] : ['Typeorm'];

  const { orm } = await inquirer.prompt([
    {
      type: 'list',
      name: 'orm',
      message: 'Select your preferred ORM:',
      choices: ormChoices
    }
  ]);

  return orm.toLowerCase();
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

function buildTemplatePathSuffix(
  projectStack,
  framework,
  initDB,
  database,
  orm
) {
  let templatePathSuffix = `${framework}`;

  if (projectStack === 'backend') {
    if (initDB && database) {
      templatePathSuffix += `${database}`;
    }

    if (orm) {
      templatePathSuffix += `${orm}`;
    }
  }

  return templatePathSuffix;
}

async function copyTemplateFiles(projectName, templateDir, initGit, framework) {
  const destinationDir = path.join(
    process.cwd(),
    projectName ? projectName : `project-starter-${framework}-template`
  );

  await fs.copy(templateDir, destinationDir);

  if (initGit) {
    const git = simpleGit(destinationDir);
    await git.init();
  }

  console.log(`Generated ${framework} project in ${destinationDir}`);
}
