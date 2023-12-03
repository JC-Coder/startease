import { exit } from "shelljs";

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
