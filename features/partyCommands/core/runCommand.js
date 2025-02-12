import Settings from "../../../config/general/generalConfig.js";
import Party from "../../../utils/Class/party.js";
import { data } from "../../../data/data.js";
import { setDownTime, setPlayerReady } from "../downtime.js";
import { formatPrefix, hasParty, PartyCommandList, red, spacing, white } from "../../../utils/utils.js";
import { joinInstance } from "../floor.js";
import { handleInviteCommand, handleAllInviteCommand } from "../invite.js";
import { handleFPSCommand, handlePingCommand, handleTPSCommand } from "../status.js";
import { handleRealRNGCommand } from "../realRNG.js";
import { sendIQMessage } from "../iq.js";
import { getSessionDungeonRuns, getSessionKuudraRuns } from "../runs.js";
import { sendPlaytime } from "../playtime.js";

let lastTimeUsed = 0;

register("chat", (player, message) => {
    if (!Settings.allCommandToggle) return;
    if (Date.now() - lastTimeUsed < 1000) return;
    avoidSlowDown(player, message, "party");
    lastTimeUsed = Date.now();
}).setCriteria(/^Party >(?: \[.+\])? (\w+)(?: [Ⓑ|ቾ|⚒])?: !(.+)/);

register("chat", (player, message) => {
    if (!Settings.allCommandToggle) return;
    if (Date.now() - lastTimeUsed < 1000) return;
    avoidSlowDown(player, message, "dm");
    lastTimeUsed = Date.now();
}).setCriteria(/^From(?: \[.+\])? (\w+): !(.+)/);

register("chat", (player, message) => {
    if (!Settings.allCommandToggle) return;
    if (!Settings.allChatToggle) return;
    if (Date.now() - lastTimeUsed < 3000) return;
    avoidSlowDown(player, message, "all");
    lastTimeUsed = Date.now();
}).setCriteria(/^\[\d+\](?: .+)?(?: \[.+\])? (\w+)(?: [Ⓑ|ቾ|⚒])?: !(.+)/);


/**
 * @param {String} player name
 * @param {String} message
 * @param {String} chatFrom "party", "dm", "all"
 */
export function avoidSlowDown(player, message, chatFrom) {
    if (player === Player.getName()) {
        setTimeout(() => {
            runCommand(player, message, chatFrom);
        }, 500);
    } else {
        runCommand(player, message, chatFrom);
    }
}


const isWhitelistEnabled = Settings.whitelistToggle;
const isWhiteOnlyLeader = Settings.whitelistOnlyBlockLeader;
const isBlackOnlyLeader = Settings.blacklistOnlyBlockLeader;
function handleCommandExecution(playerName, command) {
    const isInBlacklist = data.blacklist.name.includes(playerName);
    const isInWhitelist = data.whitelist.name.includes(playerName);
    const shouldDoCommand = (isWhitelistEnabled && (isInWhitelist || (isWhiteOnlyLeader && !isInWhitelist))) || (!isWhitelistEnabled && !isInBlacklist) || (isBlackOnlyLeader && isInBlacklist);
    if (shouldDoCommand) {
        command();
    } else if (isInBlacklist) {
        ChatLib.chat(`${formatPrefix + spacing + white}${playerName}${spacing + red}is in blacklist`);
    } else if (isWhitelistEnabled) {
        ChatLib.chat(`${formatPrefix + spacing + white}${playerName}${spacing + red}is not in whitelist`);
    }
}

function handleLeaderCommandExecution(playerName, command) {
    const isInBlacklist = data.blacklist.name.includes(playerName);
    const isInWhitelist = data.whitelist.name.includes(playerName);
    if ((isWhitelistEnabled && isInWhitelist) || (!isWhitelistEnabled && !isInBlacklist)) {
        command();
    } else if (isInBlacklist) {
        ChatLib.chat(`${formatPrefix + spacing + white}${playerName}${spacing + red}is in blacklist`);
    } else if (isWhitelistEnabled) {
        ChatLib.chat(`${formatPrefix + spacing + white}${playerName}${spacing + red}is not in whitelist`);
    }
}

