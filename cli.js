#!/usr/bin/env node

import figlet from 'figlet';
import { program } from 'commander';
import chalk from 'chalk';
import useGradient from './src/utils/useGradient.js';
import { createBackendProject } from './src/utils/create-backend-project.js';
import {
  promptBackendFramework,
  promptDatabase,
  promptFrontendFramework,
  promptInitDatabase,
  promptOrm,
  promptProjectName,
  promptProjectStack
} from './src/utils/prompts.js';

program.version('1.0.0').description('Project Starter CLI');

program.description('Generate a starter project').action(async () => {
  await startProject();
});

program.parse(process.argv);

async function startProject2() {
  let framework;
  let projectName;
  let projectStack;
  let initDB;
  let database;
  let orm;

  const initialMsg = `\n Effortlessly Scaffold Any Project with ${chalk.green(
    'project-starter'
  )} CLI Tool.`;

  // render cli title
  renderTitle();
  console.log(chalk.white(initialMsg));

  projectName = await promptProjectName();
  projectStack = await promptProjectStack();

  /**
   * start prompts
   */
  if (projectStack === 'frontend') {
    framework = await promptFrontendFramework();
  } else if (projectStack === 'backend') {
    framework = await promptBackendFramework();

    initDB = await promptInitDatabase();

    if (initDB) {
      database = await promptDatabase();

      orm = await promptOrm(database);
    }

    await createBackendProject(projectName, framework, database, orm);
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

/**
 * This is to test programs
 */
async function startProject() {
  await createBackendProject(
    'simple-projecttttt',
    'expressjs',
    'mongodb',
    'mongoose'
  );
}
