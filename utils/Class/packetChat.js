import { S02PacketChat } from "../utils";

export default new class chatPacket {
    constructor() {
        this.needPacketChat = new Map();

        register("packetReceived", (packet) => {
            if (packet.func_148916_d()) return; //packet.isChat()
            const message = packet.func_148915_c().func_150254_d().removeFormatting(); //packet.getChatComponent().getFormattedText().removeFormatting
            this.needPacketChat.forEach((value, key) => {
                if (value === "doFunc") {
                    key(message);
                    return;
                }
                if (value.test(message)) key();
            })
        }).setFilteredClass(S02PacketChat);
    }

    add(regex, func) {
        this.needPacketChat.set(func, regex); //key, value
    }
}