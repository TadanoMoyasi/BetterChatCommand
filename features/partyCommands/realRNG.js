import packetChat from "../../utils/Class/packetChat.js";
import { data } from "../../data/data.js";
import { getNowFloor } from "../../utils/joinFloor.js";
import { hasParty } from "../../utils/utils.js";

const rngValue = JSON.parse(FileLib.read("BetterChatCommand", "data/RNGValues.json"));

const slayerMapping = {
    zombie: { slayer: "Zombie", prefix: "ZombieRNG" },
    revenant: { slayer: "Zombie", prefix: "ZombieRNG" },
    zsl: { slayer: "Zombie", prefix: "ZombieRNG" },
    spider: { slayer: "Spider", prefix: "SpiderRNG" },
    tarantula: { slayer: "Spider", prefix: "SpiderRNG" },
    packmaster: { slayer: "Wolf", prefix: "WolfRNG" },
    pack: { slayer: "Wolf", prefix: "WolfRNG" },
    wolf: { slayer: "Wolf", prefix: "WolfRNG" },
    sven: { slayer: "Wolf", prefix: "WolfRNG" },
    wsl: { slayer: "Wolf", prefix: "WolfRNG" },
    enderman: { slayer: "Enderman", prefix: "EndermanRNG" },
    end: { slayer: "Enderman", prefix: "EndermanRNG" },
    void: { slayer: "Enderman", prefix: "EndermanRNG" },
    voidgloom: { slayer: "Enderman", prefix: "EndermanRNG" },
    seraph: { slayer: "Enderman", prefix: "EndermanRNG" },
    esl: { slayer: "Enderman", prefix: "EndermanRNG" },
    vampire: { slayer: "Vampire", prefix: "VampireRNG" },
    vamp: { slayer: "Vampire", prefix: "VampireRNG" },
    rift: { slayer: "Vampire", prefix: "VampireRNG" },
    vsl: { slayer: "Vampire", prefix: "VampireRNG" },
    blaze: { slayer: "Blaze", prefix: "BlazeRNG" },
    inferno: { slayer: "Blaze", prefix: "BlazeRNG" },
    demonlord: { slayer: "Blaze", prefix: "BlazeRNG" },
    bsl: { slayer: "Blaze", prefix: "BlazeRNG" }
};

const dungeonMapping = {
    f1: { type: "Normal", floor: "F1", prefix: "F1RNG" },
    f2: { type: "Normal", floor: "F2", prefix: "F2RNG" },
    f3: { type: "Normal", floor: "F3", prefix: "F3RNG" },
    f4: { type: "Normal", floor: "F4", prefix: "F4RNG" },
    f5: { type: "Normal", floor: "F5", prefix: "F5RNG" },
    f6: { type: "Normal", floor: "F6", prefix: "F6RNG" },
    f7: { type: "Normal", floor: "F7", prefix: "F7RNG" },
    m1: { type: "Master", floor: "M1", prefix: "M1RNG" },
    m2: { type: "Master", floor: "M2", prefix: "M2RNG" },
    m3: { type: "Master", floor: "M3", prefix: "M3RNG" },
    m4: { type: "Master", floor: "M4", prefix: "M4RNG" },
    m5: { type: "Master", floor: "M5", prefix: "M5RNG" },
    m6: { type: "Master", floor: "M6", prefix: "M6RNG" },
    m7: { type: "Master", floor: "M7", prefix: "M7RNG" },
};

const rngMapping = {
    nucleus: { type: null, prefix: "NucleusRNG" },
    crystal: { type: null, prefix: "NucleusRNG" },
    cn: { type: null, prefix: "NucleusRNG" },
    experiment: { type: true, prefix: "ExperimentRNG" },
    table: { type: true, prefix: "ExperimentRNG" },
    enchant: { type: true, prefix: "ExperimentRNG" },
    enchanting: { type: true, prefix: "ExperimentRNG" }
}

/**
 * @param {string} meterType Nucleus, Dungeon, Slayer
 * @param {string|null} typeDetail Normal, Master, SlayerType
 * @param {string|null} floorType Floor
 * @returns {string} persent
 */
function changeToPercent(meterType, typeDetail, floorType) {
    let percent = "";
    if (meterType === "Slayer") {
        percent = ((data.RNG.Slayer[typeDetail].xp * 100) / rngValue.Slayer[typeDetail][data.RNG.Slayer[typeDetail].item]).toFixed(1).toString();
    } else if (meterType === "Dungeon") {
        percent = ((data.RNG.Catacombs[typeDetail][floorType].xp * 100) / rngValue.Dungeon[floorType][data.RNG.Catacombs[typeDetail][floorType].item]).toFixed(1).toString();
    } else if (meterType === "Nucleus") {
        percent = ((data.RNG.Nucleus.xp * 100) / rngValue.Nucleus[data.RNG.Nucleus.item]).toFixed(1).toString();
    } else if (meterType === "Experiment") {
        percent = ((data.RNG.Experiment.xp * 100) / rngValue.Experiment[data.RNG.Experiment.item]).toFixed(1).toString();
    }
    return percent;
}

