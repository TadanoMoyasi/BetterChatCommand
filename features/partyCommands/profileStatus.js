import { data } from "../../data/data.js";
import packetChat from "../../utils/Class/packetChat.js";
import { getArea } from "../../utils/utils.js";

let scanned = false;
const celebrations = ["Aqua", "Black", "Green", "Lime", "Orange", "Pink", "Purple", "Red", "Yellow", "Flushed", "Happy", "Cheeky", "Cool", "Cute", "Derp", "Grumpy", "Regular", "Shock", "Tears"];
let enrichScanned = 0;
let enrichScannedAmount = 0;

register("guiClosed", () => {
    scanned = false;
})
register("tick", () => {
    const inv = Player.getContainer();
    if (scanned || !inv || !inv.getName().includes("Your Bags") && !inv.getName().includes("Accessory Bag") || getArea() === "Dungeons") return;
    scanned = true;
    Client.scheduleTask(4, () => {
        const items = inv.getItems();
        let mp = "";
        let power = "";
        let tuning = "";
        let enrichAmount = 0;
        let enrich = "";
        let max = 0;
        let now = 0;
        if (inv.getName().includes("Your Bags")) {
            const lore = inv.getStackInSlot(24).getLore();
            let canScanTuning = false;
            for (let line of lore) {
                line = ChatLib.removeFormatting(line);
                if (line.toString()?.includes("+") && canScanTuning) {
                    tuning += line.substring(line.indexOf("+") + 1, line.indexOf(" "));
                } else if (line.toString()?.includes("Magical Power:")) {
                    mp = line.substring(line.indexOf(":") + 2)
                } else if (line.toString()?.includes("Selected Power:")) {
                    power = line.substring(line.indexOf(":") + 2)
                } else if (line.toString()?.includes("Tuning:")) {
                    canScanTuning = true;
                }
            }
        } else if (inv.getName().includes("Accessory Bag Thaumaturgy")) {
            items.slice(9, 52).forEach(item => {
                if (!item || item.getID() !== 404 && item.getID() !== 160 || item.getName().removeFormatting() === " ") return;
                const lore = item.getLore();
                if (item.getID() === 404) {
                    for (let line of lore) {
                        line = ChatLib.removeFormatting(line)
                        if (line.toString()?.includes("+")) {
                            tuning += line.substring(line.indexOf("+") + 1, line.indexOf(" "))
                        } else if (line.toString()?.includes("Magical Power:")) {
                            mp = line.substring(line.indexOf(":") + 2)
                        }
                    }
                } else {
                    if (!item.isEnchanted()) return;
                    power = item.getName().removeFormatting();
                }
            })
        } else if (inv.getName().includes("Accessory Bag")) {
            const match = inv.getName().match(/Accessory Bag \((\d+)\/(\d+)\)/)
            now = Number(match[1]);
            max = Number(match[2]);
            if (enrichScanned !== now - 1) return;
            enrichScanned++;
            let enrichChecked = false;
            items.slice(0, inv.getSize() - 45).forEach(item => {
                if (!item) return;
                const lore = item.getLore();
                const removedItemName = ChatLib.removeFormatting(item.getName());
                const removedFirstItemName = removedItemName.split(" ")[0];
                if (!item.getName().startsWith("§d") && !item.getName().startsWith("§6") && !item.getName().startsWith("§d") && !celebrations.includes(removedFirstItemName)) return;
                let lines = 0;
                for (let line of lore) {
                    if (lines > 3) break;
                    lines++;
                    line = ChatLib.removeFormatting(line)
                    if (line.toString()?.includes("Enriched with")) {
                        enrichAmount++;
                        if (!enrichChecked) {
                            enrich = line.substring(14)
                            enrichChecked = true;
                        }
                        break;
                    }
                }
            })
        }
        if (mp) {
            data.profile.mp = mp;
        }
        if (power) {
            data.profile.power = power;
        }
        if (tuning) {
            data.profile.tuning = tuning;
        }
        if (enrichAmount !== 0) {
            if (max > now) {
                enrichScannedAmount += enrichAmount;
            } else if (max === now) {
                enrichScannedAmount += enrichAmount;
                data.profile.enrichAmount = enrichScannedAmount;
                enrichScannedAmount = 0;
                enrichScanned = 0;
            }
        }
        if (enrich !== "") {
            data.profile.enrich = enrich;
        }
        data.save();
    })
})

