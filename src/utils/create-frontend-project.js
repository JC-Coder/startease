import {
  copyFile,
  createAndUpdateFile,
  createFolder,
  getTemplateDir,
  updateFileContent,
  writeToFile,
} from "./filemanager.js"
import path from "path"
import ora from "ora"

/**
 * loader
 */
let stages = [{ message: "Creating Project ...", duration: 2000 }]

async function startSpinner() {
  for (const stage of stages) {
    const spinner = ora(stage.message).start()
    await new Promise((resolve) => setTimeout(resolve, stage.duration))
    spinner.succeed(stage.message.replace("...", " completed."))
  }

  stages = [{ message: "Creating Project ...", duration: 2000 }]
}

/**
 * function to create frontend projects
 * @param {string} framework
 * @param {string} projectName
 * @param {string} language - {typescript, javascript}
 */

export async function createFrontendProject(projectName, framework, language) {
  try {
    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`
    )

    if (framework === "reactjs") {
      // copy reactjs template to directory

      //   copy files based on the language chosen
      copyFile(
        getTemplateDir(`frontend/reactjs/react-${language}-temp`),
        destinationPath
      )

      // success message
      stages.push({
        message: `Frontend - ReactJS project with ${
          language.charAt(0).toUpperCase() + language.slice(1)
        } created successfully! : ${destinationPath}`,
        duration: 1000,
      })

      await startSpinner()
    } else if (framework === "vuejs") {
      // copy vuejs template to directory
      copyFile(getTemplateDir("frontend/vuejs/vuejs-temp"), destinationPath)

      // add package json file
      //   createAndUpdateFile(
      //     `${destinationPath}/package.json`,
      //     JSON.stringify(ExpressJsPackageJsonTemplate)
      //   )

      // success message
      stages.push({
        message: `Frontend project created successfully! : ${destinationPath}`,
        duration: 1000,
      })

      await startSpinner()
    }
  } catch (e) {
    console.log(`Error Creating Frontend Project: ${e}`)
  }
}