export function handleRealRNGCommand(parts, chatFrom) {
    const rngType = parts[1];
    const rngSlayer = data.RNG.Slayer;
    const catacombsNormal = data.RNG.Catacombs.Normal;
    const catacombsMaster = data.RNG.Catacombs.Master;

    if (rngType === "help") {
        hasParty(chatFrom, "rrng <rngtype>");
    } else if (slayerMapping[rngType]) {
        const { slayer, prefix } = slayerMapping[rngType];
        const rngData = rngSlayer[slayer].item
        const percent = changeToPercent("Slayer", slayer);
        hasParty(chatFrom, `${prefix}: ${rngData}, ${percent}%`);
    } else if (dungeonMapping[rngType]) {
        const { type, floor, prefix } = dungeonMapping[rngType];
        const rngData = type === "Normal" ? catacombsNormal[floor].item : catacombsMaster[floor].item;
        const percent = changeToPercent("Dungeon", type, floor);
        hasParty(chatFrom, `${prefix}: ${rngData}, ${percent}%`);
    } else if (rngMapping[rngType]) {
        const { type, prefix } = rngMapping[rngType];
        const rngData = type ? data.RNG.Experiment.item : data.RNG.Nucleus.item;
        const percent = changeToPercent(type ? "Experiment" : "Nucleus");
        hasParty(chatFrom, `${prefix}: ${rngData}, ${percent}%`);
    }
}

let scanned = false;
register("guiClosed", () => {
    scanned = false;
})
register("tick", () => {
    const inv = Player.getContainer();
    if (scanned || !inv || !inv.getName().includes("RNG Meter")) return;
    scanned = true;
    Client.scheduleTask(4, () => {
        const items = inv.getItems();
        if (inv.getName().includes("Slayer RNG Meter")) {
            processSlayerRNG(items, data.RNG.Slayer);
        } else if (inv.getName().includes("Catacombs RNG Meter")) {
            processCatacombsRNG(items, data.RNG.Catacombs);
        } else if (inv.getName().includes("Crystal Nucleus RNG Meter")) {
            const lore = inv.getStackInSlot(4).getLore();
            processNucleusRNG(lore, data.RNG.Nucleus);
        } else if (inv.getName().includes("Experimentation Table RNG")) {
            const lore = inv.getStackInSlot(4).getLore();
            processExperimentRNG(lore, data.RNG.Experiment);
        } else {
            const nucLore = inv.getStackInSlot(16).getLore();
            processNucleusRNG(nucLore, data.RNG.Nucleus);
            const expLore = inv.getStackInSlot(10).getLore();
            processExperimentRNG(expLore, data.RNG.Experiment);
        }
        data.save();
    });
});

function processSlayerRNG(items, rngSlayer) {
    const slayerType = ["Zombie", "Spider", "Wolf", "", "Enderman", "Vampire", "Blaze"];
    let slayerScanned = 0;
    items.slice(19, 26).forEach(item => {
        const lore = item?.getLore();
        if (!lore) {
            slayerScanned++;
            return;
        }
        let scanLine = 0;
        const slayer = slayerType[slayerScanned];
        for (let line of lore) {
            scanLine--;
            line = ChatLib.removeFormatting(line);
            if (line.toString()?.includes("Selected Drop")) {
                scanLine = 2;
            } else if (line.endsWith("k") || line.endsWith("M")) {
                rngSlayer[slayer].xp = Number(line.substring(26, line.indexOf("/")).replace(/,/g, ""));
            } else if (line.toString()?.includes("Stored Slayer XP:")) {
                rngSlayer[slayer].item = "unSelected";
                rngSlayer[slayer].xp = Number(line.substring(line.indexOf(":") + 2).replace(/,/g, ""));
            }
            if (scanLine === 1) {
                rngSlayer[slayer].item = line.substring(0);
            }
        }
        slayerScanned++;
    });
}

function processCatacombsRNG(items, rngCatacombs) {
    let catacombsFloor = 1;
    let catacombsType = "Normal";
    items.slice(19, 35).forEach(item => {
        const lore = item?.getLore();
        let scanLine = 0;
        for (let line of lore) {
            scanLine--;
            line = ChatLib.removeFormatting(line);
            if (line.toString()?.includes("M1")) {
                catacombsType = "Master";
                catacombsFloor = 1;
            } else if (line.toString()?.includes("Selected Drop")) {
                scanLine = 2;
            } else if (line.endsWith("k")) {
                const floorKey = catacombsType === "Normal" ? `F${catacombsFloor}` : `M${catacombsFloor}`;
                rngCatacombs[catacombsType][floorKey].xp = Number(line.substring(26, line.indexOf("/")).replace(/,/g, ""));
            } else if (line.toString()?.includes("Stored Dungeon Score:")) {
                const floorKey = catacombsType === "Normal" ? `F${catacombsFloor}` : `M${catacombsFloor}`;
                rngCatacombs[catacombsType][floorKey].item = "unSelected";
                rngCatacombs[catacombsType][floorKey].xp = Number(line.substring(line.indexOf(":") + 2).replace(/,/g, ""));
            }
            if (scanLine === 1) {
                const floorKey = catacombsType === "Normal" ? `F${catacombsFloor}` : `M${catacombsFloor}`;
                rngCatacombs[catacombsType][floorKey].item = line.substring(0);
            }
        }
        catacombsFloor++;
    });
}

