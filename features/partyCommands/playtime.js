import { data } from "../../data/data.js";
import { formatSeconds, hasParty } from "../../utils/utils.js";

register("chat", (hour, minutes) => {
    if (!Settings.AllCommandToggle) return;
    const playtimes = `${hour}h${minutes}m`;
    data.playtimes.all = playtimes;
}).setCriteria(/^You have (.+) hours and (.+) minutes playtime!$/);

let scanned = false;
register("guiClosed", () => {
    scanned = false;
})
register("tick", () => {
    const inv = Player.getContainer();
    if (scanned || !inv || inv.getName() !== "Detailed /playtime") return;
    const locations = [
        { name: "Crimson", key: "Crimson" },
        { name: "Crystal", key: "Crystal" },
        { name: "Dark Auction", key: "Dark" },
        { name: "Deep", key: "Deep" },
        { name: "Dungeon Hub", key: "DHub" },
        { name: "Dungeon", key: "Dungeon" },
        { name: "Dwarven", key: "Dwarven" },
        { name: "Garden", key: "Garden" },
        { name: "Gold", key: "Gold" },
        { name: "Hub", key: "Hub" },
        { name: "Jerry", key: "Jerry" },
        { name: "Kuudra", key: "Kuudra" },
        { name: "Mineshaft", key: "Shaft" },
        { name: "Private", key: "Island" },
        { name: "Spider", key: "Spider" },
        { name: "End", key: "End" },
        { name: "Farming", key: "Farm" },
        { name: "Park", key: "Park" },
        { name: "Rift", key: "Rift" },
    ];
    scanned = true;
    const lore = inv.getStackInSlot(4).getLore();
    for (let line of lore) {
        line = ChatLib.removeFormatting(line);
        for (const location of locations) {
            if (line.toString()?.includes(location.name)) {
                data.playtimes[location.key] = line.substring(0, line.indexOf("hours") - 1);
            }
        }
    }// なんてスタイリッシュな書き方なんだ
    data.save();
})

export function sendPlaytime(timeType, chatFrom) {
    switch (timeType) {
        case "help":
            hasParty(chatFrom, "playtime <TimeType>");
            break;
        case "today":
        case null:
        case undefined:
        case "day": {
            const playTimeToday = formatSeconds(((Date.now() - data.jointime) / 1000).toFixed());
            hasParty(chatFrom, `Today Playtime: ${playTimeToday}`);
            break;
        }
        case "mayor": {
            const mayorPlayTime = data.playtimes.mayor.playtime;
            const sessionPlayTime = ((Date.now() - sessionJoinTime) / 1000).toFixed();
            const addupPlayTime = Number(mayorPlayTime) + Number(sessionPlayTime);
            const formatMayorPlayTime = formatSeconds(addupPlayTime);
            hasParty(chatFrom, `Mayor Playtime: ${formatMayorPlayTime}`);
            break;
        }
        case "all":
        case "alltime":
            hasParty(chatFrom, `Alltime Playtime: ${data.playtimes.all}`);
            break;
        case "crim":
        case "crimson":
        case "isle":
            hasParty(chatFrom, `Crimson Playtime: ${data.playtimes.Crimson}h`);
            break;
        case "crystal":
        case "hollow":
            hasParty(chatFrom, `Crystal Playtime: ${data.playtimes.Crystal}h`);
            break;
        case "dark":
        case "da":
        case "auction":
            hasParty(chatFrom, `DA Playtime: ${data.playtimes.Dark}h`);
            break;
        case "deep":
        case "caverns":
            hasParty(chatFrom, `Deep Caverns Playtime: ${data.playtimes.Deep}h`);
            break;
        case "dungeon":
        case "dungeons":
            hasParty(chatFrom, `Dungeon Playtime: ${data.playtimes.Dungeon}h`);
            break;
        case "dhub":
        case "dh":
        case "dungeonhub":
            hasParty(chatFrom, `Dhub Playtime: ${data.playtimes.Crystal}h`);
            break;
        case "dwarven":
        case "mines":
            hasParty(chatFrom, `Dwarven Playtime: ${data.playtimes.Dwarven}h`);
            break;
        case "garden":
            hasParty(chatFrom, `Gerden Playtime: ${data.playtimes.Garden}h`);
            break;
        case "gold":
            hasParty(chatFrom, `Gold Mine Playtime: ${data.playtimes.Gold}h`);
            break;
        case "hub":
            hasParty(chatFrom, `Hub Playtime: ${data.playtimes.Hub}h`);
            break;
        case "jerry":
        case "workshop":
            hasParty(chatFrom, `Jerry Playtime: ${data.playtimes.Jerry}h`);
            break;
        case "kuudra":
        case "drakuu":
            hasParty(chatFrom, `Kuudra Playtime: ${data.playtimes.Kuudra}h`);
            break;
        case "shaft":
        case "mineshaft":
            hasParty(chatFrom, `Mineshaft Playtime: ${data.playtimes.Shaft}h`);
            break;
        case "island":
        case "is":
        case "private":
            hasParty(chatFrom, `Island Playtime: ${data.playtimes.Island}h`);
            break;
        case "spider":
        case "den":
            hasParty(chatFrom, `Spider Playtime: ${data.playtimes.Spider}h`);
            break;
        case "end":
            hasParty(chatFrom, `The End Playtime: ${data.playtimes.End}h`);
            break;
        case "farm":
        case "barn":
        case "mushroom":
            hasParty(chatFrom, `Barn Playtime: ${data.playtimes.Farm}h`);
            break;
        case "rift":
            hasParty(chatFrom, `Rift Playtime: ${data.playtimes.Rift}h`);
            break;
    }
}