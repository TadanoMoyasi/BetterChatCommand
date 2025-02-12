import PartyFloorSettings from "../../config/floorConfig/floorConfig";
import { blue, green, aqua, red, yellow, obfuscated, bold, strikeThrough, reset } from '../../utils/utils';

const floorSettings = {
    "0": { setting: PartyFloorSettings.PartyEntrance, command: "joininstance catacombs_Entrance" },
    "1": { setting: PartyFloorSettings.PartyF1, command: "joininstance catacombs_floor_one" },
    "2": { setting: PartyFloorSettings.PartyF2, command: "joininstance catacombs_floor_two" },
    "3": { setting: PartyFloorSettings.PartyF3, command: "joininstance catacombs_floor_three" },
    "4": { setting: PartyFloorSettings.PartyF4, command: "joininstance catacombs_floor_four" },
    "5": { setting: PartyFloorSettings.PartyF5, command: "joininstance catacombs_floor_five" },
    "6": { setting: PartyFloorSettings.PartyF6, command: "joininstance catacombs_floor_six" },
    "7": { setting: PartyFloorSettings.PartyF7, command: "joininstance catacombs_floor_seven" }
};

const masterSettings = {
    "1": { setting: PartyFloorSettings.PartyM1, command: "joininstance master_catacombs_floor_one" },
    "2": { setting: PartyFloorSettings.PartyM2, command: "joininstance master_catacombs_floor_two" },
    "3": { setting: PartyFloorSettings.PartyM3, command: "joininstance master_catacombs_floor_three" },
    "4": { setting: PartyFloorSettings.PartyM4, command: "joininstance master_catacombs_floor_four" },
    "5": { setting: PartyFloorSettings.PartyM5, command: "joininstance master_catacombs_floor_five" },
    "6": { setting: PartyFloorSettings.PartyM6, command: "joininstance master_catacombs_floor_six" },
    "7": { setting: PartyFloorSettings.PartyM7, command: "joininstance master_catacombs_floor_seven" }
};

const tierSettings = {
    "1": { setting: PartyFloorSettings.PartyT1, command: "joininstance kuudra_normal" },
    "2": { setting: PartyFloorSettings.PartyT2, command: "joininstance kuudra_Hot" },
    "3": { setting: PartyFloorSettings.PartyT3, command: "joininstance kuudra_Burning" },
    "4": { setting: PartyFloorSettings.PartyT4, command: "joininstance kuudra_Fiery" },
    "5": { setting: PartyFloorSettings.PartyT5, command: "joininstance kuudra_Infernal" }
};

export function joinInstance(floorChat, masterChat, tierChat) {
    const floor = floorChat?.length <= 2 ? floorChat[1] : undefined;
    if (floor) {
        const floorSetting = floorSettings[floor];
        if (floorSetting?.setting) {
            return floorSetting.command;
        }
    }

    const masterFloor = masterChat?.length <= 2 ? masterChat[1] : undefined;
    if (masterFloor) {
        if (masterFloor === "8") {
            const playerName = `${reset}${aqua}${strikeThrough}${Player.getName()}${reset}`;
            const enteredText = `${yellow}en${obfuscated}te${reset}${yellow}red${reset}`;
            const floorText = `${green}${bold}M${obfuscated}M${reset}${red}T${obfuscated}h${reset}${red}e ${obfuscated}C${reset}${red}atac${obfuscated}o${reset}${red}mbs${reset}`;
            const floorNumber = `${yellow}, ${reset}${yellow}F${obfuscated}lo${reset}${yellow}or V${obfuscated}I${reset}${yellow}II!${reset}`;
            ChatLib.chat(`${blue + strikeThrough}-----------------------------------------------------${reset}`);
            ChatLib.chat(`${playerName} ${enteredText} ${floorText}${floorNumber}`);
            ChatLib.chat(`${blue + strikeThrough}-----------------------------------------------------${reset}`);
            return;
        }
        const masterSetting = masterSettings[masterFloor];
        if (masterSetting?.setting) {
            return masterSetting.command;
        }
    }

    const tier = tierChat?.length <= 2 ? tierChat[1] : undefined;
    if (tier) {
        const tierSetting = tierSettings[tier];
        if (tierSetting?.setting) {
            return tierSetting.command;
        }
    }
}