function processNucleusRNG(lore, rngNucleus) {
    let scanLine = 0;
    for (let line of lore) {
        scanLine--;
        line = ChatLib.removeFormatting(line);
        if (line.toString()?.includes("Selected Drop")) {
            scanLine = 2;
        } else if (line.endsWith("k") || line.endsWith("M")) {
            rngNucleus.xp = Number(line.substring(26, line.indexOf("/")).replace(/,/g, ""));
        } else if (line.toString()?.includes("Stored Nucleus XP:")) {
            rngNucleus.item = "unSelected";
            rngNucleus.xp = Number(line.substring(line.indexOf(":") + 2).replace(/,/g, ""));
        }
        if (scanLine === 1) {
            rngNucleus.item = line.substring(0);
        }
    }
}

function processExperimentRNG(lore, rngExperiment) {
    let scanLine = 0;
    for (let line of lore) {
        scanLine--;
        line = ChatLib.removeFormatting(line);
        if (line.toString()?.includes("Selected Drop")) {
            scanLine = 2;
        } else if (line.endsWith("k") || line.endsWith("M")) {
            rngExperiment.xp = Number(line.substring(26, line.indexOf("/")).replace(/,/g, ""));
        } else if (line.toString()?.includes("Stored Experimental XP:")) {
            rngExperiment.item = "unSelected";
            rngExperiment.xp = Number(line.substring(line.indexOf(":") + 2).replace(/,/g, ""));
        }
        if (scanLine === 1) {
            rngExperiment.item = line.substring(0);
        }
    }
}

// RNG METER! Reselected the Gabagool Distillate for Blaze Slayer! CLICK HERE to select a new drop!
// RNG METER! Reselected the Necron's Handle for Catacombs - Floor 7 (Master Mode)! CLICK HERE to select a new drop!
// RNG METER! Reselected the Looting V for Experimentation Table RNG Meter! CLICK HERE to select a new drop!
function RNGReset(message) {
    if (message.includes("Catacombs")) {
        let MM = false;
        const match = message.match(/^RNG METER! Reselected .+ for Catacombs - (.+)! CLICK HERE to select a new drop!/);
        if (!match) return;
        let Floor = match[1];
        if (Floor.includes("Master")) {
            MM = true;
            Floor = Floor.substring(0, Floor.indexOf("(") - 1);
        }
        Floor = Floor.replace(/[F\d]/g, "");
        const type = MM ? "Master" : "Normal";
        data.RNG.Catacombs[type][Floor].xp = 0;
    } else if (message.includes("Slayer")) {
        const match = message.match(/^RNG METER! Reselected .+ for (.+) Slayer! CLICK HERE to select a new drop!/);
        if (!match) return;
        const slayerType = match[1];
        data.RNG.Slayer[slayerType].xp = 0;
    } else if (message.includes("Experimentation")) {
        data.RNG.Experiment.xp = 0;
    }
}

let nowSlayer = null;

register("chat", (xp) => {
    if (!nowSlayer) return;
    data.RNG.Slayer[nowSlayer].xp = xp;
}).setCriteria(/^ *RNG Meter - ([\d,]+) Stored XP$/);

register("chat", (mob) => {
    if (mob === "Spiders") nowSlayer = "Spider";
    else if (mob === "Zombies") nowSlayer = "Zombie";
    else if (mob === "Wolves") nowSlayer = "Wolf";
    else if (mob === "Endermen") nowSlayer = "Enderman";
    else if (mob === "Blazes") nowSlayer = "Blaze";
    else if (mob === "Vampires") nowSlayer = "Vampire";
}).setCriteria(/^ *» Slay .+ Combat XP worth of (\w+).$/);

let rngAdded = false;
register("worldUnload", () => {
    rngAdded = false;
})
function addDungeonRNG(match) {
    if (rngAdded) return;
    rngAdded = true;
    const numScore = Number(match[1]);
    let addScore = 0;
    if (numScore < 270) return;
    if (numScore >= 270 && numScore < 300) {
        addScore = Math.floor(numScore * 0.7)
    } else if (numScore >= 300) {
        addScore = numScore;
    }
    const floor = getNowFloor();
    const CatacombsType = floor.includes("M") ? "Master" : "Normal";
    if (typeof data.RNG.Catacombs[CatacombsType][floor].xp === "string") {
        data.RNG.Catacombs[CatacombsType][floor].xp = Number(data.RNG.Catacombs[CatacombsType][floor].xp);
    }
    data.RNG.Catacombs[CatacombsType][floor].xp += addScore;
    data.save();
}

let first = false;
if (!first) {
    first = true;
    packetChat.add("doFunc", RNGReset);
    packetChat.add(["match", /^ *Team Score: (\d+) \(.+\)$/], addDungeonRNG);
}