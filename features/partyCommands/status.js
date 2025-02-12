import { S37PacketStatistics, S03PacketTimeUpdate, System, C16PacketClientStatus, hasParty } from "../../utils/utils";

let lastPingAt = -1;
let requestedPing = false;
let requestedTPS = false;
let prevTime = null;
register("packetReceived", (packet) => {
    if (lastPingAt > 0 && requestedPing) {
        if (packet instanceof S37PacketStatistics) {
            const diff = Math.abs((System.nanoTime() - lastPingAt) / 1_000_000);
            hasParty("isParty", `Ping: ${Number.parseInt(diff)}`)
            lastPingAt *= -1;
            requestedPing = false;
        }
    }

    if (packet instanceof S03PacketTimeUpdate && requestedTPS) {
        if (prevTime) {
            const time = Date.now() - prevTime;
            const instantTps = MathLib.clampFloat(20000 / time, 0, 20);
            hasParty("isParty", `TPS: ${Number.parseFloat(instantTps).toFixed(1)}`)
            requestedTPS = false;
        }
        prevTime = Date.now();
    }
});

export function handleFPSCommand(chatFrom) {
    hasParty(chatFrom, `FPS: ${Client.getFPS()}`);
}

export function handlePingCommand() {
    Client.sendPacket(new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS));
    lastPingAt = System.nanoTime();
    requestedPing = true;
}

export function handleTPSCommand() {
    requestedTPS = true;
}
