import request from "requestV2/index.js";
import { File, formatPrefix, spacing, red, green } from "../utils/utils.js";
import { unloadFunction, getCanUpdate } from "./core.js";
import { socketFactory } from "../utils/letsEncryptCerts.js";

let updating = false;
const configFilePaths = [];

export function getUpdating() { return updating };

function initializeFilePaths() {
    const basePath = "./config/ChatTriggers/modules/BetterChatCommand";
    return searchFilesInDirectory(basePath);
}

function searchFilesInDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        const directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            const files = directory.listFiles();
            let index = 0;
            function processNextFile() {
                if (index < files.length) {
                    const file = files[index++];
                    if (file.isDirectory()) {
                        // フォルダの場合は再帰的に探索
                        searchFilesInDirectory(file.getAbsolutePath()).then(processNextFile).catch(reject);
                    } else if (file.getName() === "config.toml" || file.getName() === "data.json") {
                        configFilePaths.push(file.getAbsolutePath());
                        processNextFile();
                    } else {
                        processNextFile();
                    }
                } else {
                    resolve();
                }
            }
            processNextFile();
        } else {
            reject(`${directoryPath} is not a valid directory.`);
        }
    });
}

export function autoUpdate() {
    if (!getCanUpdate()) {
        ChatLib.chat(`${formatPrefix + spacing + red}No updates available.`);
        return;
    }
    request({
        url: "https://api.github.com/repos/TadanoMoyasi/BetterChatCommand/releases/latest",
        json: true
    }).then((response) => {
        updating = true;
        const modURL = response.assets[0].browser_download_url;
        unloadFunction();

        initializeFilePaths().then(() => {
            if (configFilePaths.length === 0) {
                ChatLib.chat(`${formatPrefix + spacing + red}directory not found!`);
                return;
            }

            new File("./config/ChatTriggers/modules/BCCTemp").mkdir();
            urlToFile(modURL, "./config/ChatTriggers/modules/BCCTemp/BetterChatCommand.zip", 10000, 20000);
            FileLib.unzip("./config/ChatTriggers/modules/BCCTemp/BetterChatCommand.zip", "./config/ChatTriggers/modules/BCCTemp/BetterChatCommand/");

            // BetterChatCommand to BCCTemp
            let i = 0;
            function processNextFile() {
                if (i < configFilePaths.length) {
                    const fileName = configFilePaths[i].substring(configFilePaths[i].lastIndexOf("/") + 1);
                    const destinationDir = `./config/ChatTriggers/modules/BCCTemp/${i}`;
                    const sourceFile = new File(configFilePaths[i]);
                    const destinationFile = `./config/ChatTriggers/modules/BCCTemp/${i}/${fileName}`;
                    if (sourceFile.exists()) {
                        sourceFile.renameTo(destinationFile);
                        console.log(`${fileName} is moving to ${destinationDir}`);
                    } else {
                        console.log(`${fileName} are not exists`);
                    }
                    i++;
                    processNextFile();
                } else {
                    FileLib.deleteDirectory(new File("./config/ChatTriggers/modules/BetterChatCommand"));
                    new File("./config/ChatTriggers/modules/BCCTemp/BetterChatCommand/BetterChatCommand").renameTo(new File("./config/ChatTriggers/modules/BetterChatCommand"));

                    // BCCTemp to BetterChatCommand
                    i = 0;
                    function processBCCTemp() {
                        if (i < configFilePaths.length) {
                            const fileName = configFilePaths[i].substring(configFilePaths[i].lastIndexOf("/") + 1);
                            const destinationDir = configFilePaths[i].substring(0, configFilePaths[i].lastIndexOf("/"));
                            const sourceFile = new File(`./config/ChatTriggers/modules/BCCTemp/${i}/${fileName}`);
                            const destinationFile = new File(configFilePaths[i]);
                            if (sourceFile.exists()) {
                                sourceFile.renameTo(destinationFile);
                                console.log(`${fileName} is moving to ${destinationDir}`);
                            } else {
                                console.log(`${fileName} are not exists`);
                            }
                            i++;
                            processBCCTemp();
                        } else {
                            FileLib.deleteDirectory(new File("./config/ChatTriggers/modules/BCCTemp"));

                            new TextComponent(`${formatPrefix} Update Completed! Click to Load Update!`)
                                .setClick("run_command", "/ct load")
                                .setHover("show_text", `${green}Click to Load Update!`)
                                .chat();
                        }
                    }
                    processBCCTemp();
                }
            }
            processNextFile();
        }).catch((error) => {
            console.error(`Error initializing file paths: ${error}`);
        });
    });
}

function urlToFile(url, destination, connectTimeOut, readTimeOut) {
    const URL = Java.type("java.net.URL");
    const HttpsUrlConnection = Java.type('javax.net.ssl.HttpsURLConnection');
    const PrintStream = Java.type("java.io.PrintStream");
    const Byte = Java.type("java.lang.Byte");
    const dir = new File(destination);
    dir.getParentFile().mkdirs();
    const connection = new URL(url).openConnection();
    if (connection instanceof HttpsUrlConnection) {
        connection.setSSLSocketFactory(socketFactory);
    }
    connection.setDoOutput(true);
    connection.setConnectTimeout(connectTimeOut);
    connection.setReadTimeout(readTimeOut);
    const IS = connection.getInputStream();
    const FilePS = new PrintStream(destination);
    const buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    while ((len = IS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
    }
    IS.close();
    FilePS.close();
}