import Settings from "./config";
import PartyFloorSettings from "./floorconfig/floorconfig";
import Party from "../BloomCore/Party";
import PogObject from "../PogData";
import request from "requestV2/index";


//It's a pain to separate everything into files now.
//initial
const metadata = JSON.parse(FileLib.read("BetterChatCommand", "metadata.json"));
const version = metadata.version;
const prefix = "§8[§aBCC§8]§r";
const helps = "/bcc, /bcc help, /bcc blacklist (ign), /bcc whitelist (ign), /bcc (floor), /bcc cute, /bcc stop !help, !f(floor), !m(floor), !t(tier), !ptme, !warp, !wt, !inv (ign), !allinv, !promote (ign), !kick (ign), !dt (reason), !fps, !ping, !tps, !power, !pet, !coords, !cf, !dice, !rng, !rrng,  !boop (ign), !rps (ign), !meow (ign), !cute, !time, !playtime, !runs (dungeon/kuudra), !iq";
const cutes = [
    "https://www.youtube.com/live/-i-T6scZfhM?si=JfH8KKAo5h7O2ho_",
    "https://www.youtube.com/live/creq_1I-llE?si=FR4pg0dNUVs_Mq_m",
    "https://www.youtube.com/live/t2lUdipZvAs?si=pcVUa4c44jZRL-Hw",
    "https://www.youtube.com/live/HXp5x6llMo4?si=GsGAjS-D3BsIbDwr",
    "https://www.youtube.com/live/NqOmHpwMUxs?si=-JS587RWh2bObzeR",
    "https://www.youtube.com/live/abbR-Ttd-cA?si=7R0ofqHSPasIBQk3"
];
const C16PacketClientStatus = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
const S37PacketStatistics = Java.type("net.minecraft.network.play.server.S37PacketStatistics");
const S03_PACKET_TIME_UPDATE = Java.type("net.minecraft.network.play.server.S03PacketTimeUpdate");
const System = Java.type("java.lang.System");
const Byte = Java.type("java.lang.Byte");
const PrintStream = Java.type("java.io.PrintStream");
const URL = Java.type("java.net.URL");
const File = Java.type("java.io.File");
let lastTimeUsed = 0;
//dt
let afterDownTime = false;
let downTimePlayer = [];
let downTimeReason = [];
let saidDt = false;
//rps
const RPS = ["Rock", "Paper", "Scissors"];
let enemyIGN = null;
let isRPSActive = false;
let enemyChoose = null;
let playerChoose = null;
let drawCount = 0;
let enemyHaveBCC = false;
let responseWaitTime = 0;
let RPSStarter = false;
//ready
let afterReady = false;
let readyPlayer = [];
let stopReady = false;
let joinFloor = null;
//runs
let sessionKuudraRuns = 0;
let sessionDungoenRuns = 0;
//inviteConfirm
let confirmWaitTime = 60;
let confirm = false;
let somefeaturesExists = false;
//profiles
let scanned = false;
const celeblations = ["Aqua", "Black", "Green", "Lime", "Orange", "Pink", "Purple", "Red", "Yellow", "Flushed", "Happy", "Cheeky", "Cool", "Cute", "Derp", "Grumpy", "Regular", "Shock", "Tears"];
let enrichScanned = 0;
let enrichScannedAmount = 0;
//autoUpdate
let canUpdate = false;
let updating = false;

const data = new PogObject(
    "BetterChatCommand",
    {
        firstTime: false,
        lastversion: "",
        blacklist: {
            name: [],
            uuid: []
        },
        whitelist: {
            name: [],
            uuid: []
        },
        profile: {
            power: "nodata",
            tuning: "nodata",
            enrichamount: 0,
            enrich: "nodata",
            mp: "nodata",
            pet: "nodata",
        },
        playtimes: {
            mayor: {
                lastmayor: "",
                jointime: 1,
                playtime: 1,
            },
            all: "nodata",
            Crimson: "nodata", // Crimson Isle
            Crystal: "nodata", // Crystal Hollows
            Dark: "nodata",    // Dark Auction
            Deep: "nodata",    // Deep Caverns
            Dungeon: "nodata", // Dungeon
            DHub: "nodata",    // Dungeon Hub
            Dwarven: "nodata", // Dwarven Mines
            Garden: "nodata",  // Garden
            Gold: "nodata",    // Gold Mine
            Hub: "nodata",     // Hub
            Jerry: "nodata",   // Jerry
            Kuudra: "nodata",  // Kuudra
            Shaft: "nodata",   // Mineshaft
            Island: "nodata",  // Private Island
            Spider: "nodata",  // Spider's Den
            End: "nodata",     // The End
            Farm: "nodata",    // The Farming Islands
            Park: "nodata",    // The Park
            Rift: "nodata"     // The Rift
        },
        RNG: {
            Slayer: {
                Zombie: [
                    "nodata",
                    0
                ],
                Spider: [
                    "nodata",
                    0
                ],
                Wolf: [
                    "nodata",
                    0
                ],
                Enderman: [
                    "nodata",
                    0
                ],
                Vampire: [
                    "nodata",
                    0
                ],
                Blaze: [
                    "nodata",
                    0
                ]
            },
            Catacombs: {
                Normal: {
                    F1: [
                        "nodata",
                        0
                    ],
                    F2: [
                        "nodata",
                        0
                    ],
                    F3: [
                        "nodata",
                        0
                    ],
                    F4: [
                        "nodata",
                        0
                    ],
                    F5: [
                        "nodata",
                        0
                    ],
                    F6: [
                        "nodata",
                        0
                    ],
                    F7: [
                        "nodata",
                        0
                    ]
                },
                Master: {
                    M1: [
                        "nodata",
                        0
                    ],
                    M2: [
                        "nodata",
                        0
                    ],
                    M3: [
                        "nodata",
                        0
                    ],
                    M4: [
                        "nodata",
                        0
                    ],
                    M5: [
                        "nodata",
                        0
                    ],
                    M6: [
                        "nodata",
                        0
                    ],
                    M7: [
                        "nodata",
                        0
                    ]
                }
            },
            Nucleus: [
                "nodata",
                0
            ]
        },
        jointime: 1,
        lasttime: 1,
        todaykuudra: 0,
        todaydungeon: 0
    },
    "data.json"
);

const check = register("tick", () => {
    check.unregister();
    let first = false;
    if (!data.firstTime) {
        ChatLib.chat("§b§l§m--------------------------------------------");
        ChatLib.chat(ChatLib.getCenteredText(`§3§lBetterChatCommand ${version}`));
        ChatLib.chat(ChatLib.getCenteredText("§fWelcome! /bcc to open settings!"));
        ChatLib.chat(ChatLib.getCenteredText("§3Thank you for installing!"));
        ChatLib.chat(ChatLib.getCenteredText("§cIf you find any bugs, please contact me.(tadanomoyasi)"));
        ChatLib.chat("§b§l§m--------------------------------------------");
        data.firstTime = true;
        first = true;
    }
    //check somefeatures for dt requeue
    const fileExists = FileLib.exists("somefeatures", "features/autorequeue.js");
    if (fileExists) {
        somefeaturesExists = true;
    } else {
        somefeaturesExists = false;
    }
    data.playtimes.mayor.jointime = Date.now();
    if (data.jointime === 1 || data.lasttime === 1) {
        data.jointime = Date.now();
        data.lasttime = Date.now();
        data.save();
    }
    if (Date.now() - data.lasttime > 18000000) {
        data.jointime = Date.now();
        sessionKuudraRuns = 0;
        sessionDungoenRuns = 0;
        data.todaydungeon = sessionDungoenRuns;
        data.todaykuudra = sessionKuudraRuns;
        data.save();
        console.log("[BCC] reset data");
    } else {
        sessionDungoenRuns = data.todaydungeon;
        sessionKuudraRuns = data.todaykuudra;
    }
    if (version !== data.lastversion && !first) {
        data.lastversion = version;
        data.save();
        const changelog = JSON.parse(FileLib.read("BetterChatCommand", "changelog.json"));
        if (changelog.length !== 0) {
            setTimeout(() => {
                ChatLib.chat("§b§l§m--------------------------------------------");
                ChatLib.chat(ChatLib.getCenteredText(`§3§lBetterChatCommand ${version}`));
                changelog.forEach(change => ChatLib.chat(ChatLib.getCenteredText(change))) // why i cant use for...of???
                ChatLib.chat(ChatLib.getCenteredText("§3Thank you for installing!"));
                ChatLib.chat(ChatLib.getCenteredText("§cIf you find any bugs, please contact me.(tadanomoyasi)"));
                ChatLib.chat("§b§l§m--------------------------------------------");
            }, 500);
        }
    }
    request({
        url: "https://api.github.com/repos/TadanoMoyasi/BetterChatCommand/releases/latest",
        json: true
    }).then((response) => {
        const BCCLetestVersion = response.name;
        if (version !== BCCLetestVersion) {
            canUpdate = true;
            new TextComponent(`${prefix} §aNew version available! Click to start update preparation!`)
                .setClick("run_command", "/bcc update") // setClickValueだと動かなかった。みんな気をつけようね。(追)setclickactionと一緒に使うやつなんだから動くわけ無いですね。アホです。
                .setHover("show_text", "§aClick to start update preparation!")
                .chat()
        }
    }).catch((e) => {
        ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
    });
    request({
        url: "https://api.hypixel.net/v2/resources/skyblock/election",
        json: true
    }).then((response) => {
        const currentMayor = response.mayor.name;
        if (currentMayor !== data.playtimes.mayor.lastmayor) {
            data.playtimes.mayor.lastmayor = currentMayor;
            data.playtimes.mayor.playtime = 0;
        }
    })
});

