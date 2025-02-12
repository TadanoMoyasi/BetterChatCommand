import Settings from "../../config/general/generalConfig.js";
import Party from "../../utils/Class/party.js";
import { formatPrefix, green, lightPurple } from "../../utils/utils.js";

let confirm = false;
let confirmWaitTime = 0;
let allInvConfirm = false;
let allInviteConfirmWaitTime = 0;

export function handleInviteCommand(parts, lowerCasePlayerName, chatFrom) {
    if (!Settings.PartyInvite && !Settings.DMinvite) return;
    if (Party?.leader !== Player.getName() && Party.leader != null) return;
    const invIGN = parts[1];
    if (chatFrom === "party") {
        if (Settings.PartyInviteConfirm) {
            confirmWaitTime = 60;
            inviteConfirm(invIGN);
            setTimeout(() => {
                new TextComponent(`${formatPrefix} Click to invite ${lightPurple}${invIGN}.`)
                    .setClick("run_command", "/bcc confirm")
                    .setHover("show_text", `${green}Click to invite!`)
                    .chat();
            }, 50);
        } else {
            ChatLib.command(`p invite ${invIGN}`);
        }
    } else if (chatFrom === "dm") {
        if (Settings.PartyInviteConfirm) {
            inviteConfirm(lowerCasePlayerName);
            setTimeout(() => {
                new TextComponent(`${formatPrefix} Click to invite ${lightPurple}${lowerCasePlayerName}.`)
                    .setClick("run_command", "/bcc confirm")
                    .setHover("show_text", `${green}Click to invite!`)
                    .chat();
            }, 50);
        } else {
            ChatLib.command(`p invite ${lowerCasePlayerName}`);
        }
    }
}

export function handleAllInviteCommand(chatFrom) {
    if (!Settings.PartyAllInv || chatFrom !== "party") return;
    if (Party?.leader !== Player.getName() && Party.leader != null) return;
    if (Settings.PartyInviteConfirm) {
        allInviteConfirmWaitTime = 60;
        allInviteConfirm(invIGN);
        setTimeout(() => {
            new TextComponent(`${formatPrefix} Click to set allInvite.`)
                .setClick("run_command", "/bcc confirm all")
                .setHover("show_text", `${green}Click to set allInvite.`)
                .chat();
        }, 50);
    } else {
        ChatLib.command("p settings allinvite");
    }
}

function allInviteConfirm() {
    if (allInvConfirm) {
        ChatLib.command("p settings allinvite");
        allInviteConfirmWaitTime = 0;
        allInvConfirm = false;
    } else {
        if (allInviteConfirmWaitTime === 0) return;
        setTimeout(() => {
            allInviteConfirmWaitTime--;
            allInviteConfirm();
        }, 1000);
    }
}

function inviteConfirm(inviteName) {
    if (confirm) {
        ChatLib.command(`p invite ${inviteName}`);
        confirmWaitTime = 0;
        confirm = false;
    } else {
        if (confirmWaitTime === 0) return;
        setTimeout(() => {
            confirmWaitTime--;
            inviteConfirm(inviteName);
        }, 1000);
    }
}

export function changeConfirm(value) {
    if (value === "confirm") {
        confirm = true;
    } else if (value === "all") {
        allInvConfirm = true;
    }
}
