import { copyFile, getTemplateDir } from "./file-manager.js";
import path from "path";
import ora from "ora";
import { sendStat } from "./stat.js";

/**
 * function to create frontend projects
 * @param {string} framework - {reactjs, vuejs}
 * @param {string} projectName
 * @param {string} language - {typescript, javascript}
 */

export async function createFrontendProject(projectName, framework, language) {
  const spinner = ora("Creating Project ...").start();
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
      spinner.succeed(
        `Frontend - ReactJS project with ${
          language.charAt(0).toUpperCase() + language.slice(1)
        } created successfully! : ${destinationPath}`,
      );
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
      spinner.succeed(
        `Frontend - VueJs project with ${
          language.charAt(0).toUpperCase() + language.slice(1)
        } created successfully! : ${destinationPath}`,
      );
    } else if (framework === "html-x-css-x-javascript") {
      copyFile(getTemplateDir(`frontend/html-css-javascript`), destinationPath);

      // success message
      spinner.succeed(
        `Frontend - plain html with css and javascript created successfully! : ${destinationPath}`,
      );
    }

    // update stat
    sendStat("startease", framework).then(() => {});
  } catch (e) {
    console.log(`Error Creating Frontend Project: ${e}`);
  }
}
