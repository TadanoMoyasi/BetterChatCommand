import packetChat from "../../utils/Class/packetChat.js";
import { data } from "../../data/data.js";
import { getNowFloor, getNowTier } from "../../utils/joinFloor.js";

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

const runsMapping = {
    kuudra: { prefix: "All", witch: sessionKuudraRuns },
    dungeon: { prefix: "All", witch: sessionDungeonRuns },
    catacombs: { prefix: "All", witch: sessionDungeonRuns },
    dungeons: { prefix: "All", witch: sessionDungeonRuns },
    entrance: { prefix: "Entrance", witch: sessionDungeonRuns },
    f1: { prefix: "F1", witch: sessionDungeonRuns },
    f2: { prefix: "F2", witch: sessionDungeonRuns },
    f3: { prefix: "F3", witch: sessionDungeonRuns },
    f4: { prefix: "F4", witch: sessionDungeonRuns },
    f5: { prefix: "F5", witch: sessionDungeonRuns },
    f6: { prefix: "F6", witch: sessionDungeonRuns },
    f7: { prefix: "F7", witch: sessionDungeonRuns },
    m1: { prefix: "M1", witch: sessionDungeonRuns },
    m2: { prefix: "M2", witch: sessionDungeonRuns },
    m3: { prefix: "M3", witch: sessionDungeonRuns },
    m4: { prefix: "M4", witch: sessionDungeonRuns },
    m5: { prefix: "M5", witch: sessionDungeonRuns },
    m6: { prefix: "M6", witch: sessionDungeonRuns },
    m7: { prefix: "M7", witch: sessionDungeonRuns },
    basic: { prefix: "Basic", witch: sessionKuudraRuns },
    hot: { prefix: "Hot", witch: sessionKuudraRuns },
    burning: { prefix: "Burning", witch: sessionKuudraRuns },
    fiery: { prefix: "Fiery", witch: sessionKuudraRuns },
    infernal: { prefix: "Infernal", witch: sessionKuudraRuns },
    t1: { prefix: "Basic", witch: sessionKuudraRuns },
    t2: { prefix: "Hot", witch: sessionKuudraRuns },
    t3: { prefix: "Burning", witch: sessionKuudraRuns },
    t4: { prefix: "Fiery", witch: sessionKuudraRuns },
    t5: { prefix: "Infernal", witch: sessionKuudraRuns }
}

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

export function getRuns(type) {
    if (type === "Kuudra") return sessionKuudraRuns;
    if (type === "Dungeon") return sessionDungeonRuns;
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

function getSessionKuudraRuns(type) {
    const keys = Object.keys(sessionKuudraRuns);
    if (!keys.includes(type)) return;
    return sessionKuudraRuns[type];
}
function getSessionDungeonRuns(type) {
    const keys = Object.keys(sessionDungeonRuns);
    if (!keys.includes(type)) return;
    return sessionDungeonRuns[type];
}

export function sessionFilter(type) {
    const { prefix, witch } = runsMapping[type];
    if (prefix === undefined) return null;
    if (witch === sessionDungeonRuns) return [prefix, getSessionDungeonRuns(prefix)];
    return [prefix, getSessionKuudraRuns(prefix)]
}