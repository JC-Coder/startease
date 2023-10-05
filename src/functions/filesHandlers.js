import ora from "ora";
import path from "path";
import {
  copyFile,
  createAndUpdateFile,
  createFolder,
  getTemplateDir,
  updateFileContent,
  writeToFile,
} from "../utils/filemanager.js";
/**
 *
 * @param {string} framework
 * @param {string?} projectName
 * @returns {string}
 */
function setDestinationPath(framework, projectName) {
  return path.join(
    process.cwd(),
    projectName ?? `project-starter-${framework}-template`
  );
}

/**
 * @description Loader
 * @param {[{message:string, duration:Number}]} stages
 */
async function startSpinner(stages) {
  for (const stage of stages) {
    const spinner = ora(stage.message).start();
    await new Promise((resolve) => setTimeout(resolve, stage.duration));
    spinner.succeed(stage.message.replace("...", " completed."));
  }
}

/**
 *
 * @param {string} projectName
 * @returns {void}
 */
export const vanillaJsHandler = async function (projectName) {
  const destinationPath = setDestinationPath("vanilla-js", projectName);
  const stages = [];
  stages.push({ message: "Creating Project ...", duration: 2000 });
  copyFile(getTemplateDir("frontend/vanilla-js"), destinationPath);
  stages.push({
    message: `Vanilla-Js project created successfully! : ${destinationPath}`,
    duration: 1000,
  });

  await startSpinner(stages);
};
