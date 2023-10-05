import inquirer from "inquirer"

export async function promptProjectName() {
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
    },
  ])

  return ans.projectName
}

export async function promptProjectStack() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "projectStack",
      message: "Choose your stack:",
      choices: ["Frontend", "Backend"],
    },
  ])

  return ans.projectStack.toLowerCase()
}

export async function promptFrontendFramework() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["ReactJs"],
    },
  ])

  return ans.framework.toLowerCase().replace(/ /g, "-")
}

export async function promptFrontendLanguage() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: "Choose Your Preferred Language:",
      choices: ["JavaScript", "TypeScript"],
    },
  ])

  return ans.language.toLowerCase().replace(/ /g, "-")
}

export async function promptBackendFramework() {
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: ["NestJS", "ExpressJs", "Django", "Laravel"],
    },
  ])

  return ans.framework.toLowerCase().replace(/ /g, "-")
}

export async function promptDatabase(framework) {
  
  let choices;
  switch (framework) {
    case "django":
      choices = ["SQLite3"];
      break;

    case "laravel":
      choices = ["MongoDB"];
      break;
  
    default:
      choices = ["MongoDB"];
      break;
  }

  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "select a database",
      choices,
    },
  ])

  return ans.database.toLowerCase()
}

export async function promptInitDatabase() {
  const ans = await inquirer.prompt([
    {
      type: "confirm",
      name: "initDB",
      message: "Initialize Database?",
      default: false,
    },
  ])

  return ans.initDB
}

export async function promptOrm(database, framework) {
  database = database?.toLowerCase() ?? ""
  let ormChoices = []

    if (database === "mongodb" && framework === "expressjs") {
    ormChoices = ["Mongoose"];
  } else if(database === "mongodb" && framework === "laravel"){
    ormChoices = ["Laravel-mongodb"]
  } else {
    ormChoices = ["Typeorm"];
  }

  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "select your preferred ORM:",
      choices: ormChoices,
    },
  ])

  return ans.database.toLowerCase();
}


export async function promptWebType(framework){
  let webTypeChoices = [];

  if(framework === "laravel"){
    webTypeChoices = ["Web App", "Web API"]
  }

  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "webType",
      message: "Select your preferred web type:",
      choices: webTypeChoices,
    },
  ])

  return ans.webType.toLowerCase(); 
}