register("tick", () => {
    const inv = Player.getContainer();
    if (scanned || !inv || !inv.getName().includes("Your Bags") && !inv.getName().includes("Accessory Bag") || getArea() === "Dungeons") return;
    scanned = true;

    Client.scheduleTask(4, () => {
        const items = inv.getItems();
        let mp = "";
        let power = "";
        let tuning = "";
        let enrichAmount = 0;
        let enrich = "";
        let max = 0;
        let now = 0;

        if (inv.getName().includes("Your Bags")) {
            const lore = inv.getStackInSlot(24).getLore();
            tuning = extractTuningData(lore);
            const { mpResult, powerResult } = extractMpPowerData(lore);
            mp = mpResult;
            power = powerResult;
        } else if (inv.getName().includes("Accessory Bag Thaumaturgy")) {
            items.slice(9, 52).forEach(item => {
                if (!item || ![404, 160].includes(item.getID()) || item.getName().removeFormatting() === " ") return;
                const lore = item.getLore();
                if (item.getID() === 404) {
                    tuning += extractTuningData(lore);
                    const { mpResult, powerResult } = extractMpPowerData(lore);
                    mp = mpResult;
                    power = powerResult;
                } else {
                    if (!item.isEnchanted()) return;
                    power = item.getName().removeFormatting();
                }
            });
        } else if (inv.getName().includes("Accessory Bag")) {
            const match = inv.getName().match(/Accessory Bag \((\d+)\/(\d+)\)/);
            now = Number(match[1]);
            max = Number(match[2]);
            if (enrichScanned !== now - 1) return;
            enrichScanned++;
            let enrichChecked = false;
            items.slice(0, inv.getSize() - 45).forEach(item => {
                if (!item) return;
                const lore = item.getLore();
                const removedItemName = ChatLib.removeFormatting(item.getName());
                const removedFirstItemName = removedItemName.split(" ")[0];
                if (!item.getName().startsWith("§d") && !item.getName().startsWith("§6") && !celebrations.includes(removedFirstItemName)) return;

                let lines = 0;
                for (let line of lore) {
                    if (lines > 3) break;
                    lines++;
                    line = ChatLib.removeFormatting(line);
                    if (line.includes("Enriched with")) {
                        enrichAmount++;
                        if (!enrichChecked) {
                            enrich = line.substring(14);
                            enrichChecked = true;
                        }
                        break;
                    }
                }
            });
        }

        if (mp) data.profile.mp = mp;
        if (power) data.profile.power = power;
        if (tuning) data.profile.tuning = tuning;
        if (enrichAmount !== 0) {
            if (max > now) {
                enrichScannedAmount += enrichAmount;
            } else if (max === now) {
                enrichScannedAmount += enrichAmount;
                data.profile.enrichAmount = enrichScannedAmount;
                enrichScannedAmount = 0;
                enrichScanned = 0;
            }
        }
        if (enrich) data.profile.enrich = enrich;
        data.save();
    });
});

function extractTuningData(lore) {
    let result = "";
    let canScanTuning = false;
    for (let line of lore) {
        line = ChatLib.removeFormatting(line);
        if (line.includes("+") && canScanTuning) {
            result = line.substring(line.indexOf("+") + 1, line.indexOf(" "));
        } else if (line.includes("Tuning:")) {
            canScanTuning = true;
        }
    }
    return result;
};

function extractMpPowerData(lore) {
    let mpResult = "";
    let powerResult = "";
    for (let line of lore) {
        line = ChatLib.removeFormatting(line);
        if (line.includes("Magical Power:")) {
            mpResult = line.substring(line.indexOf(":") + 2);
        } else if (line.includes("Selected Power:")) {
            powerResult = line.substring(line.indexOf(":") + 2);
        }
    }
    return { mpResult, powerResult };
};


function setStatus(message) {
    if (/^You summoned your (.+)!/.test(message) || /^Autopet equipped your \[Lvl .+\] (.+)! VIEW RULE/.test(message)) {
        const match1 = message.match(/^You summoned your (.+)!/g);
        const match2 = message.match(/^Autopet equipped your \[Lvl .+\] (.+)! VIEW RULE/g);
        if (match1) data.profile.pet = match1[1];
        if (match2) data.profile.pet = match2[1];
    } else if (/^You despawned your .+!/.test(message)) {
        data.profile.pet = "none";
    } else if (/^Swapped (.+) enrichments to (.+)!/.test(message)) {
        const match = message.match(/^Swapped (.+) enrichments to (.+)!/g);
        data.profile.enrich = match[2];
        data.profile.enrichAmount = match[1];
    }
    data.save();
}

let first = false;
if (!first) {
    first = true;
    packetChat.add(["doFunc"], setStatus);
}