/* -------------------------------------------------------------------------- */
/*                                  ColorCode                                 */
/* -------------------------------------------------------------------------- */

export const black = "§0";
export const darkBlue = "§1";
export const darkGreen = "§2";
export const darkAqua = "§3";
export const darkRed = "§4";
export const darkPurple = "§5";
export const gold = "§6";
export const gray = "§7";
export const darkGray = "§8";
export const blue = "§9";
export const green = "§a";
export const aqua = "§b";
export const red = "§c";
export const lightPurple = "§d";
export const yellow = "§e";
export const white = "§f";

// format
export const obfuscated = "§k";
export const bold = "§l";
export const strikeThrough = "§m";
export const underLine = "§n";
export const italic = "§o";
export const reset = "§r";
export const spacing = " ";

/* -------------------------------------------------------------------------- */
/*                                    Java                                    */
/* -------------------------------------------------------------------------- */

export const C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
export const S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
export const S03PacketTimeUpdate = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");
export const S37PacketStatistics = Java.type("net.minecraft.network.play.server.S37PacketStatistics");
export const C01PacketChatMessage = Java.type("net.minecraft.network.play.client.C01PacketChatMessage");
export const System = Java.type("java.lang.System");
export const File = Java.type("java.io.File");

/* -------------------------------------------------------------------------- */
/*                              BetterChatCommand                             */
/* -------------------------------------------------------------------------- */

export const metadata = JSON.parse(FileLib.read("BetterChatCommand", "metadata.json"));
export const version = metadata.version;
export const formatPrefix = "§8[§aBCC§8]§r";
export const unFormatPrefix = "[BCC]";

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

export function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    if (remainingSeconds < 10 && minutes !== 0) {
        remainingSeconds = `0${remainingSeconds}`;
    }

    if (hours === 0 && minutes === 0) {
        return `${remainingSeconds}s`;
    }
    if (hours === 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

export function getArea() {
    let area = 'null'
    try {
        TabList?.getNames()?.forEach(line => {
            const match = line.removeFormatting().match(/Area: (.+)/)
            if (line.removeFormatting() === "Dungeon: Catacombs") area = "Dungeons"
            if (!match) return
            area = match[1]
        })
    } catch (e) { }
    return area
}

import Party from "./Class/party";

/**
 * if "isParty", look Party.isParty
 * @param {String} chatFrom "noParty", "Party", "isParty"
 * @param {String} chat
 */
export function hasParty(chatFrom, chat) {
    if (chatFrom === "noParty") {
        ChatLib.chat(chat)
    } else if (chatFrom === "party") {
        ChatLib.command(`pc ${chat}`)
    } else if (chatFrom === "isParty") {
        if (Party.isParty) hasParty("party", chat);
        else hasParty("noParty", chat);
    }
}