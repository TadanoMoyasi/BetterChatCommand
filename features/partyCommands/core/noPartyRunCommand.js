import Settings from "../../../config/general/generalConfig.js";
import { avoidSlowDown } from "./runCommand.js";
import Party from "../../../utils/Class/party.js";
const C01PacketChatMessage = Java.type("net.minecraft.network.play.client.C01PacketChatMessage");

register("packetSent", (packet, event) => {
    if (!Settings.noPartyCommand || !Settings.allCommandToggle || Party.isParty) return;
    const packetMessage = packet.func_149439_c(); //packet.getMessage()
    const match = packetMessage.match(/^!.+/);
    if (!match) return;
    cancel(event);
    ChatLib.chat("cancel");
    avoidSlowDown(Player.getName(), packetMessage.replace(/!/, ""), "noParty");
}).setFilteredClass(C01PacketChatMessage);