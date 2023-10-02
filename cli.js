#!/usr/bin/env node

import figlet from 'figlet';
import {program} from 'commander';
import chalk from 'chalk';
import useGradient from './src/utils/useGradient.js';
import {createBackendProject} from './src/utils/create-backend-project.js';
import {
    promptBackendFramework,
    promptDatabase,
    promptFrontendFramework,
    promptInitDatabase,
    promptOrm,
    promptProjectName,
    promptProjectStack
} from './src/utils/prompts.js';

const toolName = "StartEase";

program.version('1.0.0').description('StartEase CLI');

program.description('Scaffold a new project with StartEase').action(async () => {
    await startProject();
});

program.parse(process.argv);

async function startProject() {
    let framework;
    let projectName;
    let projectStack;
    let initDB;
    let database;
    let orm;

    const initialMsg = `Simplify Project Setup with the. ${chalk.green(
        toolName
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
        console.log(`Ops, 🚀 Frontend support is coming soon! 🎉`);
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

/**
 * Render cli title
 */
function renderTitle() {
    const figletConfig = {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    };

    useGradient({
        title: figlet.textSync('StartEase', figletConfig)
    });
}
