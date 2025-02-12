import request from "requestV2/index";
import { data } from "../../data/data";
import { formatPrefix, green, red, spacing, white } from "../../utils/utils";

//https://api.mojang.com/users/profiles/minecraft/tdmy
export function lists(listsPlayer, witchFrom) {
    const lowerCaseListsPlayer = listsPlayer.toLowerCase();
    const apiURL = `https://api.mojang.com/users/profiles/minecraft/${lowerCaseListsPlayer}`;
    if (witchFrom === "blacklist" || witchFrom === "whitelist") {
        handleRequest(apiURL, witchFrom);
    } else {
        ChatLib.chat(`${formatPrefix + spacing + red}Error: ${white}Invalid list type.`);
    }
}

function handleRequest(apiURL, listType) {
    request({
        url: apiURL,
        json: true
    }).then((response) => {
        const getUUID = response.id;
        const list = data[listType];
        const index = list.uuid.indexOf(getUUID);
        if (index !== -1) {
            list.uuid.splice(index, 1);
            list.name.splice(index, 1);
            ChatLib.chat(`${formatPrefix + spacing + white}${lowerCaseListsPlayer}${spacing + red} has been removed from ${listType}.`);
        } else {
            list.uuid.push(getUUID);
            list.name.push(lowerCaseListsPlayer);
            ChatLib.chat(`${formatPrefix + spacing + white}${lowerCaseListsPlayer}${spacing + green} has been added to ${listType}.`);
        }
        data.save();
    }).catch((e) => {
        ChatLib.chat(`${formatPrefix + spacing + red}Error: ${white}${JSON.parse(e).errorMessage}`);
    });
}