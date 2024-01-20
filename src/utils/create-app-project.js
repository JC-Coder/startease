import { copyFile, getTemplateDir, handleAppConfigs } from "./file-manager.js";
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

    stages = [{ message: "Creating App Project ...", duration: 2000 }];
}

/**
 * function to create frontend projects
 * @param {string} framework
 * @param {string} projectName
 */

export async function createAppProject(projectName, framework) {
    try {
        const destinationPath = path.join(
            process.cwd(),
            projectName ?? `project-starter-${framework}-template`,
        );

        if (framework === "react-native") {

            copyFile(
                getTemplateDir(`app/react-native`),
                destinationPath,
            );

            // success message
            stages.push({
                message: `App - React-Native project created successfully! : ${destinationPath}`,
                duration: 1000,
            });

            await startSpinner();
        }

        await handleAppConfigs(destinationPath, projectName);

        // update stat

        // if (await isConnectedToInternet()) {
        //     await axiosInstance(CLI_CONSTANTS.statBaseUrl).post("/stat", {
        //         app: "startease",
        //         framework,
        //     });
        // }

    } catch (e) {
        console.log(`Error Creating Frontend Project: ${e}`);
    }
}