register("gameUnload", () => {
    if (updating) return;
    data.todaydungeon = sessionDungoenRuns;
    data.todaykuudra = sessionKuudraRuns;
    data.lasttime = Date.now();
    data.playtimes.mayor.playtime += Number(((Date.now() - data.playtimes.mayor.jointime) / 1000).toFixed());
    data.save();
});

// bcc blacklist abc
// com   arg0    arg1
// bcc debug getuuid tdmy
//    command name  debugName
register("command", (...args) => {
    let floorChat = null;
    let masterChat = null;
    let tierChat = null;
    if (args === undefined) {
        Settings.openGUI();
        return;
    }
    const command = args[0] === undefined ? undefined : args[0].toLowerCase();
    const name = args[1];
    let debugName = args[2];
    if (command) {
        floorChat = args[0].match(/f(\d)/i);
        masterChat = args[0].match(/m(\d)/i);
        tierChat = args[0].match(/t(\d)/i);
    }

    //ここらへん綺麗にしたい所ではある
    if (floorChat != null) {
        switch (floorChat[1]) {
            case "0":
                ChatLib.command("joininstance catacombs_Entranse");
                break;
            case "1":
                ChatLib.command("joininstance catacombs_floor_one");
                break;
            case "2":
                ChatLib.command("joininstance catacombs_floor_two");
                break;
            case "3":
                ChatLib.command("joininstance catacombs_floor_three");
                break;
            case "4":
                ChatLib.command("joininstance catacombs_floor_four");
                break;
            case "5":
                ChatLib.command("joininstance catacombs_floor_five");
                break;
            case "6":
                ChatLib.command("joininstance catacombs_floor_six");
                break;
            case "7":
                ChatLib.command("joininstance catacombs_floor_seven");
                break;
        }
        return;
    }

    if (masterChat != null) {
        switch (masterChat[1]) {
            case "1":
                ChatLib.command("joininstance master_catacombs_floor_one");
                break;
            case "2":
                ChatLib.command("joininstance master_catacombs_floor_two");
                break;
            case "3":
                ChatLib.command("joininstance master_catacombs_floor_three");
                break;
            case "4":
                ChatLib.command("joininstance master_catacombs_floor_four");
                break;
            case "5":
                ChatLib.command("joininstance master_catacombs_floor_five");
                break;
            case "6":
                ChatLib.command("joininstance master_catacombs_floor_six");
                break;
            case "7":
                ChatLib.command("joininstance master_catacombs_floor_seven");
                break;
            case "8":
                ChatLib.chat("§9§m-----------------------------------------------------§r");
                ChatLib.chat(`§r§b§m${Player.getName()}§r §een§kt§r§eered§r §c§lM§kM§r §cT§kh§r§ce §kC§r§catac§ko§r§cmbs§r§e, §r§eF§klo§r§eor V§kI§r§eII§r§e!§r`);
                ChatLib.chat("§9§m-----------------------------------------------------§r");
        }
        return;
    }

    if (tierChat != null) {
        switch (tierChat[1]) {
            case "1":
                ChatLib.command("joininstance kuudra_Basic");
                break;
            case "2":
                ChatLib.command("joininstance kuudra_Hot");
                break;
            case "3":
                ChatLib.command("joininstance kuudra_Burning");
                break;
            case "4":
                ChatLib.command("joininstance kuudra_Fiery");
                break;
            case "5":
                ChatLib.command("joininstance kuudra_Infernal");
                break;
        }
        return;
    }

    switch (command) {
        case undefined:
        case "setting":
        case "settings":
            Settings.openGUI();
            break;
        case "ver":
        case "version":
            ChatLib.chat(`${prefix} §bYou are currently on version §e${version}`);
            break;
        case "help":
            ChatLib.chat(`${prefix} §fVer §a${version}§r ${helps}`);
            break;
        case "blacklist":
            if (!name) {
                if (data.blacklist.name.length !== 0) {
                    ChatLib.chat(`${prefix} §8blacklist§f: §f${data.blacklist.name.toString()}`);
                } else {
                    ChatLib.chat(`${prefix} §cUse /bcc blacklist {name} to blacklist a player.`);
                }
                break;
            }
            lists(name, "blacklist");
            break;
        case "whitelist":
            if (!name) {
                if (data.whitelist.name.length !== 0) {
                    ChatLib.chat(`${prefix} §fwhitelist: §f${data.whitelist.name.toString()}`);
                } else {
                    ChatLib.chat(`${prefix} §cUse /bcc whitelist {name} to whitelist a player.`);
                }
                break;
            }
            lists(name, "whitelist");
            break;
        case "cute": {
            const cuteNum = Math.floor(Math.random() * 6);
            const cuteVids = cutes[cuteNum];
            ChatLib.chat(`§aCute things are cute, that's why cute things are cute, and cute means cute, so cute is cute plus cute.§r \n${cuteVids}`);
            break;
        }
        case "stop":
            stopReady = true;
            ChatLib.chat(`${prefix} Rejoin Stoped`);
            setTimeout(() => {
                stopReady = false;
            }, 5000);
            break;
        case "update":
            autoUpdate();
            break;
        case "debug":
            if (!name) {
                ChatLib.chat("no debugtype");
            }
            switch (name) {
                case "firsttime":
                    data.firstTime = false;
                    data.save();
                    ChatLib.chat("firsttime set to false");
                    break;
                case "getuuid":
                    if (!debugName) {
                        ChatLib.chat("no name");
                        break;
                    }
                    debugName = debugName.toLowerCase();
                    request({
                        url: `https://api.mojang.com/users/profiles/minecraft/${debugName}`,
                        json: true
                    }).then((response) => {
                        const getuuid = response.id;
                        const getname = response.name;
                        new TextComponent(`${getname}'s uuid: ${getuuid}`)
                            .setClick("run_command", `/ct copy ${getuuid}`)
                            .setHover("show_text", "§aClick to copy uuid")
                            .chat()
                    }).catch((e) => {
                        ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
                    });
                    break;
                case "version":
                    if (!debugName) {
                        ChatLib.chat("no name");
                        break;
                    }
                    data.lastversion = debugName;
                    data.save();
                    ChatLib.chat("lastversion changed");
                    break;
                case "resetprofile":
                    data.profile.power = "nodata";
                    data.profile.tuning = "nodata";
                    data.profile.enrich = "nodata";
                    data.profile.enrichamount = 0;
                    data.profile.mp = "nodata";
                    data.save();
                    ChatLib.chat("profiledata reset")
                    break;
                case "canupdate":
                    canUpdate = true;
                    ChatLib.chat("canUpdate: true")
                    break;
                case "lookingat":
                    ChatLib.chat(Player.lookingAt());
                    break;
                case "resetmayor":
                    data.playtimes.mayor.playtime = 0;
                    data.save();
                    ChatLib.chat("mayorplaytime set to 0");
                    break;
            }
            break;
        default:
            ChatLib.chat(`${prefix} §fVer ${version} ${helps}`);
    }
}).setCommandName("betterchatcommand").setAliases("bcc").setTabCompletions("version", "help", "blacklist", "whitelist", "cute", "getuuid");

register("command", () => {
    ChatLib.chat(`${prefix} §fVer ${version} ${helps}`);
}).setName("bcchelp");

