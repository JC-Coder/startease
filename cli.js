#!/usr/bin/env node

import figlet from "figlet";
import inquirer from "inquirer";
import * as path from "path";
import fs from "fs-extra";
import { program } from "commander";
import { fileURLToPath } from "url";
import simpleGit from "simple-git";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program.version("1.0.0").description("Project Starter CLI");

program.description("Generate a starter project").action(async () => {
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
  let projectType;
  let useOrm;
  let orm;

  projectName = await promptProjectName();
  projectStack = await promptProjectStack();

  // get framework
  if (projectStack === "frontend") {
    framework = await promptFrontendFramework();
  } else if (projectStack === "backend") {
    framework = await promptBackendFramework();
  }

  projectType = await promptProjectType();
  initGit = await getInitGit();

  if (projectStack === "backend") {
    initDB = await promptInitDatabase();

    if (initDB) {
      database = await promptDatabase();

      useOrm = await promptUseOrm();
      orm = await promptOrm();
    }
  }

  /**
   * template dir
   */
  const templateDir = path.join(
    __dirname,
    "./src/templates",
    framework.toLowerCase()
  );

  if (!fs.existsSync(templateDir)) {
    console.error(`Template for ${framework} not found.`);
    return;
  }

  // Copy the template files to the destination directory
  const destinationDir = path.join(
    process.cwd(),
    projectName ? projectName : `project-starter-${framework}-template`
  );
  await fs.copy(templateDir, destinationDir);

  // git init function
  if (initGit) {
    const git = simpleGit(destinationDir);
    await git.init();
  }

  console.log(`Generated ${framework} project in ${destinationDir}`);
}

async function promptProjectName() {
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
    },
  ]);

  return ans.projectName;
}

async function promptProjectStack() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "projectStack",
      message: "Choose your stack:",
      choices: ["Frontend", "Backend"],
    },
  ]);

  return ans.projectStack.toLowerCase();
}

async function promptFrontendFramework() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["ReactJs"],
    },
  ]);

  return ans.framework.toLowerCase().replace(/ /g, "-");
}

async function promptBackendFramework() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["NestJS", "ExpressJs"],
    },
  ]);

  return ans.framework.toLowerCase().replace(/ /g, "-");
}

async function promptDatabase() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "select a database",
      choices: ["MongoDB", "PostgreSQL", "MySQL"],
    },
  ]);

  return ans.database;
}

async function promptInitDatabase() {
  const ans = await inquirer.prompt([
    {
      type: "confirm",
      name: "initDB",
      message: "Initialize Database?",
      default: false,
    },
  ]);

  return ans.initDB;
}

async function getInitGit() {
  const ans = await inquirer.prompt([
    {
      type: "confirm",
      name: "initGitRepo",
      message: "Initialize a Git repository?",
      default: false,
    },
  ]);

  return ans.initGitRepo;
}

async function promptProjectType() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "projectComplexity",
      description: "this is a test desc",
      message: "select project complexity",
      choices: ["basic", "advanced"],
    },
  ]);

  return ans.projectComplexity;
}

async function promptUseOrm() {
  const ans = await inquirer.prompt([
    {
      type: "confirm",
      name: "useOrm",
      message: "Do you want to use a database orm?",
      default: false,
    },
  ]);

  return ans.useOrm;
}

async function promptOrm(database) {
  let ormChoices = [];

  if (database === "mongodb") {
    ormChoices = ["Mongoose"];
  } else {
    ormChoices = ["Typeorm"];
  }

  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "select your preferred ORM",
      choices: ormChoices,
    },
  ]);

  return ans.database;
}
