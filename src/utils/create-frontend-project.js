import {
  copyFile,
  createAndUpdateFile,
  getTemplateDir,
  removeFile,
  updateFileContent,
} from "./filemanager.js"
import path from "path"
import ora from "ora"
import {
  AppTailwindTemplate,
  PostCssConfig,
  TailwindConfig,
  TailwindIndexCSSFile,
} from "../../templates/frontend/reactjs/base/tailwindConfig.js"
import {
  ReactJsJavaScriptTempWithTailwind,
  ReactJsTypeScriptTempWithTailwind,
} from "../../templates/frontend/reactjs/base/tw-package-json.js"

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
 * @param {string} stylingOption - {CSS, TailwindCSS}
 */

export async function createFrontendProject(
  projectName,
  framework,
  language,
  stylingOption
) {
  try {
    const destinationPath = path.join(
      process.cwd(),
      projectName ?? `project-starter-${framework}-template`
    )

    if (framework === "reactjs") {
      //   copy files based on the language chosen
      switch (language) {
        case "javascript":
          copyFile(
            getTemplateDir(`frontend/reactjs/react-javascript-temp`),
            destinationPath
          )
          break
        case "typescript":
          copyFile(
            getTemplateDir(`frontend/reactjs/react-typescript-temp`),
            destinationPath
          )

        default:
          break
      }

      if (stylingOption === "tailwindcss") {
        // update template to include tailwind
        updateFileContent(
          `${destinationPath}/tailwind.config.js`,
          TailwindConfig
        )

        // update package.json

        updateFileContent(
          `${destinationPath}/package.json`,
          JSON.stringify(
            language === "javascript"
              ? ReactJsJavaScriptTempWithTailwind
              : ReactJsTypeScriptTempWithTailwind
          )
        )

        // addd autoprefixer and postcss config

        createAndUpdateFile(
          `${destinationPath}/postcss.config.js`,
          PostCssConfig
        )

        // update css files

        updateFileContent(
          `${destinationPath}/src/index.css`,
          TailwindIndexCSSFile
        )

        // remove files

        removeFile(`${destinationPath}/src/App.css`)

        // update App.jsx file

        updateFileContent(
          `${destinationPath}/src/App.${
            language === "javascript" ? "jsx" : "tsx"
          }`,
          AppTailwindTemplate
        )
      }

      // success message
      stages.push({
        message: `Frontend - ReactJS project with ${
          language.charAt(0).toUpperCase() + language.slice(1)
        } and ${stylingOption.toUpperCase()} created successfully! : ${destinationPath}`,
        duration: 1000,
      })

      await startSpinner()
    }
  } catch (e) {
    console.log(`Error Creating Frontend Project: ${e}`)
  }
}
