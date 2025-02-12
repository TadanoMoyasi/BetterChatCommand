import { S02PacketChat } from "../utils";

export default new class chatPacket {
    constructor() {
        this.needPacketChat = new Map();

        register("packetReceived", (packet) => {
            if (packet.func_148916_d()) return; //packet.isChat()
            const message = packet.func_148915_c().func_150254_d().removeFormatting(); //packet.getChatComponent().getFormattedText().removeFormatting
            this.needPacketChat.forEach((value, key) => {
                switch (value[0]) {
                    case "doFunc":
                        key(message);
                        return;
                    case "test":
                        if (value[1].test(message)) key();
                        return;
                    case "match": {
                        const match = message.match(value[1]);
                        if (!match) return;
                        key(match);
                    }
                }
            })
        }).setFilteredClass(S02PacketChat);
    }

    /**
     * add packetChat
     * @param {Array} regex [type, regex] e.g. [doFunc], [test, regex], [match, regex]
     * @param {function} func
     */
    add(regex, func) {
        this.needPacketChat.set(func, regex); //key, value
    }
}