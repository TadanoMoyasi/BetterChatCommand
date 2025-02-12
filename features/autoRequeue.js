import Settings from "../config/general/generalConfig.js"
import packetChat from "../utils/Class/packetChat.js";
import { getJoinFloor } from "../utils/joinFloor.js";
import { formatPrefix, green } from "../utils/utils.js";
let stopRequeue = false;
let requeued = false;

export function requeueStop() {
    if (!Settings.autoRequeueToggle) return;
    if (requeued || stopRequeue) return;
    stopRequeue = true;
    ChatLib.chat(`${formatPrefix + green} AutoRequeue Stopped`);
}

function autoRequeue() {
    if (!Settings.autoRequeueToggle) return;
    requeued = false;
    if (Party?.leader === Player.getName() || Party.leader == null) {
        setTimeout(() => {
            if (stopRequeue) {
                stopRequeue = false;
                return;
            }
            let command = Settings.autoRequeueType ? "joininstance" : "instancerequeue";
            if (command === "joininstance") command += getJoinFloor();
            ChatLib.command(command);
            requeued = true;
            setTimeout(() => {
                requeued = false;
            }, 5000);
        }, Settings.autoRequeueTime * 1000);
    }
}


let first = false;
if (!first) {
    first = true;
    packetChat.add(["test", / *> EXTRA STATS <| *KUUDRA DOWN!| *DEFEAT/], autoRequeue);
    packetChat.add(["test", /(?:\[.+\] )?\w+ left the party\./], requeueStop);
}