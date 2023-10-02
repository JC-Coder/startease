import inquirer from 'inquirer';

export async function promptProjectName() {
  const ans = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:'
    }
  ]);

  return ans.projectName;
}

export async function promptProjectStack() {
  const ans = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectStack',
      message: 'Choose your stack:',
      choices: ['Frontend', 'Backend']
    }
  ]);

  return ans.projectStack.toLowerCase();
}

export async function promptFrontendFramework() {
  const ans = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Choose a framework:',
      choices: ['ReactJs']
    }
  ]);

  return ans.framework.toLowerCase().replace(/ /g, '-');
}

export async function promptBackendFramework() {
  const ans = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Choose a framework:',
      choices: ['NestJS', 'ExpressJs']
    }
  ]);

  return ans.framework.toLowerCase().replace(/ /g, '-');
}

export async function promptDatabase() {
  const ans = await inquirer.prompt([
    {
      type: 'list',
      name: 'database',
      message: 'select a database',
      choices: ['MongoDB']
    }
  ]);

  return ans.database.toLowerCase();
}

export async function promptInitDatabase() {
  const ans = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'initDB',
      message: 'Initialize Database?',
      default: false
    }
  ]);

  return ans.initDB;
}

export async function promptOrm(database) {
  database = database?.toLowerCase() ?? '';
  let ormChoices = [];

  if (database === 'mongodb') {
    ormChoices = ['Mongoose'];
  } else {
    ormChoices = ['Typeorm'];
  }

  const ans = await inquirer.prompt([
    {
      type: 'list',
      name: 'database',
      message: 'select your preferred ORM',
      choices: ormChoices
    }
  ]);

  return ans.database.toLowerCase();
}