//https://api.mojang.com/users/profiles/minecraft/tdmy
function lists(listsPlayer, witchFrom) {
    const lowerCaseListsPlayer = listsPlayer.toLowerCase();
    if (witchFrom === "blacklist") {
        request({
            url: `https://api.mojang.com/users/profiles/minecraft/${lowerCaseListsPlayer}`,
            json: true
        }).then((response) => {
            const getuuid = response.id;
            if (data.blacklist.uuid.includes(getuuid)) {
                const pos = data.blacklist.uuid.indexOf(getuuid);
                data.blacklist.uuid.splice(pos, 1);
                data.blacklist.name.splice(pos, 1);
                ChatLib.chat(`${prefix} §f${lowerCaseListsPlayer} §chas been removed from blacklist.`);
            } else {
                data.blacklist.uuid.push(getuuid);
                data.blacklist.name.push(lowerCaseListsPlayer);
                ChatLib.chat(`${prefix} §f${lowerCaseListsPlayer} §ahas been added to the blacklist.`);
            }
        }).catch((e) => {
            ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
        });
        data.save();
        return;
    }
    if (witchFrom === "whitelist") {
        request({
            url: `https://api.mojang.com/users/profiles/minecraft/${lowerCaseListsPlayer}`,
            json: true
        }).then((response) => {
            const getuuid = response.id;
            if (data.whitelist.uuid.includes(getuuid)) {
                const pos = data.whitelist.uuid.indexOf(getuuid);
                data.whitelist.uuid.splice(pos, 1);
                data.whitelist.name.splice(pos, 1);
                ChatLib.chat(`${prefix} §f${lowerCaseListsPlayer} §chas been removed from whitelist.`);
            } else {
                data.whitelist.uuid.push(getuuid);
                data.whitelist.name.push(lowerCaseListsPlayer);
                ChatLib.chat(`${prefix} §f${lowerCaseListsPlayer} §ahas been added to the whitelist.`);
            }
        }).catch((e) => {
            ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
        });
        data.save();
        return;
    }
}

register("command", (listsPlayer) => {
    if (!listsPlayer) {
        if (data.blacklist.name.length !== 0) {
            ChatLib.chat(`${prefix} §8blacklist§f: §f${data.blacklist.name.toString()}`);
        } else {
            ChatLib.chat(`${prefix} §cUse /bccblacklist {name} to blacklist a player.`);
        }
        return;
    }
    lists(listsPlayer, "blacklist");
}).setName("bccblacklist");

register("command", (listsPlayer) => {
    if (!listsPlayer) {
        if (data.whitelist.name.length !== 0) {
            ChatLib.chat(`${prefix} §fwhitelist: §f${data.whitelist.name.toString()}`);
        } else {
            ChatLib.chat(`${prefix} §cUse /bccwhitelist {name} to whitelist a player.`);
        }
        return;
    }
    lists(listsPlayer, "whitelist");
}).setName("bccwhitelist");



register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (Date.now() - lastTimeUsed < 1000) return;
    avoidSlowDown(player, message, "party");
    lastTimeUsed = Date.now();
}).setCriteria(/^Party >(?: \[.+\])? (\w+)(?: [Ⓑ|ቾ|⚒])?: !(.+)/);

//Party > [MVP+] Tdmy: !help
//Party > [MVP+] TdMy Ⓑ: !warp
//Party > dazuku: !dice
//no rank bro

register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (Date.now() - lastTimeUsed < 1000) return;
    avoidSlowDown(player, message, "dm");
    lastTimeUsed = Date.now();
}).setCriteria(/^From(?: \[.+\])? (\w+): !(.+)/);

register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.allchattoggle) return;
    if (Date.now() - lastTimeUsed < 3000) return;
    avoidSlowDown(player, message, "all");
    lastTimeUsed = Date.now();
}).setCriteria(/^\[\d+\](?: .+)?(?: \[.+\])? (\w+)(?: [Ⓑ|ቾ|⚒])?: !(.+)/);
//[400] ➶ [MVP+] TdMy ቾ: !dice
//[400] ➶ [MVP+] TdMy: !help
//                player message

// ■■■    ■■■■■
// ■   ■    ■
// ■   ■    ■
// ■   ■    ■
// ■■■      ■
register("chat", () => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.Partydt) return;
    if (!afterDownTime) return;
    if (saidDt) return;
    let dtChat = "pc Need dt: ";
    for (let i = 0; i < downTimePlayer.length; i++) {
        dtChat += `${downTimePlayer[i]}: ${downTimeReason[i]}`;
        if (i < downTimePlayer.length - 1) {
            dtChat += ", ";
        }
    }
    saidDt = true;
    setTimeout(() => {
        ChatLib.command(dtChat);
    }, 1000);
    setTimeout(() => {
        saidDt = false;
        afterDownTime = false;
        downTimePlayer = [];
        downTimeReason = [];
    }, 5000);
}).setCriteria(/ *> EXTRA STATS <| *KUUDRA DOWN!| *DEFEAT/);

// ■■■   ■■■    ■    ■■    ■    ■
// ■  ■  ■     ■ ■   ■  ■   ■  ■
// ■■■   ■■■  ■■■■■  ■  ■    ■
// ■ ■   ■    ■   ■  ■  ■    ■
// ■  ■  ■■■  ■   ■  ■■■     ■
function setPlayerReady(readyName) {
    if (!afterReady) return;
    if (readyPlayer.length === 0) return;
    if (readyPlayer.includes(readyName)) {
        const spl = readyPlayer.indexOf(readyName);
        readyPlayer.splice(spl, 1);
    }
    if (readyPlayer.length === 0) {
        const rtext = `${prefix} Checked the ready status of all players who !dt'd. After 3 seconds, you will automatically enter the floor you were previously on. click chat to stop rejoin!`;
        new TextComponent(rtext)
            .setClick("run_command", "/bcc stop")
            .setHover("show_text", "§aClick to stop rejoin!")
            .chat();
        setTimeout(() => {
            if (!stopReady) {
                if (joinFloor == null) {
                    ChatLib.chat(`${prefix} failed to get previous floor`);
                } else {
                    ChatLib.command(`joininstance ${joinFloor}`);
                }
            }
            afterReady = false;
            stopReady = false;
            readyPlayer = [];
        }, 3000);
    } else {
        ChatLib.chat(`${prefix} still have dt player`);
    }
}

register("chat", (mode, floor) => {
    if (mode === "MM") {
        switch (floor) {
            case "I":
                joinFloor = "master_catacombs_floor_one";
                break;
            case "II":
                joinFloor = "master_catacombs_floor_two";
                break;
            case "III":
                joinFloor = "master_catacombs_floor_three";
                break;
            case "IV":
                joinFloor = "master_catacombs_floor_four";
                break;
            case "V":
                joinFloor = "master_catacombs_floor_five";
                break;
            case "VI":
                joinFloor = "master_catacombs_floor_six";
                break;
            case "VII":
                joinFloor = "master_catacombs_floor_seven";
                break;
        }
    } else {
        switch (floor) {
            case "I":
                joinFloor = "catacombs_floor_one";
                break;
            case "II":
                joinFloor = "catacombs_floor_two";
                break;
            case "III":
                joinFloor = "catacombs_floor_three";
                break;
            case "IV":
                joinFloor = "catacombs_floor_four";
                break;
            case "V":
                joinFloor = "catacombs_floor_five";
                break;
            case "VI":
                joinFloor = "catacombs_floor_six";
                break;
            case "VII":
                joinFloor = "catacombs_floor_seven";
                break;
        }
    }
}).setCriteria(/(?:\[.+\] )?\w+ entered ?(MM)? The Catacombs, Floor (.+)!/).setContains();

/*&9&m-----------------------------
& r & b[MVP & r & 4 +& r & b] TdMy & r & f & r & eentered & r & aThe Catacombs & r & e, & r & eFloor I & r & e!
& r & 9 & m-----------------------------& r*/


