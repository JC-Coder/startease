import { isConnectedToInternet } from "./helper.js";
import { axiosInstance } from "./axios.js";
import { CLI_CONSTANTS } from "./constant.js";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUEUE_FILE_PATH = path.resolve(__dirname, "queued_stat.json");

export const sendStat = async (app = "startease", framework) => {
  try {
    if (await isConnectedToInternet()) {
      return await axiosInstance(CLI_CONSTANTS.statBaseUrl).post("/stat", {
        app,
        framework,
      });
    } else {
      saveStatToLocal({
        app,
        framework,
      });
    }
  } catch (error) {
    // TODO: send error log to server
  }
};

const saveStatToLocal = async (data) => {
  try {
    const queueFileExist = fs.existsSync(QUEUE_FILE_PATH);
    let existingData;

    if (queueFileExist) {
      existingData = await fs.readFile(QUEUE_FILE_PATH, "utf-8");
    }

    const parsedExistingData = JSON.parse(existingData || "[]");

    parsedExistingData.push(data);

    await fs.writeFile(QUEUE_FILE_PATH, JSON.stringify(parsedExistingData));
  } catch (error) {
    // TODO: send error log to server
  }
};

export const sendQueuedStats = async () => {
  try {
    const queueFileExist = fs.existsSync(QUEUE_FILE_PATH);
    let existingData;

    if (queueFileExist) {
      existingData = await fs.readFile(QUEUE_FILE_PATH, "utf-8");
    } else {
      return;
    }

    let parsedExistingData = JSON.parse(existingData || "[]");

    const passed = [];
    const failed = [];

    for (let i = 0; i < parsedExistingData.length; i++) {
      const data = parsedExistingData[i];

      const result = await sendStat(data.app, data.framework);

      if (!result.data.success) {
        failed.push(data);
      } else {
        passed.push(data);
      }
    }

    parsedExistingData = parsedExistingData.filter(
      (data) => !passed.includes(data),
    );

    await fs.writeFile(QUEUE_FILE_PATH, JSON.stringify(parsedExistingData));
  } catch (error) {
    // TODO: send error log to server
  }
};