function runCommand(player, message, chatFrom) {
    const lowerCasePlayerName = player.toString().toLowerCase();
    const parts = message.toString().toLowerCase().split(" ");
    const floorChat = parts[0].match(/^f(\d)$/);
    const masterChat = parts[0].match(/^m(\d)$/);
    const tierChat = parts[0].match(/^t(\d)$/);
    let doCommand = null;

    if (Party?.leader === Player.getName() || !Party.leader) {
        if (floorChat || masterChat || tierChat) {
            doCommand = joinInstance(floorChat, masterChat, tierChat);
        }
    }

    if (!floorChat && !masterChat && !tierChat) {
        switch (parts[0]) {
            case "help":
                if (!Settings.PartyHelp) return;
                ChatLib.command(`pc ${PartyCommandList}`);
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ leader ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "ptme":
            case "pt":
                if (!Settings.PartyPtme || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = `p transfer ${lowerCasePlayerName}`;
                break;
            case "warp":
            case "pwarp":
                if (!Settings.PartyWarp || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = "p warp";
                break;
            case "warptransfer":
            case "wt":
                if (!Settings.PartyWarpTransfer || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                handleLeaderCommandExecution(lowerCasePlayerName, () => {
                    ChatLib.command("p warp");
                    setTimeout(() => {
                        ChatLib.command(`p transfer ${lowerCasePlayerName}`);
                    }, 500);
                });
                break;
            case "inv":
            case "invite":
                if (!Settings.PartyInvite && !Settings.DMinvite) return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                handleLeaderCommandExecution(lowerCasePlayerName, () => {
                    handleInviteCommand(parts, lowerCasePlayerName, chatFrom);
                });
                break;
            case "allinv":
            case "allinvite":
                if (!Settings.PartyAllInv || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                handleAllInviteCommand(chatFrom);
                break;
            case "promote":
                if (!Settings.PartyPromote || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = `p promote ${parts[1]}`;
                break;
            case "kick":
            case "pkick":
                if (!Settings.PartyKick || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = `p kick ${parts[1]}`;
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ Utils ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "dt":
            case "downtime":
                if (!Settings.PartyDT || chatFrom === "dm") return;
                setDownTime(lowerCasePlayerName, parts);
                break;
            case "r":
            case "ready":
                setPlayerReady(lowerCasePlayerName);
                break;
            case "fps":
                if (!Settings.PartyFps || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    handleFPSCommand();
                });
                break;
            case "ping":
                if (!Settings.PartyPing || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    handlePingCommand();
                });
                break;
            case "tps":
                if (!Settings.PartyTps || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    handleTPSCommand();
                });
                break;
            case "power":
            case "enrich":
            case "mp":
            case "magical":
            case "tuning":
                if (!Settings.PartyPower || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    hasParty(chatFrom, `MP: ${data.profile.mp} | Power: ${data.profile.power} | Tuning: ${data.profile.tuning} | Enrich: ${data.profile.enrichAmount}, ${data.profile.enrich}`);
                });
                break;
            case "pet":
                if (!Settings.PartyPet || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    hasParty(chatFrom, `Pet: ${data.profile.pet}`);
                })
                break;
            case "coords":
            case "coord":
            case "whereareyou":
            case "xyz":
            case "waypoint":
                if (!Settings.PartyCoords || !Settings.DMCoords || !Settings.allChatToggle) return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    const coordinates = `x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`;
                    const commandMapping = {
                        party: { prefix: "pc", conditions: !Settings.PartyCoords },
                        dm: { prefix: "r", conditions: !Settings.DMCoords },
                        all: { prefix: "all", conditions: !Settings.allChatToggle }
                    };
                    if (commandMapping[chatFrom]) {
                        if (commandMapping[chatFrom].conditions) return;
                        ChatLib.command(`${commandMapping[chatFrom].prefix} ${coordinates}`)
                    } else {
                        ChatLib.chat(`${coordinates}`);
                    }
                });
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ Party ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "cf":
            case "coin":
            case "coinflip":
            case "flip":
                if (!Settings.PartyCoinFlip || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    hasParty(chatFrom, `${lowerCasePlayerName} rolled ${Math.floor(Math.random() * 2) === 0 ? "Heads" : "Tails"}`);
                });
                break;
            case "dice":
            case "roll":
                if (!Settings.PartyDice || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    hasParty(chatFrom, `${lowerCasePlayerName} rolled a ${1 + Math.floor(Math.random() * 6)}.`);
                });
                break;
            case "rng":
                if (!Settings.PartyRNG || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    const rngIGN = parts[1];
                    const rngChance = rngIGN === "sontaku" ? 100 : Math.floor(Math.random() * 100) + 1;
                    const targetIGN = rngIGN || lowerCasePlayerName;
                    hasParty(chatFrom, `${targetIGN} have ${rngChance}% RNG Chance.`)
                });
                break;
            case "rrng":
            case "realrng":
                if (!Settings.PartyRealRNG || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    handleRealRNGCommand(parts, chatFrom);
                });
                break;
            case "boop":
                if (!Settings.PartyBoop || chatFrom !== "dm") {
                    const boopIGN = parts[1];
                    const lowerCaseGetName = Player.getName().toLowerCase();
                    if (boopIGN !== lowerCasePlayerName) return;
                    handleCommandExecution(lowerCasePlayerName, () => {
                        const boopTarget = boopIGN || lowerCasePlayerName;
                        if (lowerCasePlayerName === lowerCaseGetName) return;
                        ChatLib.command(`boop ${boopTarget}`);
                    });
                }
                break;
            case "rps":
                if (!Settings.PartyRPS || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    enemyIGN = parts[1];
                    const lowerCaseGetName = Player.getName().toLowerCase();
                    const whatChoice = Math.floor(Math.random() * 3);
                    if (lowerCasePlayerName === lowerCaseGetName) {// me to enemy
                        responseWaitTime = 60;
                        isRPSActive = true;
                        RPSStarter = true;
                        checkEnemy();
                    } else if (enemyIGN === lowerCaseGetName) {// enemy from me
                        playerChoose = RPS[whatChoice];
                        isRPSActive = true;
                        ChatLib.command(`pc I choose ${playerChoose}`);
                    }
                });
                break;
            case "meow":
                if (!Settings.PartyMeow || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    const meowIGN = parts[1];
                    const lowerCaseGetName = Player.getName().toLowerCase();
                    if (meowIGN !== lowerCaseGetName) ChatLib.command(`tell ${meowIGN} meow`);
                });
                break;
            case "cute":
                if (!Settings.PartyCute || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    hasParty(chatFrom, `${lowerCasePlayerName} have ${Math.floor(Math.random() * 100) + 1}% Cute.`);
                });
                break;
            case "nowtime":
            case "timezone":
            case "time":
                if (!Settings.PartyTimeZone || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    hasParty(chatFrom, `${new Date().toLocaleTimeString()}`);
                });
                break;
            case "playtime":
                if (!Settings.PartyPlaytime || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    const timeType = parts[1] || undefined;
                    sendPlaytime(timeType, chatFrom);
                });
                break;
            case "runs":
                if (!Settings.PartyRuns || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    const runType = parts[1] || "dungeon";
                    if (runType === "kuudra") hasParty(chatFrom, `Today Kuudra Runs: ${getSessionKuudraRuns()}`);
                    else if (runType === "dungeon" || runType === "dungeons" || runType === "catacombs") hasParty(chatFrom, `Today Dungeon Runs: ${getSessionDungeonRuns()}`);
                });
                break;
            case "iq":
            case "iqtest":
                if (!Settings.PartyIQ || chatFrom === "dm") return;
                handleCommandExecution(lowerCasePlayerName, () => {
                    const iqIGN = parts[1];
                    const iqIs = Math.floor(Math.random() * 302);
                    if (iqIGN && iqIGN !== "sontaku") {
                        sendIQMessage(iqIGN, iqIs, chatFrom);
                    } else if (iqIGN === "sontaku") {
                        hasParty(chatFrom, `OMG!! ${lowerCasePlayerName} have 5000 IQ!! NO WAY!!`)
                    } else {
                        sendIQMessage(lowerCasePlayerName, iqIs, chatFrom);
                    }
                });
                break;
        }
    }

    if (doCommand) {
        handleLeaderCommandExecution(lowerCasePlayerName, () => {
            ChatLib.command(doCommand);
        });
    }
}