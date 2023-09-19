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

    initGit = await getInitGit();

    if (projectStack === 'backend') {
        initDB = await promptInitDatabase();

        if (initDB) {
            database = await promptDatabase();
            orm = await promptOrm(database);
        }
    }

    // Define the base template directory
    templateDir = path.resolve(__dirname, './templates', projectStack);

    // Copy the selected templates to the destination directory
    const destinationDir = path.join(
        process.cwd(),
        projectName ? projectName : `project-starter-${framework}-template`
    );
    await fs.ensureDir(destinationDir);

    // Define template files based on user choices
    const templateFiles = [];

    // Frontend template files
    if (projectStack === 'frontend') {
        templateFiles.push('common/config/react-config.js');
        templateFiles.push(`modules/${framework}/frontend-main.js`);
    }

    // Backend template files
    if (projectStack === 'backend') {
        templateFiles.push('common/config/common-config.js');
        templateFiles.push(`modules/${framework}/backend-main.js`);

        if (initDB && database) {
            templateFiles.push(`database/${database}-config.js`);
        }

        if (orm) {
            templateFiles.push(`orm/${orm}-config.js`);
        }
    }

    // Copy template files to the destination
    for (const templateFile of templateFiles) {
        const sourceFile = path.join(templateDir, templateFile);
        const destinationFile = path.join(
            destinationDir,
            templateFile.replace(/\//g, path.sep)
        );

        await fs.copyFile(sourceFile, destinationFile);
    }

    // Initialize a Git repository if needed
    if (initGit) {
        const git = simpleGit(destinationDir);
        await git.init();
    }

    console.log(`Generated ${framework} project in ${destinationDir}`);
}

// Other prompt and rendering functions remain the same
// ...

// Note: The structure of the template directory should match the templateFiles paths
// Example template directory structure:
// templates
//   - frontend
//     - common
//       - config
//         - react-config.js
//     - modules
//       - reactjs
//         - frontend-main.js
//   - backend
//     - common
//       - config
//         - common-config.js
//     - modules
//       - expressjs
//         - backend-main.js
//     - database
//       - mongodb-config.js
//     - orm
//       - mongoose-config.js

// Example usage
// startProject();
