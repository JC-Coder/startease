#!/usr/bin/env node

import figlet from "figlet"
import inquirer from "inquirer"
import * as path from 'path'
import fs from "fs-extra"
import {program} from "commander";
import {fileURLToPath} from 'url';
import simpleGit from 'simple-git';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program.version('1.0.0').description('Project Starter CLI');

program.command('start').description('Generate a starter project').action(() => {
    startProject();
});

program.parse(process.argv);

async function startProject() {
    const {
        framework,
        projectName,
        initializeGit
    } = await prompt()

    const templateDir = path.join(__dirname, './src/templates', framework.toLowerCase());

    if (!fs.existsSync(templateDir)) {
        console.error(`Template for ${framework} not found.`);
        return;
    }

    // database initializer
    if(framework === "nestjs" || framework === "expressjs") {
        const initDatabase = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'initDB',
                message: 'Initialize Database?',
                default: false,
            }
        ])

        if(initDatabase){
            const databaseType = await promptDatabase()
        }

    }

    // Copy the template files to the destination directory
    const destinationDir = path.join(process.cwd(), projectName ? projectName : `project-starter-${framework}-template`);
    await fs.copy(templateDir, destinationDir);

    if(initializeGit){
        const git = simpleGit(destinationDir)

        await git.init()
    }

    console.log(`Generated ${framework} project in ${destinationDir}`);
}

async function prompt() {
    const frameworkChoices = ['React Javascript', 'React Typescript', 'NestJS', 'ExpressJs', 'HTML x CSS x Bootstrap', 'React x Tailwind',];

    const answers = await inquirer.prompt([
        {
            type: 'list', name: 'framework', message: 'Choose a framework:', choices: frameworkChoices,
        },
        {
            type: 'input', name: 'projectName', message: 'Enter project name:',
        },
        {
            type: 'confirm',
            name: 'initGitRepo',
            message: 'Initialize a Git repository?',
            default: false,
        }
    ]);

    return {
        framework: answers.framework.toLowerCase().replace(/ /g, '-'),
        projectName: answers.projectName,
        initializeGit: answers.initGitRepo,
    }
}

async function promptDatabase() {
    const databaseChoices = ['MongoDB', 'PostgreSQL', 'MySQL']

    return await inquirer.prompt([
        {
            type: 'list',
            name: 'database',
            message: 'select a database',
            choices: databaseChoices
        }
    ])
}