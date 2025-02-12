import Party from "./Class/party.js";

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
export const spacingLine = "-"

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
export const helpText = `${darkGreen + bold}Better Chat Command ${yellow + bold}v${version + darkGreen + bold} Command Info:
${green} /bcc ${darkGray}» ${gray}Open main mod GUI.
${green} /bcc settings ${darkGray}» ${gray}Open main mod GUI.
${green} /bcc version ${darkGray}» ${gray}Show BCC Version.
${green} /bcc help ${darkGray}» ${gray}Show This Chat.
${green} /bcc help party ${darkGray}» ${gray}Show PartyCommand Help.
${green} /bcc blacklist <Name> ${darkGray}» ${gray}Set or Delete to blacklist.
${green} /bcc whitelist <Name> ${darkGray}» ${gray}Set or Delete to whitelist.
${green} /bcc afterinvite <Name> ${darkGray}» ${gray}Send a party to a player when they join a game.
${green} /bcc stop ${darkGray}» ${gray}Stop rejoin when using !r.
${green} /bcc stoprequeue ${darkGray}» ${gray}Stop Requeue.
${green} /bcc confirm ${darkGray}» ${gray}confirm sending PartyInvite.
${green} /bcc cute ${darkGray}» ${gray}Relieve your daily fatigue with cute videos`

export const partyCommandHelpText = `${darkGreen + bold}Better Chat Command ${yellow + bold}v${version + darkGreen + bold} Party Command Info:
${darkGreen + bold}Leader Command:
${green} !pt ${darkGray}» ${gray}Transfer to the person who said it.
${green} !warp ${darkGray}» ${gray}do Party Warp.
${green} !wt ${darkGray}» ${gray}After warping, transfer to the person who said !wt.
${green} !inv <Name> ${darkGray}» ${gray}Invite player.
${green} !allinv ${darkGray}» ${gray}Set to AllInvite.
${green} !promote <Name> ${darkGray}» ${gray}Promote player.
${green} !kick <Name> ${darkGray}» ${gray}Kick player.
${darkGreen + bold}Utility Command:
${green} !dt <reason> ${darkGray}» ${gray}Notify after dungeon or kuudra is over.
${green} !r ${darkGray}» ${gray}If you use it after !dt, you will go to the floor you were on when you !dt..
${green} !fps ${darkGray}» ${gray}Send fps.
${green} !ping ${darkGray}» ${gray}Send ping
${green} !tps ${darkGray}» ${gray}Send tps
${green} !power ${darkGray}» ${gray}Send MP, Power, Tuning, Enrich
${green} !pet ${darkGray}» ${gray}Send pet
${green} !coords ${darkGray}» ${gray}Send Coords in patcher's format
${darkGreen + bold}Fun Command:
${green} !cf ${darkGray}» ${gray}Play Coin flip.
${green} !dice ${darkGray}» ${gray}Roll the dice.
${green} !rng <Name> ${darkGray}» ${gray}Send rng (this is not real chance. it's joke)
${green} !rrng <Type> ${darkGray}» ${gray}Send RealRNGChance (this is real chance.).
${green} !boop <Name> ${darkGray}» ${gray}Send boop to player.
${green} !rps <Name> ${darkGray}» ${gray}Play Rock Scissors Papers. (WIP).
${green} !meow <Name> ${darkGray}» ${gray}Send meow to player.
${green} !cute <Name> ${darkGray}» ${gray}Send how cute player.
${green} !time ${darkGray}» ${gray}Send now time.
${green} !playtime <Type> ${darkGray}» ${gray}Send playtime.
${green} !runs <Type> ${darkGray}» ${gray}Send Today Runs.
${green} !iq ${darkGray}» ${gray}Send how iq.`

export const PartyCommandList = "pt, warp, wt, inv, allinv, promote, kick, dt, r, fps, ping, tps, power, pet, coords, cf, dice, rng, rrng, boop, rps, meow, cute, time, playtime, runs, iq";

export const cutes = [
    "https://www.youtube.com/live/aXAsMcmtJTc?si=D63CguhtpGYQsYHi",
    "https://www.youtube.com/live/X6C2hpunZ8c?si=y0B87k5HThoSs-fE",
    "https://www.youtube.com/live/t2lUdipZvAs?si=pcVUa4c44jZRL-Hw",
    "https://www.youtube.com/live/HXp5x6llMo4?si=GsGAjS-D3BsIbDwr",
    "https://www.youtube.com/live/NqOmHpwMUxs?si=-JS587RWh2bObzeR",
    "https://www.youtube.com/live/abbR-Ttd-cA?si=7R0ofqHSPasIBQk3",
    "https://www.youtube.com/live/B4-L2nfGcuE?si=0Sb9EZyghaH-DObz",
    "https://www.youtube.com/live/2R034rQ9gtQ?si=qsJVzMsXJijZg-Hj"
];

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
        Party.isParty ? hasParty("party", chat) : hasParty("noParty", chat);
    }
}
