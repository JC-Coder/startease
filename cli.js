#!/usr/bin/env node

import figlet from "figlet";
import { program } from "commander";
import chalk from "chalk";
import shell from "shelljs";
import path from "path";
import useGradient from "./src/utils/useGradient.js";
import { createBackendProject } from "./src/utils/create-backend-project.js";
import {
  promptBackendFramework,
  promptDatabase,
  promptFrontendFramework,
  promptFrontendLanguage,
  promptInitDatabase,
  promptOrm,
  promptProjectName,
  promptProjectStack,
  promptDependenciesInstall,
  promptInitializeGit
} from "./src/utils/prompts.js";
import { createFrontendProject } from "./src/utils/create-frontend-project.js";
import { validateProjectName } from "./src/utils/helper.js";
import { sendQueuedStats } from "./src/utils/stat.js";
import ora from "ora";

const toolName = "StartEase";
const jsBackendStacks = ["expressjs", "nestjs"];

program.version("1.0.0").description("StartEase CLI");

program
  .description("Scaffold a new project with StartEase")
  .action(async () => {
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
  let language;
  let installDependencies;
  let initializeGit;

  const initialMsg = `Simplify Project Setup with the. ${chalk.green(
    toolName,
  )} CLI Tool.`;

  // render cli title
  renderTitle();
  console.log(chalk.white(initialMsg));

  projectName = await promptProjectName();
  validateProjectName(projectName);

  projectStack = await promptProjectStack();

  // process sending of stats in background
  sendQueuedStats();

  /**
   * start prompts
   */
  if (projectStack === "frontend") {
    language = await promptFrontendLanguage();
    framework = await promptFrontendFramework();
    initializeGit = await promptInitializeGit();

    if (framework === "html-x-css-x-javascript") {
      return await createFrontendProject(projectName, framework, "javascript");
    }

    await createFrontendProject(projectName, framework, language);
  } else if (projectStack === "backend") {
    framework = await promptBackendFramework();

    initDB = await promptInitDatabase();

    if (initDB) {
      database = await promptDatabase(framework);

      if (jsBackendStacks.includes(framework)) {
        orm = await promptOrm(database);
      }
    }

    installDependencies = await promptDependenciesInstall();
    initializeGit = await promptInitializeGit();

    await createBackendProject(projectName, framework, database, orm, installDependencies);
  }
  if (initializeGit) {
    if (shell.which("git")) {
      const destinationPath = path.join(
        process.cwd(),
        projectName ?? `project-starter-${framework}-template`,
      );
      // initialize git for the final source
      const spinner = ora();
      spinner.succeed();
      spinner.start("Initializing git ...");

      shell.cd(`${destinationPath}`);
      shell.exec(`git init`, { silent: true });
      shell.exec(`git add .`, { silent: true });
      shell.exec(`git commit -m "Initial commit"`, { silent: true });
      shell.cd("-");
      spinner.succeed("Project ready!🚀");
    }
  }
}

/**
 * Render cli title
 */
function renderTitle() {
  const figletConfig = {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  };

  useGradient({
    title: figlet.textSync("StartEase", figletConfig),
  });
}
