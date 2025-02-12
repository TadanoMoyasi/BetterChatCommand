import { data } from "../../data/data";
import packetChat from "../../utils/Class/packetChat";
import { getNowFloor, getNowTier } from "../../utils/joinFloor";

const sessionDungeonRuns = {
    All: 0,
    Entrance: 0,
    F1: 0,
    F2: 0,
    F3: 0,
    F4: 0,
    F5: 0,
    F6: 0,
    F7: 0,
    M1: 0,
    M2: 0,
    M3: 0,
    M4: 0,
    M5: 0,
    M6: 0,
    M7: 0
};

const dungeonAssign = { ...sessionDungeonRuns };

const sessionKuudraRuns = {
    All: 0,
    Basic: 0,
    Hot: 0,
    Burning: 0,
    Fiery: 0,
    Infernal: 0
};

const kuudraAssign = { ...sessionKuudraRuns };

let first = false;
if (!first) {
    first = true;
    packetChat.add(["test", /^ *KUUDRA DOWN!/], addSessionKuudraRuns);
    packetChat.add(["test", /^ *> EXTRA STATS </], addSessionDungeonRuns);
}

function addSessionKuudraRuns() {
    const tier = getNowTier();
    if (!tier) return;
    sessionKuudraRuns[tier]++;
    sessionKuudraRuns.All++;
}

function addSessionDungeonRuns() {
    const floor = getNowFloor();
    if (!floor) return;
    sessionDungeonRuns[floor]++;
    sessionDungeonRuns.All++;
}

export function setRuns(kuudra, dungeon) {
    Object.assign(sessionDungeonRuns, dungeon);
    Object.assign(sessionKuudraRuns, kuudra);
}

export function resetRuns() {
    Object.assign(sessionDungeonRuns, dungeonAssign);
    Object.assign(sessionKuudraRuns, kuudraAssign);
    Object.assign(data.todayData.dungeon, dungeonAssign);
    Object.assign(data.todayData.kuudra, kuudraAssign);
    data.save();
}

export function getSessionKuudraRuns() { return sessionKuudraRuns; }
export function getSessionDungeonRuns() { return sessionDungeonRuns; }