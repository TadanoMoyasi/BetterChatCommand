import request from "requestV2/index.js";
import Settings from "../config/general/generalConfig.js";
import { data } from "../data/data.js"
import { lists } from "./partyCommands/lists.js";
import { joinInstance } from "./partyCommands/floor.js";
import { changeConfirm } from "./partyCommands/invite.js";
import { changeStopReady } from "./partyCommands/downtime.js";
import { aqua, C01PacketChatMessage, cutes, darkGray, formatPrefix, green, helpText, partyCommandHelpText, red, reset, version, white, yellow } from "../utils/utils.js";
import { requeueStop } from "./autoRequeue.js";
import { resetInvite, setAfterInvite } from "./afterInvite.js";

let showChatPacket = false;
const showSlotId = false;

register("command", (...args) => {
    let floorChat = null;
    let masterChat = null;
    let tierChat = null;
    if (args === undefined) {
        Settings.openGUI();
        return;
    }
    const command = args[0].toLowerCase() || undefined;
    const name = args[1];
    let debugName = args[2];
    if (command) {
        floorChat = args[0].match(/f(\d)/i);
        masterChat = args[0].match(/m(\d)/i);
        tierChat = args[0].match(/t(\d)/i);
    }

    //ここらへん綺麗になった！おれてんさい！
    if (floorChat || masterChat || tierChat) {
        const doCommand = joinInstance(floorChat, masterChat, tierChat);
        if (doCommand) {
            ChatLib.command(doCommand);
            return;
        }
    }

    switch (command) {
        case undefined:
        case "setting":
        case "settings":
            Settings.openGUI();
            break;
        case "ver":
        case "version":
            ChatLib.chat(`${formatPrefix + aqua} You are currently on version ${yellow + version}`);
            break;
        case "help":
            name === "party" ? ChatLib.chat(partyCommandHelpText) : ChatLib.chat(helpText);
            break;
        case "blacklist":
            if (!name) {
                if (data.blacklist.name.length !== 0) {
                    ChatLib.chat(`${formatPrefix + darkGray} blacklist${white}: ${data.blacklist.name.toString()}`);
                } else {
                    ChatLib.chat(`${formatPrefix + red} Use /bcc blacklist <name> to blacklist a player.`);
                }
                break;
            }
            lists(name, "blacklist");
            break;
        case "whitelist":
            if (!name) {
                if (data.whitelist.name.length !== 0) {
                    ChatLib.chat(`${formatPrefix + white} Whitelist: ${data.whitelist.name.toString()}`);
                } else {
                    ChatLib.chat(`${formatPrefix + + red} Use /bcc whitelist <name> to whitelist a player.`);
                }
                break;
            }
            lists(name, "whitelist");
            break;
        case "cute": {
            const cuteNum = Math.floor(Math.random() * 6);
            const cuteVids = cutes[cuteNum];
            ChatLib.chat(`${green}Cute things are cute, that's why cute things are cute, and cute means cute, so cute is cute plus cute.${reset} \n${cuteVids}`);
            break;
        }
        case "stop":
            changeStopReady(true);
            ChatLib.chat(`${formatPrefix} Rejoin Stoped`);
            setTimeout(() => {
                changeStopReady(false);
            }, 5000);
            break;
        case "confirm":
            if (name === "all") {
                changeConfirm("all");
            } else {
                changeConfirm("confirm");
            }
            break;
        case "update":
            autoUpdate();
            break;
        case "stoprequeue":
            requeueStop();
            break;
        case "afterinvite":
            if (name === "reset") {
                resetInvite();
                return;
            }
            setAfterInvite(name);
            break;
        case "debug":
            if (!name) {
                ChatLib.chat("no debugtype");
            }
            switch (name) {
                case "firsttime":
                    data.firstTime = false;
                    data.save();
                    ChatLib.chat("firsttime set to false");
                    break;
                case "getuuid":
                    if (!debugName) {
                        ChatLib.chat("no name");
                        break;
                    }
                    debugName = debugName.toLowerCase();
                    request({
                        url: `https://api.mojang.com/users/profiles/minecraft/${debugName}`,
                        json: true
                    }).then((response) => {
                        const uuid = response.id;
                        const name = response.name;
                        new TextComponent(`${name}'s uuid: ${uuid}`)
                            .setClick("run_command", `/ct copy ${uuid}`)
                            .setHover("show_text", `${green}Click to copy uuid`)
                            .chat();
                    }).catch((e) => {
                        ChatLib.chat(`${formatPrefix + red} Error: ${white}${JSON.parse(e).errorMessage}`);
                    });
                    break;
                case "version":
                    if (!debugName) {
                        ChatLib.chat("no name");
                        break;
                    }
                    data.lastVersion = debugName;
                    data.save();
                    ChatLib.chat("lastVersion changed");
                    break;
                case "resetprofile":
                    data.profile.power = "nodata";
                    data.profile.tuning = "nodata";
                    data.profile.enrich = "nodata";
                    data.profile.enrichAmount = 0;
                    data.profile.mp = "nodata";
                    data.save();
                    ChatLib.chat("profileData reset");
                    break;
                case "canupdate":
                    canUpdate = true;
                    ChatLib.chat("canUpdate: true");
                    break;
                case "lookingat":
                    ChatLib.chat(Player.lookingAt());
                    break;
                case "resetmayor":
                    data.playtimes.mayor.playtime = 0;
                    data.save();
                    ChatLib.chat("mayorplaytime set to 0");
                    break;
                case "lookchat":
                    showChatPacket = !showChatPacket;
                    showChatPacket ? viewPacket.register() : viewPacket.unregister();
                    showChatPacket ? ChatLib.chat("lookChat on") : ChatLib.chat("lookChat off");
                    break;
                case "hold": {
                    if (Player.getContainer()) {
                        setTimeout(() => {
                            const inv = Player.getContainer();
                            const under = Client.currentGui.getSlotUnderMouse();
                            if (!under) return;
                            const index = under.getIndex();
                            const item = inv.getStackInSlot(index).getName();
                            debugName === "format" ? console.log(item) : console.log(ChatLib.removeFormatting(item));
                            return;
                        }, 3000);
                    }
                    const item = Player.getHeldItem().getName();
                    debugName === "format" ? console.log(item) : console.log(ChatLib.removeFormatting(item));
                    break;
                }
                case "lore": {
                    if (Player.getContainer()) {
                        setTimeout(() => {
                            const inv = Player.getContainer();
                            const under = Client.currentGui.getSlotUnderMouse();
                            if (!under) return;
                            const index = under.getIndex();
                            const lore = inv.getStackInSlot(index).getLore();
                            lore.forEach((line) => {
                                debugName === "console" ? console.log(line) : ChatLib.chat(line);
                            });
                            return;
                        }, 3000);
                    }
                    const lore = Player.getHeldItem().getLore();
                    lore.forEach((line) => {
                        debugName === "console" ? console.log(line) : ChatLib.chat(line);
                    });
                    break;
                }
                case "inv":
                    setTimeout(() => {
                        const inv = Player.getContainer();
                        if (!inv) return;
                        ChatLib.chat(inv.getName());
                    }, 3000);
                    break;
                case "id": {
                    const id = Player.getHeldItem().getID();
                    ChatLib.chat(id);
                    break;
                }
                case "slotid": {
                    showChatPacket = !showChatPacket;
                    showChatPacket ? sendSlotId.register() : sendSlotId.unregister();
                    showChatPacket ? ChatLib.chat("sendSlotId on") : ChatLib.chat("sendSlotId off");
                    break;
                }
                case "nbt": {
                    if (Player.getContainer()) {
                        setTimeout(() => {
                            const inv = Player.getContainer();
                            const under = Client.currentGui.getSlotUnderMouse();
                            if (!under) return;
                            const index = under.getIndex();
                            const nbt = inv.getStackInSlot(index).getNBT().toObject();
                            console.log(JSON.stringify(nbt, null, 4));
                            return;
                        }, 3000);
                    }
                    const item = Player.getHeldItem()?.getNBT();
                    console.log(item);
                    break;
                }
                case "tab":
                    if (!debugName) {
                        ChatLib.chat("no name");
                        return;
                    }
                    getTab(debugName);
                    break;
            }
            break;
        default:
            ChatLib.chat(`${formatPrefix + white} Ver ${version}. /bcc to open settings`);
    }
}).setCommandName("betterchatcommand").setAliases("bcc").setTabCompletions("version", "help", "blacklist", "whitelist", "cute", "afterinvite", "stop", "stoprequeue", "confirm", "update");

const viewPacket = register("packetSent", (packet, event) => {
    const message = packet.func_149439_c();
    ChatLib.chat(message);
}).setFilteredClass(C01PacketChatMessage).unregister();

const sendSlotId = register("guiMouseClick", (mx, my, mbtn, gui, event) => {
    const clickedSlot = Client.currentGui.getSlotUnderMouse();
    if (!clickedSlot) return;
    const index = clickedSlot.getIndex();
    ChatLib.chat(index);
}).unregister();

function getTab(text, format) {
    TabList?.getNames()?.forEach(line => {
        const unFormatLine = ChatLib.removeFormatting(line).trim();
        if (unFormatLine.includes(text)) {
            format ? ChatLib.chat(line) : ChatLib.chat(unFormatLine);
            return;
        }
    })
}