register("chat", (tier) => {
    switch (tier) {
        case "Basic":
            joinFloor = "kuudra_basic";
            break;
        case "Hot":
            joinFloor = "kuudra_hot";
            break;
        case "Burning":
            joinFloor = "kuudra_burning";
            break;
        case "Fiery":
            joinFloor = "kuudra_fiery";
            break;
        case "Infernal":
            joinFloor = "kuudra_infernal";
            break;
    }
}).setCriteria(/(?:\[.+\] )?\w+ entered Kuudra's Hollow, (.+) Tier!/).setContains();

register("chat", () => {
    joinFloor = "catacombs_entrance"
}).setCriteria(/(?:\[.+\] )?\w+ entered The Catacombs, Entrance!/).setContains();

//reset
register("chat", () => {
    if (downTimePlayer.length !== 0) return;
    afterReady = false;
    stopReady = false;
    readyPlayer = [];
}).setCriteria("[NPC] Mort: You should find it useful if you get lost.");

register("chat", () => {
    if (downTimePlayer.length !== 0) return;
    afterReady = false;
    stopReady = false;
    readyPlayer = [];
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");

// ■■■   ■■■   ■■■
// ■  ■  ■  ■  ■
// ■■■   ■■■   ■■■
// ■ ■   ■       ■
// ■  ■  ■     ■■■
function checkEnemy() {
    const whatChoice = Math.floor(Math.random() * 3);
    playerChoose = RPS[whatChoice];
    if (responseWaitTime === 0) {
        isRPSActive = false;
        return;
    }
    if (enemyHaveBCC) {
        ChatLib.command(`pc I choose ${playerChoose}`);
    } else {
        setTimeout(() => {
            checkEnemy();
            responseWaitTime--;
        }, 1000);
    }
}

function getEnemyChoose() {
    if (enemyChoose != null) {
        setTimeout(() => {
            ChatLib.command(`pc I choose ${playerChoose}`);
        }, 500);
    } else {
        setTimeout(() => {
            getEnemyChoose();
        }, 1000);
    }
}

function winRPS() {
    setTimeout(() => {
        ChatLib.command("pc This battle is mine");
    }, 2000);
    enemyChoose = null;
    enemyIGN = null;
    playerChoose = null;
    dorpsnow = false;
    isRPSActive = false;
    RPSStarter = false;
    enemyHaveBCC = false;
    drawCount = 0;
}

function loseRPS() {
    setTimeout(() => {
        ChatLib.command("pc uh nah");
    }, 2000);
    enemyChoose = null;
    enemyIGN = null;
    playerChoose = null;
    dorpsnow = false;
    isRPSActive = false;
    RPSStarter = false;
    enemyHaveBCC = false;
    drawCount = 0;
}

function drawRPS() {
    drawCount++;
    enemyChoose = null;
    playerChoose = null;
    const whatChoice = Math.floor(Math.random() * 3);
    playerChoose = RPS[whatChoice];
    setTimeout(() => {
        if (!RPSStarter) {
            ChatLib.command(`pc I choose ${playerChoose}`);
        } else if (RPSStarter) {
            getEnemyChoose();
        }
    }, 2000);
}

register("chat", (player, enemyHand) => {
    if (!Settings.AllCommandToggle) return;
    if (player === Player.getName()) return;
    if (player.includes("ቾ") || player.includes("⚒") || player.includes("Ⓑ")) {
        // biome-ignore lint/style/noParameterAssign: <explanation>
        player = player.split(" ")[0];
    }
    const lowerCasePlayerName = player.toString().toLowerCase();
    if (!isRPSActive) return;
    if (lowerCasePlayerName !== enemyIGN) return;
    if (!enemyHaveBCC) {
        enemyHaveBCC = true;
    }
    if (enemyChoose != null) return;
    enemyChoose = enemyHand;
    if (playerChoose == null && enemyChoose == null) return;
    if (drawCount > 4) {
        enemyChoose = null;
        enemyIGN = null;
        playerChoose = null;
        dorpsnow = false;
        isRPSActive = false;
        drawCount = 0;
        ChatLib.command("pc Five times, the RPS game Forced end.");
        return;
    }
    if (enemyChoose === "Paper") { //Switch文とか展開されているIf文を使うよりもこれのほうが簡潔で見やすい気がする
        if (playerChoose === "Paper") drawRPS();
        else if (playerChoose === "Rock") loseRPS();
        else if (playerChoose === "Scissors") winRPS();
    } else if (enemyChoose === "Rock") {
        if (playerChoose === "Paper") winRPS();
        else if (playerChoose === "Rock") drawRPS();
        else if (playerChoose === "Scissors") loseRPS();
    } else if (enemyChoose === "Scissors") {
        if (playerChoose === "Paper") loseRPS();
        else if (playerChoose === "Rock") winRPS();
        else if (playerChoose === "Scissors") drawRPS();
    }
}).setCriteria(/^Party >(?: \[.+\])? (\w+) ?[Ⓑ|ቾ|⚒]?: I choose (.+)/);

//runs
register("chat", () => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.Partyruns) return;
    sessionKuudraRuns++;
}).setCriteria(/ *KUUDRA DOWN!/);

register("chat", () => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.Partyruns) return;
    sessionDungoenRuns++;
}).setCriteria(/ *> EXTRA STATS </);

