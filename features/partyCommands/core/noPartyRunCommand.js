import Settings from "../../../config/general/generalConfig.js";
import Party from "../../../utils/Class/party.js";
import { avoidSlowDown } from "./runCommand.js";
const C01PacketChatMessage = Java.type("net.minecraft.network.play.client.C01PacketChatMessage");

register("packetSent", (packet, event) => {
    if (!Settings.noPartyCommand || !Settings.allCommandToggle || Party.isParty) return;
    const packetMessage = packet.func_149439_c(); //packet.getMessage()
    const match = packetMessage.match(/^!.+/);
    if (!match) return;
    cancel(event);
    avoidSlowDown(Player.getName(), packetMessage.replace(/!/, ""), "noParty");
}).setFilteredClass(C01PacketChatMessage);