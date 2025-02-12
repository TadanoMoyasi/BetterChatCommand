import packetChat from "../utils/Class/packetChat.js";
import { formatPrefix } from "../utils/utils.js";

const inviteList = [];

function afterInvite(match) {
    const lowerPlayerName = match[1].toLowerCase();
    if (!inviteList.includes(lowerPlayerName)) return;
    setTimeout(() => {
        ChatLib.command(`p ${lowerPlayerName}`)
    }, 2000);
    const pos = inviteList.indexOf(lowerPlayerName);
    inviteList.splice(pos, 1);
}

export function setAfterInvite(player) {
    inviteList.push(player.toLowerCase());
    ChatLib.chat(`${formatPrefix} ${player} set to AfterInviteList`);
}

export function resetInvite() {
    inviteList.splice(0);
    ChatLib.chat(`${formatPrefix} AfterInviteList has been reset.`);
}

let first = false;
if (!first) {
    first = true;
    packetChat.add(["match", /\w+ > (.+) joined\./], afterInvite);
}