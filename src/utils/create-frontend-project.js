import { vanillaJsHandler } from "../functions/filesHandlers.js";

/**
 *
 * @param {string} projectName
 * @param {string} framework
 * @param {string?} css
 * @param {string[]?} technologies
 */
export async function createFrontendProject(
  projectName,
  framework,
  css,
  technologies
) {
  if (framework === "vanilla-js") {
    return await vanillaJsHandler(projectName);
  }
}
