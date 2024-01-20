import fs from "fs-extra";


export const handleAppConfigs = (projectName) => {
    //app.json

    const file = await fs.readJSON("../templates/app/react-native/app.json");
};
