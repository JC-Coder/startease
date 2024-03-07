import shell, { exit } from "shelljs";
import isOnline from "is-online";

/**
 * validate project name
 */
export function validateProjectName(projectName) {
  if (projectName === "") {
    console.log(`Project name can't be empty.`);
    exit();
  }

  if (!isNaN(parseInt(projectName.charAt(0)))) {
    console.log(`Project name can't start with a number.`);
    exit();
  }
}

/**
 * check user is connected to internet
 */
export async function isConnectedToInternet() {
  return await isOnline();
}

/**
 * process dependencies install
 */
export async function processDependenciesInstall(framework, destinationPath) {
  // check user has internet connection
  if (await isConnectedToInternet()) {
    shell.cd(`${destinationPath}`);
    switch (framework) {
      case "expressjs":
        shell.exec(`npm install`);
        shell.exec(`npm run format:fix`);
        shell.cd("-");
        break;

      case "nestjs":
        shell.exec(`npm install`);
        shell.exec(`npm run format`);
        shell.cd("-");
        break;

      default:
        break;
    }
  } else {
    console.log(
      `You don't have an active internet connection, aborting dependency install`,
    );
  }
}