function formatSeconds(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    if (remainingSeconds < 10 && minutes !== 0) {
        remainingSeconds = `0${remainingSeconds}`;
    }

    if (hours === 0 && minutes === 0) {
        return `${remainingSeconds}s`;
    }
    if (hours === 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

let lastPingAt = -1;
let requestedPing = false;
let requestedTPS = false;
let prevTime = null;
register("packetReceived", (packet) => {
    if (lastPingAt > 0 && requestedPing) {
        if (packet instanceof S37PacketStatistics) {
            const diff = Math.abs((System.nanoTime() - lastPingAt) / 1_000_000);
            ChatLib.command(`pc Ping: ${Number.parseInt(diff)}`);
            lastPingAt *= -1;
            requestedPing = false;
        }
    }

    if (packet instanceof S03_PACKET_TIME_UPDATE && requestedTPS) {
        if (prevTime !== null) {
            const time = Date.now() - prevTime;
            const instantTps = MathLib.clampFloat(20000 / time, 0, 20);
            ChatLib.command(`pc TPS: ${Number.parseFloat(instantTps).toFixed(1)}`);
            requestedTPS = false;
        }
        prevTime = Date.now();
    }
});

function inviteConfirm(inviteName) {
    if (confirm) {
        ChatLib.command(`p invite ${inviteName}`);
        confirmWaitTime = 0;
        confirm = false;
    } else {
        if (confirmWaitTime === 0) return;
        setTimeout(() => {
            confirmWaitTime--;
            inviteConfirm(inviteName);
        }, 1000);
    }
}

register("command", () => {
    if (confirmWaitTime !== 0) {
        ChatLib.chat(`${prefix} Confirm Timed Out`);
        return;
    }
    confirm = true;
}).setName("bccconfirminvite");


function getArea() {
    let area = 'null'
    try {
        TabList?.getNames()?.forEach(line => {
            const match = line.removeFormatting().match(/Area: (.+)/)
            if (line.removeFormatting() === 'Dungeon: Catacombs') area = 'Dungeons'
            if (!match) return
            area = match[1]
        })
    } catch (e) { }
    return area
}

//i hate this shit containers
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
                if (!item.getName().startsWith("§d") && !item.getName().startsWith("§6") && !item.getName().startsWith("§d") && !celeblations.includes(removedFirstItemName)) return;
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
        if (mp !== "") {
            data.profile.mp = mp;
        }
        if (power !== "") {
            data.profile.power = power;
        }
        if (tuning !== "") {
            data.profile.tuning = tuning;
        }
        if (enrichAmount !== 0) {
            if (max > now) {
                enrichScannedAmount += enrichAmount;
            } else if (max === now) {
                enrichScannedAmount += enrichAmount;
                data.profile.enrichamount = enrichScannedAmount;
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

register("chat", (pet) => {
    data.profile.pet = pet;
    data.save();
}).setCriteria(/^You summoned your (.+)!/);

register("chat", () => {
    data.profile.pet = "none";
    data.save()
}).setCriteria(/^You despawned your .+!/);

register("chat", (pet) => {
    data.profile.pet = pet;
    data.save();
}).setCriteria(/^Autopet equipped your \[Lvl .+\] (.+)! VIEW RULE/);

register("chat", (amount, enrich) => {
    data.profile.enrich = enrich;
    data.profile.enrichamount = amount;
    data.save();
}).setCriteria(/^Swapped (.+) enrichments to (.+)!/);


register("chat", (hour, minutes) => {
    if (!Settings.AllCommandToggle) return;
    const playtimes = `${hour}h${minutes}m`
    data.playtimes.all = playtimes;
}).setCriteria(/^You have (.+) hours and (.+) minutes playtime!$/);

register("tick", () => {
    const inv = Player.getContainer()
    if (scanned || !inv || inv.getName() !== "Detailed /playtime") return;
    scanned = true;
    const lore = inv.getStackInSlot(4).getLore();
    for (let line of lore) {
        line = ChatLib.removeFormatting(line);
        if (line.toString()?.includes("Crimson")) {
            data.playtimes.Crimson = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Crystal")) {
            data.playtimes.Crystal = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Dark Auction")) {
            data.playtimes.Dark = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Deep")) {
            data.playtimes.Deep = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Dungeon Hub")) {
            data.playtimes.DHub = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Dungeon")) {
            data.playtimes.Dungeon = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Dwarven")) {
            data.playtimes.Dwarven = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Garden")) {
            data.playtimes.Garden = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Gold")) {
            data.playtimes.Gold = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Hub")) {
            data.playtimes.Hub = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Jerry")) {
            data.playtimes.Jerry = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Kuudra")) {
            data.playtimes.Kuudra = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Mineshaft")) {
            data.playtimes.Shaft = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Private")) {
            data.playtimes.Island = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Spider")) {
            data.playtimes.Spider = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("End")) {
            data.playtimes.End = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Farming")) {
            data.playtimes.Farm = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Park")) {
            data.playtimes.Park = line.substring(0, line.indexOf("hours") - 1);
        } else if (line.toString()?.includes("Rift")) {
            data.playtimes.Rift = line.substring(0, line.indexOf("hours") - 1);
        }
    }// なんて強引な書き方なんだ
    data.save();
})



register("tick", () => {
    const inv = Player.getContainer();
    if (scanned || !inv || !inv.getName().includes("RNG Meter")) return;
    scanned = true;
    Client.scheduleTask(4, () => {
        const items = inv.getItems();
        if (inv.getName().includes("Slayer RNG Meter")) {
            const slayerType = ["Zombie", "Spider", "Wolf", "", "Enderman", "Vampire", "Blaze"];
            let slayerScanned = 0;
            //To improve operating speed. Creating a local variable nearby will make the reference faster than referencing the global variable every time.
            const rngSlayer = data.RNG.Slayer;
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
                    } else if (line.toString()?.includes("Progress:")) {
                        rngSlayer[slayer][1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                    } else if (line.toString()?.includes("Stored Slayer XP:")) {
                        rngSlayer[slayer][0] = "noselected";
                        rngSlayer[slayer][1] = 0;
                    }
                    if (scanLine === 1) {
                        rngSlayer[slayer][0] = line.substring(0); //こーれ天才です。任せてください。
                    }
                }
                slayerScanned++;
            })
            data.save();
        } else if (inv.getName().includes("Catacombs RNG Meter")) {
            let catacombsFloor = 1;
            let catacombsType = "Normal";
            items.slice(19, 35).forEach(item => {
                const lore = item?.getLore();
                let scanLine = 0;
                const rngCatacombs = data.RNG.Catacombs;
                for (let line of lore) {
                    scanLine--;
                    line = ChatLib.removeFormatting(line);
                    if (line.toString()?.includes("M1")) {
                        catacombsType = "Master";
                        catacombsFloor = 1;
                    } else if (line.toString()?.includes("Selected Drop")) {
                        scanLine = 2;
                    } else if (line.toString()?.includes("Progress:")) {
                        if (catacombsType === "Normal") {
                            const normalFloor = `F${catacombsFloor}`;
                            rngCatacombs[catacombsType][normalFloor][1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                        } else if (catacombsType === "Master") {
                            const masterFloor = `M${catacombsFloor}`;
                            rngCatacombs[catacombsType][masterFloor][1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                        }
                    } else if (line.toString()?.includes("Stored Dungeon Score:")) {
                        if (catacombsType === "Normal") {
                            const normalFloor = `F${catacombsFloor}`;
                            rngCatacombs[catacombsType][normalFloor][0] = "noselected";
                            rngCatacombs[catacombsType][normalFloor][1] = 0;
                        } else if (catacombsType === "Master") {
                            const masterFloor = `M${catacombsFloor}`;
                            rngCatacombs[catacombsType][masterFloor][0] = "noselected";
                            rngCatacombs[catacombsType][masterFloor][1] = 0;
                        }
                    }
                    if (scanLine === 1) {
                        if (catacombsType === "Normal") {
                            const normalFloor = `F${catacombsFloor}`;
                            rngCatacombs[catacombsType][normalFloor][0] = line.substring(0);
                        } else if (catacombsType === "Master") {
                            const masterFloor = `M${catacombsFloor}`;
                            rngCatacombs[catacombsType][masterFloor][0] = line.substring(0);
                        }
                    }
                }
                catacombsFloor++;
            })
            data.save();
        } else if (inv.getName().includes("Crystal Nucleus RNG Meter")) {
            const lore = inv.getStackInSlot(4).getLore();
            let scanLine = 0;
            const rngNucleus = data.RNG.Nucleus;
            for (let line of lore) {
                scanLine--;
                line = ChatLib.removeFormatting(line);
                if (line.toString()?.includes("Selected Drop")) {
                    scanLine = 2;
                } else if (line.toString()?.includes("Progress:")) {
                    rngNucleus[1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                } else if (line.toString()?.includes("Stored Nucleus XP:")) {
                    rngNucleus[0] = "noselected";
                    rngNucleus[1] = 0;
                }
                if (scanLine === 1) {
                    rngNucleus[0] = line.substring(0);
                }
            }
            data.save();
        } else {
            const lore = inv.getStackInSlot(15).getLore();
            let scanLine = 0;
            const rngNucleus = data.RNG.Nucleus;
            for (let line of lore) {
                scanLine--;
                line = ChatLib.removeFormatting(line);
                if (line.toString()?.includes("Selected Drop")) {
                    scanLine = 2;
                } else if (line.toString()?.includes("Progress:")) {
                    rngNucleus[1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                } else if (line.toString()?.includes("Stored Nucleus XP:")) {
                    rngNucleus[0] = "noselected";
                    rngNucleus[1] = 0;
                }
                if (scanLine === 1) {
                    rngNucleus[0] = line.substring(0);
                }
            }
            data.save();
        }
    })
})

function autoUpdate() {
    if (!canUpdate) {
        ChatLib.chat(`${prefix} No updates available.`);
        return;
    }
    request({
        url: "https://api.github.com/repos/TadanoMoyasi/BetterChatCommand/releases/latest",
        json: true
    }).then((response) => {
        updating = true;
        const modurl = response.assets[0].browser_download_url;
        data.todaydungeon = sessionDungoenRuns;
        data.todaykuudra = sessionKuudraRuns;
        data.lasttime = Date.now();
        data.save();
        new Thread(() => {
            new File("./config/ChatTriggers/modules/BCCtemp").mkdir()
            urlToFile(modurl, "./config/ChatTriggers/modules/BCCtemp/BetterChatCommand.zip", 10000, 20000)
            FileLib.unzip("./config/ChatTriggers/modules/BCCtemp/BetterChatCommand.zip", "./config/ChatTriggers/modules/BCCtemp/BetterChatCommand/")
            const sourceDir = "./config/ChatTriggers/modules/BetterChatCommand/";
            const destinationDir = "./config/ChatTriggers/modules/BCCtemp/BetterChatCommand/BetterChatCommand/";
            const filesToMove = ["config.toml", "data.json"];
            const fsourceDir = "./config/ChatTriggers/modules/BetterChatCommand/floorconfig/";
            const fdestinationDir = "./config/ChatTriggers/modules/BCCtemp/BetterChatCommand/BetterChatCommand/floorconfig/";
            let floorConfigMoved = false;
            filesToMove.forEach(fileName => {
                const sourceFile = new File(sourceDir + fileName);
                const destFile = new File(destinationDir + fileName);
                if (sourceFile.exists()) {
                    sourceFile.renameTo(destFile);
                    console.log(`${fileName} is moving to ${destinationDir}`);
                } else {
                    console.log(`${fileName} are not exists`);
                }
                if (!floorConfigMoved) {
                    const fsourceFile = new File(fsourceDir + fileName);
                    const fdestFile = new File(fdestinationDir + fileName);
                    if (fsourceFile.exists()) {
                        fsourceFile.renameTo(fdestFile);
                        console.log(`${fileName} is moving to ${fdestFile}`);
                    } else {
                        console.log(`${fileName} are not exists`);
                    }
                    floorConfigMoved = true
                }
            });
            FileLib.deleteDirectory(new File("./config/ChatTriggers/modules/BetterChatCommand"))
            new File("./config/ChatTriggers/modules/BCCtemp/BetterChatCommand/BetterChatCommand").renameTo(new File("./config/ChatTriggers/modules/BetterChatCommand"))
            FileLib.deleteDirectory(new File("./config/ChatTriggers/modules/BCCtemp"))
        }).start()
        new TextComponent(`${prefix} Update Ready! Click to Start Update!`)
            .setClick("run_command", "/ct load")
            .setHover("show_text", "§aClick to Start Update!")
            .chat()
    })
}

function urlToFile(url, destination, connectTimeOut, readTimeOut) {
    const dir = new File(destination);
    dir.getParentFile().mkdirs();// BCCtempmade tukuru
    const connection = new URL(url).openConnection();
    connection.setDoOutput(true);
    connection.setConnectTimeout(connectTimeOut);
    connection.setReadTimeout(readTimeOut);
    const IS = connection.getInputStream();
    const FilePS = new PrintStream(destination);
    const buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    while ((len = IS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
    }
    IS.close();
    FilePS.close();
}


function avoidSlowDown(player, message, chatFrom) {
    if (player === Player.getName()) {
        setTimeout(() => {
            runCommand(player, message, chatFrom);
        }, 500);
    } else {
        runCommand(player, message, chatFrom);
    }
}

function runCommand(player, message, chatFrom) {
    const lowerCasePlayerName = player.toString().toLowerCase();
    const parts = message.toString().toLowerCase().split(" ");
    const lowerCaseGetName = Player.getName().toLowerCase();
    const floorChat = parts[0].match(/^f(\d)$/);
    const masterChat = parts[0].match(/^m(\d)$/);
    const tierChat = parts[0].match(/^t(\d)$/);
    let doCommand = null;
    const isInWhitelist = data.whitelist.name.includes(lowerCasePlayerName);
    const isInBlacklist = data.blacklist.name.includes(lowerCasePlayerName);
    const isWhitelistEnabled = Settings.whitelisttoggle;
    const isWhiteOnlyLeader = Settings.whiteonlyleader;
    const isBlackOnlyLeader = Settings.blackonlyleader;
    const shouldDoCommand = (isWhitelistEnabled && (isInWhitelist || (isWhiteOnlyLeader && !isInWhitelist))) || (!isWhitelistEnabled && !isInBlacklist) || (isBlackOnlyLeader && isInBlacklist);

    if (Party?.leader === Player.getName() || Party.leader == null) {
        if (floorChat != null && chatFrom === "party") {
            switch (floorChat[1]) {
                case "0":
                    if (!PartyFloorSettings.PartyEntrance) return;
                    doCommand = "joininstance catacombs_Entrance";
                    break;
                case "1":
                    if (!PartyFloorSettings.PartyF1) return;
                    doCommand = "joininstance catacombs_floor_one";
                    break;
                case "2":
                    if (!PartyFloorSettings.PartyF2) return;
                    doCommand = "joininstance catacombs_floor_two";
                    break;
                case "3":
                    if (!PartyFloorSettings.PartyF3) return;
                    doCommand = "joininstance catacombs_floor_three";
                    break;
                case "4":
                    if (!PartyFloorSettings.PartyF4) return;
                    doCommand = "joininstance catacombs_floor_four";
                    break;
                case "5":
                    if (!PartyFloorSettings.PartyF5) return;
                    doCommand = "joininstance catacombs_floor_five";
                    break;
                case "6":
                    if (!PartyFloorSettings.PartyF6) return;
                    doCommand = "joininstance catacombs_floor_six";
                    break;
                case "7":
                    if (!PartyFloorSettings.PartyF7) return;
                    doCommand = "joininstance catacombs_floor_seven";
                    break;
            }
        }

        if (masterChat != null && chatFrom === "party") {
            switch (masterChat[1]) {
                case "1":
                    if (!PartyFloorSettings.PartyM1) return;
                    doCommand = "joininstance master_catacombs_floor_one";
                    break;
                case "2":
                    if (!PartyFloorSettings.PartyM2) return;
                    doCommand = "joininstance master_catacombs_floor_two";
                    break;
                case "3":
                    if (!PartyFloorSettings.PartyM3) return;
                    doCommand = "joininstance master_catacombs_floor_three";
                    break;
                case "4":
                    if (!PartyFloorSettings.PartyM4) return;
                    doCommand = "joininstance master_catacombs_floor_four";
                    break;
                case "5":
                    if (!PartyFloorSettings.PartyM5) return;
                    doCommand = "joininstance master_catacombs_floor_five";
                    break;
                case "6":
                    if (!PartyFloorSettings.PartyM6) return;
                    doCommand = "joininstance master_catacombs_floor_six";
                    break;
                case "7":
                    if (!PartyFloorSettings.PartyM7) return;
                    doCommand = "joininstance master_catacombs_floor_seven";
                    break;
            }
        }

        if (tierChat != null && chatFrom === "party") {
            switch (tierChat[1]) {
                case "1":
                    if (!PartyFloorSettings.PartyT1) return;
                    doCommand = "joininstance kuudra_Basic";
                    break;
                case "2":
                    if (!PartyFloorSettings.PartyT2) return;
                    doCommand = "joininstance kuudra_Hot";
                    break;
                case "3":
                    if (!PartyFloorSettings.PartyT3) return;
                    doCommand = "joininstance kuudra_Burning";
                    break;
                case "4":
                    if (!PartyFloorSettings.PartyT4) return;
                    doCommand = "joininstance kuudra_Fiery";
                    break;
                case "5":
                    if (!PartyFloorSettings.PartyT5) return;
                    doCommand = "joininstance kuudra_Infernal";
                    break;
            }
        }
    }

    if (floorChat == null && masterChat == null && tierChat == null) {
        switch (parts[0]) {
            case "help":
                if (!Settings.Partyhelp) return;
                ChatLib.command("pc !help, !f(floor), !m(floor), !t(tier), !ptme, !warp, !wt, !inv (ign), !allinv, !promote (ign), !kick (ign), !dt (reason), !fps, !ping, !tps, !coords, !cf, !dice, !rng, !boop (ign), !rps (ign), !meow (ign), !cute, !time, !playtime, !runs (dungeon/kuudra), !iq");
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ leader ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "ptme":
            case "pt":
                if (!Settings.Partyptme || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null && Party.leader != null) return;
                doCommand = `p transfer ${lowerCasePlayerName}`;
                break;
            case "warp":
            case "pwarp":
                if (!Settings.Partywarp || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = "p warp";
                break;
            case "warptransfer":
            case "wt":
                if (!Settings.Partywarptransfer || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                if ((isWhitelistEnabled && isInWhitelist) || (!isWhitelistEnabled && !isInBlacklist)) {
                    ChatLib.command("p warp");
                    setTimeout(() => {
                        ChatLib.command(`p transfer ${lowerCasePlayerName}`);
                    }, 500);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "inv":
            case "invite":
                if (Settings.Partyinv || Settings.DMinvite) {
                    if (Party?.leader !== Player.getName() && Party.leader != null) return;
                    const invIGN = parts[1];
                    if ((isWhitelistEnabled && isInWhitelist) || (!isWhitelistEnabled && !isInBlacklist)) {
                        if (chatFrom === "party") {
                            if (Settings.Partyinvconfirm) {
                                confirmWaitTime = 60;
                                inviteConfirm(invIGN);
                                setTimeout(() => {
                                    new TextComponent(`${prefix} Click to invite §d${invIGN}.`)
                                        .setClick("run_command", "/bccconfirminvite")
                                        .setHover("show_text", "&aClick to invite!")
                                        .chat();
                                }, 50);
                            } else {
                                ChatLib.command(`p invite ${invIGN}`);
                            }
                        } else if (chatFrom === "dm") {
                            if (Settings.Partyinvconfirm) {
                                inviteConfirm(lowerCasePlayerName);
                                setTimeout(() => {
                                    new TextComponent(`${prefix} Click to invite §d${lowerCasePlayerName}.`)
                                        .setClick("run_command", "/bccconfirminvite")
                                        .setHover("show_text", "&aClick to invite!")
                                        .chat();
                                }, 50);
                            } else {
                                ChatLib.command(`p invite ${lowerCasePlayerName}`);
                            }
                        }
                    } else if (isInBlacklist) {
                        ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                    } else if (isWhitelistEnabled) {
                        ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                    }
                }
                break;
            case "allinv":
            case "allinvite":
                if (!Settings.Partyallinv || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = "p setting allinvite";
                break;
            case "promote":
                if (!Settings.Partypromote || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = `p promote ${parts[1]}`;
                break;
            case "kick":
            case "pkick":
                if (!Settings.Partypromote || chatFrom !== "party") return;
                if (Party?.leader !== Player.getName() && Party.leader != null) return;
                doCommand = `p kick ${parts[1]}`;
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ Utils ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "dt":
            case "downtime":
                if (!Settings.Partydt || chatFrom === "dm") return;
                afterDownTime = true;
                afterReady = true;
                if (!downTimePlayer.includes(lowerCasePlayerName)) {
                    downTimePlayer.push(lowerCasePlayerName);
                    if (parts.length !== 1) {
                        let reason = parts[1];
                        if (2 < parts.length) {
                            for (let re = 2; re < parts.length; re++) {
                                reason += ` ${parts[re]}`;
                            }
                        }
                        downTimeReason.push(reason);
                    } else if (parts.length === 1) {
                        downTimeReason.push("No reason Given");
                    }
                    ChatLib.chat(`${prefix} §aReminder set for the end of the run`);
                }
                if (Settings.PartyReady) {
                    if (!readyPlayer.includes(lowerCasePlayerName)) {
                        readyPlayer.push(lowerCasePlayerName);
                    }
                }
                if (somefeaturesExists) {
                    ChatLib.command("somefeaturesrequeuestop", true);
                }
                break;
            case "r":
            case "ready":
                if (!Settings.PartyReady) return;
                if (!afterReady) return;
                setPlayerReady(lowerCasePlayerName);
                break;
            case "fps":
                if (!Settings.Partyfps || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc FPS: ${Client.getFPS()}`);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "ping":
                if (!Settings.Partyping || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    Client.sendPacket(new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS));
                    lastPingAt = System.nanoTime();
                    requestedPing = true;
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "tps":
                if (!Settings.Partytps || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    requestedTPS = true;
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "power":
            case "enrich":
            case "mp":
            case "magical":
            case "tuning":
                if (!Settings.PartyPower || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc MP: ${data.profile.mp} | Power: ${data.profile.power} | Tuning: ${data.profile.tuning} | Enrich: ${data.profile.enrichamount}, ${data.profile.enrich}`)
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "pet":
                if (!Settings.PartyPet || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc Pet: ${data.profile.pet}`);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "coords":
            case "coord":
            case "whereareyou":
            case "xyz":
            case "waypoint":
                if (!Settings.PartyCoords || !Settings.DMCoords || !Settings.allchattoggle) return;
                if (shouldDoCommand) {
                    if (chatFrom === "party") {
                        ChatLib.command(`pc x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                    } else if (chatFrom === "dm") {
                        ChatLib.command(`r x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                    } else if (chatFrom === "all") {
                        ChatLib.command(`ac x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ Party ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "cf":
            case "coin":
            case "coinflip":
            case "flip":
                if (!Settings.Partycf || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc ${lowerCasePlayerName} rolled ${Math.floor(Math.random() * 2) === 0 ? "Heads" : "Tails"}`);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "dice":
            case "roll":
                if (!Settings.Partydice || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc ${lowerCasePlayerName} rolled a ${1 + Math.floor(Math.random() * 6)}.`);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "rng":
                if (!Settings.Partyrng || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    const rngIGN = parts[1];
                    if (rngIGN != null && rngIGN !== "sontaku") {
                        ChatLib.command(`pc ${rngIGN} have ${Math.floor(Math.random() * 100) + 1}% RNG Chance.`);
                    } else if (rngIGN === "sontaku") {
                        ChatLib.command(`pc ${lowerCasePlayerName} have 100% RNG Chance.`);
                    } else {
                        ChatLib.command(`pc ${lowerCasePlayerName} have ${Math.floor(Math.random() * 100) + 1}% RNG Chance.`);
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "rrng":
            case "realrng":
                if (!Settings.PartyRealrng || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    const rngType = parts[1];
                    switch (rngType) {
                        case "zombie":
                        case "revenant":
                        case "zsl":
                            ChatLib.command(`pc ZombieRNG: ${data.RNG.Slayer.Zombie[0]}, ${data.RNG.Slayer.Zombie[1]}%`);
                            break;
                        case "spider":
                        case "tarantula":
                            ChatLib.command(`pc SpiderRNG: ${data.RNG.Slayer.Spider[0]}, ${data.RNG.Slayer.Spider[1]}%`);
                            break;
                        case "packmaster":
                        case "pack":
                        case "wolf":
                        case "sven":
                        case "wsl":
                            ChatLib.command(`pc WolfRNG: ${data.RNG.Slayer.Wolf[0]}, ${data.RNG.Slayer.Wolf[1]}%`);
                            break;
                        case "enderman":
                        case "end":
                        case "void":
                        case "voidgloom":
                        case "seraph":
                        case "esl":
                            ChatLib.command(`pc EndermanRNG: ${data.RNG.Slayer.Enderman[0]}, ${data.RNG.Slayer.Enderman[1]}%`);
                            break;
                        case "vampire":
                        case "vamp":
                        case "rift":
                        case "vsl":
                            ChatLib.command(`pc VampireRNG: ${data.RNG.Slayer.Vampire[0]}, ${data.RNG.Slayer.Vampire[1]}%`);
                            break;
                        case "blaze":
                        case "inferno":
                        case "demonlord":
                        case "bsl":
                            ChatLib.command(`pc BlazeRNG: ${data.RNG.Slayer.Blaze[0]}, ${data.RNG.Slayer.Blaze[1]}%`);
                            break;
                        case "f1":
                            ChatLib.command(`pc F1RNG: ${data.RNG.Catacombs.Normal.F1[0]}, ${data.RNG.Catacombs.Normal.F1[1]}%`);
                            break;
                        case "f2":
                            ChatLib.command(`pc F2RNG: ${data.RNG.Catacombs.Normal.F2[0]}, ${data.RNG.Catacombs.Normal.F2[1]}%`);
                            break;
                        case "f3":
                            ChatLib.command(`pc F3RNG: ${data.RNG.Catacombs.Normal.F3[0]}, ${data.RNG.Catacombs.Normal.F3[1]}%`);
                            break;
                        case "f4":
                            ChatLib.command(`pc F4RNG: ${data.RNG.Catacombs.Normal.F4[0]}, ${data.RNG.Catacombs.Normal.F4[1]}%`);
                            break;
                        case "f5":
                            ChatLib.command(`pc F5RNG: ${data.RNG.Catacombs.Normal.F5[0]}, ${data.RNG.Catacombs.Normal.F5[1]}%`);
                            break;
                        case "f6":
                            ChatLib.command(`pc F6RNG: ${data.RNG.Catacombs.Normal.F6[0]}, ${data.RNG.Catacombs.Normal.F6[1]}%`);
                            break;
                        case "f7":
                            ChatLib.command(`pc F7RNG: ${data.RNG.Catacombs.Normal.F7[0]}, ${data.RNG.Catacombs.Normal.F7[1]}%`);
                            break;
                        case "m1":
                            ChatLib.command(`pc M1RNG: ${data.RNG.Catacombs.Master.M1[0]}, ${data.RNG.Catacombs.Master.M1[1]}%`);
                            break;
                        case "m2":
                            ChatLib.command(`pc M2RNG: ${data.RNG.Catacombs.Master.M2[0]}, ${data.RNG.Catacombs.Master.M2[1]}%`);
                            break;
                        case "m3":
                            ChatLib.command(`pc M3RNG: ${data.RNG.Catacombs.Master.M3[0]}, ${data.RNG.Catacombs.Master.M3[1]}%`);
                            break;
                        case "m4":
                            ChatLib.command(`pc M4RNG: ${data.RNG.Catacombs.Master.M4[0]}, ${data.RNG.Catacombs.Master.M4[1]}%`);
                            break;
                        case "m5":
                            ChatLib.command(`pc M5RNG: ${data.RNG.Catacombs.Master.M5[0]}, ${data.RNG.Catacombs.Master.M5[1]}%`);
                            break;
                        case "m6":
                            ChatLib.command(`pc M6RNG: ${data.RNG.Catacombs.Master.M6[0]}, ${data.RNG.Catacombs.Master.M6[1]}%`);
                            break;
                        case "m7":
                            ChatLib.command(`pc M7RNG: ${data.RNG.Catacombs.Master.M7[0]}, ${data.RNG.Catacombs.Master.M7[1]}%`);
                            break;
                        case "nucleus":
                        case "crystal":
                        case "cn":
                            ChatLib.command(`pc NucleusRNG: ${data.RNG.Nucleus[0]}, ${data.RNG.Nucleus[1]}%`);
                            break;
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "boop":
                if (Settings.Partyboop || chatFrom !== "dm") {
                    const boopIGN = parts[1];
                    if (boopIGN !== lowerCasePlayerName) return;
                    if (shouldDoCommand) {
                        if (boopIGN == null) {
                            if (lowerCasePlayerName === lowerCaseGetName) return;
                            ChatLib.command(`boop ${lowerCasePlayerName}`);
                        } else {
                            ChatLib.command(`boop ${boopIGN}`);
                        }
                    } else if (isInBlacklist) {
                        ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                    } else if (isWhitelistEnabled) {
                        ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                    }
                }
                break;
            case "rps":
                if (!Settings.Partyrps || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    enemyIGN = parts[1];
                    const whatChoice = Math.floor(Math.random() * 3);
                    if (lowerCasePlayerName === lowerCaseGetName) {// me to enemy
                        responseWaitTime = 60;
                        isRPSActive = true;
                        RPSStarter = true;
                        checkEnemy();
                    } else if (enemyIGN === lowerCaseGetName) {// enemy from me
                        playerChoose = RPS[whatChoice];
                        isRPSActive = true;
                        ChatLib.command(`pc I choose ${playerChoose}`);
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "meow":
                if (!Settings.Partymeow || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    const meowIGN = parts[1];
                    if (meowIGN !== lowerCaseGetName) {
                        ChatLib.command(`tell ${meowIGN} meow`);
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "cute":
                if (Settings.Partycute || chatFrom !== "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc ${lowerCasePlayerName} have ${Math.floor(Math.random() * 100) + 1}% Cute.`);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "nowtime":
            case "timezone":
            case "time":
                if (!Settings.Partynowtime || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    ChatLib.command(`pc ${new Date().toLocaleTimeString()}`);
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "playtime":
                if (!Settings.Partyplaytime || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    const timeType = parts[1];
                    switch (timeType) {
                        case "today":
                        case null:
                        case undefined:
                        case "day": {
                            const playTimeToday = formatSeconds(((Date.now() - data.jointime) / 1000).toFixed());
                            ChatLib.command(`pc Today Playtime: ${playTimeToday}`);
                            break;
                        }
                        case "mayor": {
                            const mayorPlayTime = data.playtimes.mayor.playtime;
                            const sessionPlayTime = ((Date.now() - data.playtimes.mayor.jointime) / 1000).toFixed();
                            const addupPlayTime = Number(mayorPlayTime) + Number(sessionPlayTime);
                            const formatMayorPlayTime = formatSeconds(addupPlayTime);
                            ChatLib.command(`pc Mayor Playtime: ${formatMayorPlayTime}`);
                            break;
                        }
                        case "all":
                        case "alltime":
                            ChatLib.command(`pc Alltime Playtime: ${data.allplaytime}`);
                            break;
                        case "crim":
                        case "crimson":
                        case "isle":
                            ChatLib.command(`pc Crimson Playtime: ${data.playtimes.Crimson}h`)
                            break;
                        case "crystal":
                        case "hollow":
                            ChatLib.command(`pc Crystal Playtime: ${data.playtimes.Crystal}h`)
                            break;
                        case "dark":
                        case "da":
                        case "auction":
                            ChatLib.command(`pc DA Playtime: ${data.playtimes.Dark}h`)
                            break;
                        case "deep":
                        case "caverns":
                            ChatLib.command(`pc Deep Caverns Playtime: ${data.playtimes.Deep}h`)
                            break;
                        case "dungeon":
                        case "dungeons":
                            ChatLib.command(`pc Dungeon Playtime: ${data.playtimes.Dungeon}h`)
                            break;
                        case "dhub":
                        case "dh":
                        case "dungeonhub":
                            ChatLib.command(`pc Dhub Playtime: ${data.playtimes.Crystal}h`)
                            break;
                        case "dwarven":
                        case "mines":
                            ChatLib.command(`pc Dwarven Playtime: ${data.playtimes.Dwarven}h`)
                            break;
                        case "garden":
                            ChatLib.command(`pc Gerden Playtime: ${data.playtimes.Garden}h`)
                            break;
                        case "gold":
                            ChatLib.command(`pc Gold Mine Playtime: ${data.playtimes.Gold}h`)
                            break;
                        case "hub":
                            ChatLib.command(`pc Hub Playtime: ${data.playtimes.Hub}h`)
                            break;
                        case "jerry":
                        case "workshop":
                            ChatLib.command(`pc Jerry Playtime: ${data.playtimes.Jerry}h`)
                            break;
                        case "kuudra":
                        case "drakuu":
                            ChatLib.command(`pc Kuudra Playtime: ${data.playtimes.Kuudra}h`)
                            break;
                        case "shaft":
                        case "mineshaft":
                            ChatLib.command(`pc Mineshaft Playtime: ${data.playtimes.Shaft}h`)
                            break;
                        case "island":
                        case "is":
                        case "private":
                            ChatLib.command(`pc Island Playtime: ${data.playtimes.Island}h`)
                            break;
                        case "spider":
                        case "den":
                            ChatLib.command(`pc Spider Playtime: ${data.playtimes.Spider}h`)
                            break;
                        case "end":
                            ChatLib.command(`pc The End Playtime: ${data.playtimes.End}h`)
                            break;
                        case "farm":
                        case "barn":
                        case "mushroom":
                            ChatLib.command(`pc Barn Playtime: ${data.playtimes.Farm}h`)
                            break;
                        case "rift":
                            ChatLib.command(`pc Rift Playtime: ${data.playtimes.Rift}h`)
                            break;
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "runs":
                if (Settings.Partyruns || chatFrom !== "dm") return;
                if (shouldDoCommand) {
                    const runType = parts[1];
                    if (runType === "kuudra") {
                        ChatLib.command(`pc Today Kuudra Runs: ${sessionKuudraRuns}`);
                    } else if (runType === "dungeon" || runType === "dungeons" || runType === "catacombs" || runType == null || runType === undefined) {
                        ChatLib.command(`pc Today Dungeon Runs: ${sessionDungoenRuns}`);
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
            case "iq":
            case "iqtest":
                if (!Settings.Partyiq || chatFrom === "dm") return;
                if (shouldDoCommand) {
                    const iqIGN = parts[1];
                    const iqIs = Math.floor(Math.random() * 302);
                    if (iqIGN != null && iqIGN !== "sontaku") {
                        if (iqIs === 0) {
                            ChatLib.command(`pc OMG!! ${iqIGN} have 5000 IQ!! NO WAY!!`);
                        } else if (iqIs >= 1 && iqIs <= 85) {
                            ChatLib.command(`pc ${iqIGN} have ${iqIs} IQ! Study more!`);
                        } else if (iqIs >= 86 && iqIs <= 110) {
                            ChatLib.command(`pc ${iqIGN} have ${iqIs} IQ! Not bad!`);
                        } else if (iqIs >= 111 && iqIs <= 200) {
                            ChatLib.command(`pc ${iqIGN} have ${iqIs} IQ! You have good brain! `);
                        } else if (iqIs >= 201 && iqIs <= 300) {
                            ChatLib.command(`pc WOW! ${iqIGN} have ${iqIs} IQ! :Galaxy Brain:`);
                        } else if (iqIs === 301) {
                            ChatLib.command(`pc ${iqIGN} have 334 IQ! nandeya!`);
                        }
                    } else if (iqIGN === "sontaku") {
                        ChatLib.command(`pc OMG!! ${lowerCasePlayerName} have 5000 IQ!! NO WAY!!`);
                    } else {
                        if (iqIs === 0) {
                            ChatLib.command(`pc OMG!! ${lowerCasePlayerName} have 5000 IQ!! NO WAY!!`);
                        } else if (iqIs >= 1 && iqIs <= 85) {
                            ChatLib.command(`pc ${lowerCasePlayerName} have ${iqIs} IQ! Study more!`);
                        } else if (iqIs >= 86 && iqIs <= 110) {
                            ChatLib.command(`pc ${lowerCasePlayerName} have ${iqIs} IQ! Not bad!`);
                        } else if (iqIs >= 111 && iqIs <= 200) {
                            ChatLib.command(`pc ${lowerCasePlayerName} have ${iqIs} IQ! You have good brain! `);
                        } else if (iqIs >= 201 && iqIs <= 300) {
                            ChatLib.command(`pc WOW! ${lowerCasePlayerName} have ${iqIs} IQ! :Galaxy Brain:`);
                        } else if (iqIs === 301) {
                            ChatLib.command(`pc ${lowerCasePlayerName} have 334 IQ! nandeya!`);
                        }
                    }
                } else if (isInBlacklist) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
                } else if (isWhitelistEnabled) {
                    ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
                }
                break;
        }
    }

    if (doCommand != null) {
        if ((isWhitelistEnabled && isInWhitelist) || (!isWhitelistEnabled && !isInBlacklist)) {
            ChatLib.command(doCommand);
        } else if (isInBlacklist) {
            ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis in blacklist`);
        } else if (isWhitelistEnabled) {
            ChatLib.chat(`${prefix} §f${lowerCasePlayerName} §cis not in whitelist`);
        }
    }
}