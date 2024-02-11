import { copyFile, getTemplateDir } from "./file-manager.js";
import path from "path";
import ora from "ora";
import { isConnectedToInternet } from "./helper.js";
import { axiosInstance } from "./axios.js";
import { CLI_CONSTANTS } from "./constant.js";

/**
 * loader
 */
let stages = [{ message: "Creating Project ...", duration: 2000 }];

async function startSpinner() {
  for (const stage of stages) {
    const spinner = ora(stage.message).start();
    await new Promise((resolve) => setTimeout(resolve, stage.duration));
    spinner.succeed(stage.message.replace("...", " completed."));
  }

  stages = [{ message: "Creating Project ...", duration: 2000 }];
}

/**
 * function to create frontend projects
 * @param {string} framework - {reactjs, vuejs}
 * @param {string} projectName
 * @param {string} language - {typescript, javascript}
 */

export async function createFrontendProject(projectName, framework, language) {
  try {
    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`,
    );

    if (framework === "reactjs") {
      //   copy files based on the language chosen
      switch (language) {
        case "javascript":
          copyFile(
            getTemplateDir(`frontend/reactjs/react-javascript-temp`),
            destinationPath,
          );
          break;
        case "typescript":
          copyFile(
            getTemplateDir(`frontend/reactjs/react-typescript-temp`),
            destinationPath,
          );

        default:
          break;
      }

      // success message
      stages.push({
        message: `Frontend - ReactJS project with ${
          language.charAt(0).toUpperCase() + language.slice(1)
        } created successfully! : ${destinationPath}`,
        duration: 1000,
      });

      await startSpinner();
    } else if (framework === "vuejs") {
      switch (language) {
        case "javascript":
          copyFile(
            getTemplateDir(`frontend/vuejs/vuejs-javascript-temp`),
            destinationPath,
          );
          break;
        case "typescript":
          copyFile(
            getTemplateDir(`frontend/vuejs/vuejs-typescript-temp`),
            destinationPath,
          );

        default:
          break;
      }

      // success message
      stages.push({
        message: `Frontend - VueJs project with ${
          language.charAt(0).toUpperCase() + language.slice(1)
        } created successfully! : ${destinationPath}`, });
    } else if (framework === "html-x-css-x-javascript") {
      copyFile(getTemplateDir(`frontend/html-css-javascript`), destinationPath);

      // success message
      stages.push({
        message: `Frontend - plain html with css and javascript created successfully! : ${destinationPath}`,
        duration: 1000,
      });

      await startSpinner();
    }

    // update stat
    if (await isConnectedToInternet()) {
      await axiosInstance(CLI_CONSTANTS.statBaseUrl).post("/stat", {
        app: "startease",
        framework,
      });
    }
  } catch (e) {
    console.log(`Error Creating Frontend Project: ${e}`);
  }
}
