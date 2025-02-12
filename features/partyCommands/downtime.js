import Settings from '../../config/general/generalConfig';
import packetChat from '../../utils/Class/packetChat';
import { getJoinFloor } from '../../utils/joinFloor';
import { formatPrefix, green, red, spacing } from '../../utils/utils';
import { getSomefeatures } from '../core';

//dt
let afterDownTime = false;
let downTimePlayer = [];
let downTimeReason = [];
let saidDT = false;
//ready
let afterReady = false;
let readyPlayer = [];
let stopReady = false;

export function setDownTime(playerName, parts) {
    afterDownTime = true;
    afterReady = true;
    if (!downTimePlayer.includes(playerName)) {
        downTimePlayer.push(playerName);
        if (parts.length !== 1) {
            let reason = parts[1];
            if (2 < parts.length) {
                for (let re = 2; re < parts.length; re++) {
                    reason += ` ${parts[re]}`;
                }
            }
            downTimeReason.push(reason);
        } else if (parts.length === 1) {
            downTimeReason.push("No reason Given");
        }
        ChatLib.chat(`${formatPrefix} ${green}Reminder set for the end of the run`);
    }
    if (Settings.PartyReady) {
        if (!readyPlayer.includes(playerName)) {
            readyPlayer.push(playerName);
        }
    }
    if (getSomefeatures()) {
        ChatLib.command("somefeaturesrequeuestop", true);
    }
}

function downTime() {
    if (!Settings.allCommandToggle) return;
    if (!Settings.PartyDT) return;
    if (!afterDownTime) return;
    if (saidDT) return;
    let dtChat = "pc Need dt: ";
    for (let i = 0; i < downTimePlayer.length; i++) {
        dtChat += `${downTimePlayer[i]}: ${downTimeReason[i]}`;
        if (i < downTimePlayer.length - 1) {
            dtChat += ", ";
        }
    }
    saidDT = true;
    setTimeout(() => {
        ChatLib.command(dtChat);
        Client.showTitle(`${red}DownTime`, "", 0, 20, 0);
        Client.showTitle(`${red}DownTime`, "", 0, 20, 0);
    }, 1000);
    setTimeout(() => {
        saidDT = false;
        afterDownTime = false;
        downTimePlayer = [];
        downTimeReason = [];
    }, 5000);
}

// ■■■   ■■■    ■    ■■    ■    ■
// ■  ■  ■     ■ ■   ■  ■   ■  ■
// ■■■   ■■■  ■■■■■  ■  ■    ■
// ■ ■   ■    ■   ■  ■  ■    ■
// ■  ■  ■■■  ■   ■  ■■■     ■
export function setPlayerReady(readyName) {
    if (!Settings.PartyReady) return;
    if (!afterReady) return;
    if (readyPlayer.length === 0) return;
    if (readyPlayer.includes(readyName)) {
        const spl = readyPlayer.indexOf(readyName);
        readyPlayer.splice(spl, 1);
    }
    if (readyPlayer.length === 0) {
        const readyText = `${formatPrefix} Checked the ready status of all players who !dt'd. After 3 seconds, you will automatically enter the floor you were previously on. click chat to stop rejoin!`;
        new TextComponent(readyText)
            .setClick("run_command", "/bcc stop")
            .setHover("show_text", `${green}Click to stop rejoin!`)
            .chat();
        setTimeout(() => {
            if (!stopReady) {
                if (!getJoinFloor()) {
                    ChatLib.chat(`${formatPrefix + spacing + red}failed to get previous floor`);
                } else {
                    ChatLib.command(`joininstance ${getJoinFloor()}`);
                }
            }
            afterReady = false;
            stopReady = false;
            readyPlayer = [];
        }, 3000);
    } else {
        ChatLib.chat(`${formatPrefix} still have dt player`);
    }
}

function resetDungeonReady() {
    if (downTimePlayer.length !== 0) return;
    afterReady = false;
    stopReady = false;
    readyPlayer = [];
}

function resetKuudraReady() {
    if (downTimePlayer.length !== 0) return;
    afterReady = false;
    stopReady = false;
    readyPlayer = [];
}

export function changeStopReady(value) {
    stopReady = value;
}


let first = false;
if (!first) {
    first = true;
    packetChat.add(/ *> EXTRA STATS <| *KUUDRA DOWN!| *DEFEAT/, downTime);
    packetChat.add(/[NPC] Mort: You should find it useful if you get lost./, resetDungeonReady);
    packetChat.add(/[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!/, resetKuudraReady);
}