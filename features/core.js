import request from "requestV2/index";
import { data } from "../data/data.js";
import { version, formatPrefix, darkAqua, green, red, bold, aqua, strikeThrough, spacing } from "../utils/utils.js";
import { getSessionDungeonRuns, getSessionKuudraRuns, resetRuns, setRuns } from "./partyCommands/runs.js";

let cantAutoUpdate = false;
let canUpdate = false;
let somefeaturesExists = false;


export function getCanUpdate() { return canUpdate };

export function getSomefeatures() { return somefeaturesExists };

const firstCheck = register("tick", () => {
    firstCheck.unregister();
    let first = false;
    if (!data.firstTime) {
        ChatLib.chat(`${aqua + bold + strikeThrough}--------------------------------------------`);
        ChatLib.chat(ChatLib.getCenteredText(`${darkAqua + bold}BetterChatCommand ${version}`));
        ChatLib.chat(ChatLib.getCenteredText("Welcome! /bcc to open settings!"));
        ChatLib.chat(ChatLib.getCenteredText(`${darkAqua}Thank you for installing!`));
        ChatLib.chat(ChatLib.getCenteredText(`${red}If you find any bugs, please contact me.(tadanomoyasi)`));
        ChatLib.chat(`${aqua + bold + strikeThrough}--------------------------------------------`);
        data.firstTime = true;
        first = true;
    }
    const fileExists = FileLib.exists("somefeatures", "features/autorequeue.js");
    if (fileExists) somefeaturesExists = true;
    else somefeaturesExists = false;
    sessionJoinTime = Date.now();
    if (data.playtimes.joinTime === 1 || data.playtimes.leftTime === 1) {
        data.joinTime = Date.now();
        data.leftTime = Date.now();
        data.save();
    }
    if (Date.now() - data.leftTime > 18000000) {
        data.joinTime = Date.now();
        resetRuns();
        console.log("[BCC] reset data");
    } else {
        setRuns(data.todayData.todayKuudra, data.todayData.todayDungeon);
    }
    if (version !== data.lastVersion && !first) {
        data.lastVersion = version;
        data.save();
        const changelog = JSON.parse(FileLib.read("BetterChatCommand", "changelog.json"));
        if (changelog.length !== 0) {
            setTimeout(() => {
                ChatLib.chat(`${aqua + bold + strikeThrough}--------------------------------------------`);
                ChatLib.chat(ChatLib.getCenteredText(`${darkAqua + bold}BetterChatCommand ${version}`));
                changelog.forEach(change => ChatLib.chat(ChatLib.getCenteredText(change)))
                ChatLib.chat(ChatLib.getCenteredText(`${darkAqua}Thank you for installing!`));
                ChatLib.chat(ChatLib.getCenteredText(`${red}If you find any bugs, please contact me.(tadanomoyasi)`));
                ChatLib.chat(`${aqua + bold + strikeThrough}--------------------------------------------`);
            }, 500);
        }
    }
    request({
        url: "https://api.github.com/repos/TadanoMoyasi/BetterChatCommand/releases/latest",
        json: true
    }).then((response) => {
        const BCCLatestVersion = response.name.replace(/[^\d.]/, "");
        if (response.name.includes("CAU")) {
            new TextComponent(`${formatPrefix} ${green}New version available! ${red}⚠️ This version cannot be auto-updated! please download from here! ⚠️`)
                .setClick("open_url", "https://github.com/TadanoMoyasi/BetterChatCommand/releases")
                .setHover("show_text", `${green}Click to open github!`)
                .chat()
            cantAutoUpdate = true;
        }
        if (version !== BCCLatestVersion && !cantAutoUpdate) {
            canUpdate = true;
            new TextComponent(`${formatPrefix} ${green}New version available! Click to start update!`)
                .setClick("run_command", "/bcc update")
                .setHover("show_text", `${green}Click to start update!`)
                .chat()
        }
    }).catch((e) => {
        ChatLib.chat(`${formatPrefix + spacing + red}Error: ${JSON.parse(e).errorMessage}`);
    });
    request({
        url: "https://api.hypixel.net/v2/resources/skyblock/election",
        json: true
    }).then((response) => {
        const currentMayor = response.mayor.name;
        if (currentMayor !== data.playtimes.mayor.lastMayor) {
            data.playtimes.mayor.lastMayor = currentMayor;
            data.playtimes.mayor.playtime = 0;
        }
    })
});

register("gameUnload", () => {
    const { getUpdating } = require("./autoUpdate.js");
    if (getUpdating()) return;
    unloadFunction();
});

export function unloadFunction() {
    data.todayData.dungeon = getSessionDungeonRuns();
    data.todayData.kuudra = getSessionKuudraRuns();
    data.playtimes.leftTime = Date.now();
    data.playtimes.mayor.playtime += Number(((Date.now() - sessionJoinTime) / 1000).toFixed());
    data.save();
}