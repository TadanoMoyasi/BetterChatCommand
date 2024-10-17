import Settings from "./config";
import PartyFloorSettings from "./floorconfig/floorconfig";
import Party from "../BloomCore/Party";
import PogObject from "../PogData";
import request from "requestV2/index";
import { GASURL } from "./forgitignore";

const metadata = JSON.parse(FileLib.read("BetterChatCommand", "metadata.json"));
const version = metadata.version;
const prefix = "§8[§aBCC§8]§r";
const helps = "/bcc, /bcc help, /bcc blacklist (ign), /bcc whitelist (ign), /bcc (floor), /bcc cute, /bcc stop !help, !f(floor), !m(floor), !t(tier), !ptme, !warp, !wt, !inv (ign), !allinv, !promote (ign), !kick (ign), !dt (reason), !fps, !ping, !tps, !power, !pet, !coords, !cf, !dice, !rng, !boop (ign), !rps (ign), !meow (ign), !cute, !time, !playtime, !runs (dungeon/kuudra), !iq";
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
let lastTimeUsed = 0;
let afterdowntime = false;
let downtimeplayer = [];
let downtimereason = [];
const rps = ["Rock", "Paper", "Scissors"];
let enemyign = null;
let rpsis = false;
let enemychoose = null;
let ichoose = null;
let numa = 0;
let enemyhavebcc = false;
let tryget = 0;
let rpsyou = false;
let afterready = false;
let readyplayer = [];
let stopready = false;
let joinfloor = null;
let kuudraruns = 0;
let dungoenruns = 0;
let confirmwaittime = 60;
let confirm = false;
let somefeatureis = false;
let scanned = false;
const celeblations = ["Aqua", "Black", "Green", "Lime", "Orange", "Pink", "Purple", "Red", "Yellow", "Flushed", "Happy", "Cheeky", "Cool", "Cute", "Derp", "Grumpy", "Regular", "Shock", "Tears"];
let enrichScanned = 0;
let enrichScannedAmount = 0;

const data = new PogObject(
    "BetterChatCommand",
    {
        firstTime: false,
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
        lastversion: "",
        jointime: 1,
        lasttime: 1,
        todaykuudra: 0,
        todaydungeon: 0
    },
    "data.json"
);

const check = register("tick", () => {
    check.unregister();
    if (!data.firstTime) {
        //I'm making this because I want to know how many people are using it. and Practice using GAS
        request({
            url: GASURL,
            method: "POST",
            headers: {
                "Content-type": "application/Json",
                "User-Agent": "Mozilla/5.0"
            },
            body: ({
                "name": "BetterChatCommand"
            })
        })
        data.firstTime = true;
    }
    //check somefeatures for dt requeue
    const fileExists = FileLib.exists("somefeatures", "features/autorequeue.js");
    if (fileExists) {
        somefeatureis = true;
    } else {
        somefeatureis = false;
    }
    if (Settings.debugmode) {
        console.log("----BCC----");
        console.log(`version: ${version}.1`);
        console.log(`jointime: ${data.jointime}`);
        console.log(`lasttime: ${data.lasttime}`);
        console.log(`nowtime: ${Date.now()}`);
        console.log(`somefeature is ${somefeatureis}`);
    }
    if (data.jointime === 1 || data.lasttime === 1) {
        data.jointime = Date.now();
        data.lasttime = Date.now();
        data.save();
    }
    if (Date.now() - data.lasttime > 3600000) {
        data.jointime = Date.now();
        kuudraruns = 0;
        dungoenruns = 0;
        data.todaydungeon = dungoenruns;
        data.todaykuudra = kuudraruns;
        data.save();
        console.log("[BCC] reset data");
    } else {
        dungoenruns = data.todaydungeon;
        kuudraruns = data.todaykuudra;
    }
    if (version !== data.lastversion) {
        data.lastversion = version;
        data.save();
        const changelog = JSON.parse(FileLib.read("BetterChatCommand", "changelog.json"));
        if (changelog.length !== 0) {
            setTimeout(() => {
                ChatLib.chat("§b§l§m--------------------------------------------");
                ChatLib.chat(ChatLib.getCenteredText(`§3§lBetterChatCommand ${version}`));
                // biome-ignore lint/complexity/noForEach: <explanation>
                changelog.forEach(change => ChatLib.chat(ChatLib.getCenteredText(change))) // why i cant use for...of???
                ChatLib.chat(ChatLib.getCenteredText("§3Thank you for installing!"));
                ChatLib.chat(ChatLib.getCenteredText("§cIf you find any bugs, please contact me.(tadanomoyasi)"));
                ChatLib.chat("§b§l§m--------------------------------------------");
            }, 500);
        }
    }
    request({
        url: GASURL,
        json: true
    }).then((responce) => {
        const bccletestver = responce.versions.BetterChatCommand;
        if (version !== bccletestver) {
            new TextComponent(`${prefix} §aNew version available!`)
                .setClick("run_command", "/ct copy https://discord.gg/TZB4X9h8wq") // setClickValueだと動かなかった。みんな気をつけようね。
                .setHover("show_text", "§aClick to copy discord link")
                .chat()
        }
    }).catch((e) => {
        ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
    });
});

register("gameUnload", () => {
    data.todaydungeon = dungoenruns;
    data.todaykuudra = kuudraruns;
    data.lasttime = Date.now();
    data.save();
});

// bcc blacklist abc
// com   arg0    arg1
// bcc debug getuuid tdmy
//    command name  debugname
register("command", (...args) => {
    let floorchat = null;
    let masterchat = null;
    let tierchat = null;
    if (args === undefined) {
        Settings.openGUI();
        return;
    }
    const command = args[0] === undefined ? undefined : args[0].toLowerCase();
    let name = args[1];
    let debugname = args[2];
    if (command) {
        floorchat = args[0].match(/f(\d)/i);
        masterchat = args[0].match(/m(\d)/i);
        tierchat = args[0].match(/t(\d)/i);
    }

    //ここらへん綺麗にしたい所ではある
    if (floorchat != null) {
        switch (floorchat[1]) {
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

    if (masterchat != null) {
        switch (masterchat[1]) {
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

    if (tierchat != null) {
        switch (tierchat[1]) {
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
            name = name.toLowerCase();
            witchfrom = "blacklist";
            lists(name, witchfrom);
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
            name = name.toLowerCase();
            witchfrom = "whitelist";
            lists(name, witchfrom);
            break;
        case "cute": {
            const cutenum = Math.floor(Math.random() * 6);
            const cutevids = cutes[cutenum];
            ChatLib.chat(`§aCute things are cute, that's why cute things are cute, and cute means cute, so cute is cute plus cute.§r \n${cutevids}`);
            break;
        }
        case "stop":
            stopready = true;
            ChatLib.chat(`${prefix} Rejoin Stoped`);
            setTimeout(() => {
                stopready = false;
            }, 5000);
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
                    if (!debugname) {
                        ChatLib.chat("no name");
                        break;
                    }
                    debugname = debugname.toLowerCase();
                    request({
                        url: `https://api.mojang.com/users/profiles/minecraft/${debugname}`,
                        json: true
                    }).then((responce) => {
                        const getuuid = responce.id;
                        const getname = responce.name;
                        new TextComponent(`${getname}'s uuid: ${getuuid}`)
                            .setClick("run_command", `/ct copy ${getuuid}`)
                            .setHover("show_text", "§aClick to copy uuid")
                            .chat()
                    }).catch((e) => {
                        ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
                    });
                    break;
                case "version":
                    if (!debugname) {
                        ChatLib.chat("no name");
                        break;
                    }
                    data.lastversion = debugname;
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
function lists(listsplayer, witchfrom) {
    if (witchfrom === "blacklist") {
        request({
            url: `https://api.mojang.com/users/profiles/minecraft/${listsplayer}`,
            json: true
        }).then((responce) => {
            const getuuid = responce.id;
            if (data.blacklist.uuid.includes(getuuid)) {
                const pos = data.blacklist.uuid.indexOf(getuuid);
                data.blacklist.uuid.splice(pos, 1);
                data.blacklist.name.splice(pos, 1);
                ChatLib.chat(`${prefix} §f${listsplayer} §chas been removed from blacklist.`);
            } else {
                data.blacklist.uuid.push(getuuid);
                data.blacklist.name.push(listsplayer.toLowerCase());
                ChatLib.chat(`${prefix} §f${listsplayer} §ahas been added to the blacklist.`);
            }
        }).catch((e) => {
            ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
        });
        data.save();
        return;
    }
    if (witchfrom === "whitelist") {
        request({
            url: `https://api.mojang.com/users/profiles/minecraft/${listsplayer}`,
            json: true
        }).then((responce) => {
            const getuuid = responce.id;
            if (data.whitelist.uuid.includes(getuuid)) {
                const pos = data.whitelist.uuid.indexOf(getuuid);
                data.whitelist.uuid.splice(pos, 1);
                data.whitelist.name.splice(pos, 1);
                ChatLib.chat(`${prefix} §f${listsplayer} §chas been removed from whitelist.`);
            } else {
                data.whitelist.uuid.push(getuuid);
                data.whitelist.name.push(listsplayer.toLowerCase());
                ChatLib.chat(`${prefix} §f${listsplayer} §ahas been added to the whitelist.`);
            }
        }).catch((e) => {
            ChatLib.chat(`${prefix} §cError: §f${JSON.parse(e).errorMessage}`);
        });
        data.save();
        return;
    }
}

register("command", (listsplayer) => {
    if (!listsplayer) {
        if (data.blacklist.name.length !== 0) {
            ChatLib.chat(`${prefix} §8blacklist§f: §f${data.blacklist.name.toString()}`);
        } else {
            ChatLib.chat(`${prefix} §cUse /bccblacklist {name} to blacklist a player.`);
        }
        return;
    }
    witchfrom = "blacklist";
    lists(listsplayer, witchfrom);
}).setName("bccblacklist");

register("command", (listsplayer) => {
    if (!listsplayer) {
        if (data.whitelist.name.length !== 0) {
            ChatLib.chat(`${prefix} §fwhitelist: §f${data.whitelist.name.toString()}`);
        } else {
            ChatLib.chat(`${prefix} §cUse /bccwhitelist {name} to whitelist a player.`);
        }
        return;
    }
    witchfrom = "whitelist";
    lists(listsplayer, witchfrom);
}).setName("bccwhitelist");

register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (Date.now() - lastTimeUsed < 1000) return;
    chatfrom = "party";
    RunCommands(player, message, chatfrom);
    lastTimeUsed = Date.now();
}).setCriteria(/^Party >(?: \[.+\])? (\w+)(?: [Ⓑ|ቾ|⚒])?: !(.+)/);

//Party > [MVP+] Tdmy: !help
//Party > [MVP+] TdMy Ⓑ: !warp
//Party > dazuku: !dice
//no rank bro

register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (Date.now() - lastTimeUsed < 1000) return;
    chatfrom = "dm";
    RunCommands(player, message, chatfrom);
    lastTimeUsed = Date.now();
}).setCriteria(/^From(?: \[.+\])? (\w+): !(.+)/);

register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.debugmode) return;
    chatfrom = "party";
    RunCommands(player, message, chatfrom);
    lastTimeUsed = Date.now();
}).setCriteria(/^<(\w+)> !(.+)/);

register("chat", (player, message) => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.allchattoggle) return;
    if (Date.now() - lastTimeUsed < 3000) return;
    chatfrom = "all";
    RunCommands(player, message, chatfrom);
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
let saidDt = false;
register("chat", () => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.Partydt) return;
    if (afterdowntime) {
        if (saidDt) return;
        let dtchat = "pc Need dt: ";
        for (let i = 0; i < downtimeplayer.length; i++) {
            dtchat += `${downtimeplayer[i]}: ${downtimereason[i]}`;
            if (i < downtimeplayer.length - 1) {
                dtchat += ", ";
            }
        }
        saidDt = true;
        setTimeout(() => {
            ChatLib.command(dtchat);
        }, 1000);
        setTimeout(() => {
            saidDt = false;
            afterdowntime = false;
            downtimeplayer = [];
            downtimereason = [];
        }, 5000);
    }
}).setCriteria(/ *> EXTRA STATS <| *KUUDRA DOWN!| *DEFEAT/);

// ■■■   ■■■    ■    ■■    ■    ■
// ■  ■  ■     ■ ■   ■  ■   ■  ■
// ■■■   ■■■  ■■■■■  ■  ■    ■
// ■ ■   ■    ■   ■  ■  ■    ■
// ■  ■  ■■■  ■   ■  ■■■     ■
function pready(readyname) {
    if (afterready) {
        if (readyplayer.length > 0) {
            if (readyplayer.includes(readyname)) {
                const spl = readyplayer.indexOf(readyname);
                readyplayer.splice(spl, 1);
            }
            if (readyplayer.length === 0) {
                const rtext = `${prefix} Checked the ready status of all players who !dt'd. After 3 seconds, you will automatically enter the floor you were previously on. click chat to stop rejoin!`;
                new TextComponent(rtext)
                    .setClick("run_command", "/bcc stop")
                    .setHover("show_text", "§aClick to stop rejoin!")
                    .chat();
                setTimeout(() => {
                    if (!stopready) {
                        if (joinfloor == null) {
                            ChatLib.chat(`${prefix} failed to get previous floor`);
                        } else {
                            ChatLib.command(`joininstance ${joinfloor}`);
                        }
                    }
                    afterready = false;
                    stopready = false;
                    readyplayer = [];
                }, 3000);
            } else {
                ChatLib.chat(`${prefix} still have dt player`);
            }
        }
    }
}

register("chat", (mode, floor) => {
    if (mode === "MM") {
        switch (floor) {
            case "I":
                joinfloor = "master_catacombs_floor_one";
                break;
            case "II":
                joinfloor = "master_catacombs_floor_two";
                break;
            case "III":
                joinfloor = "master_catacombs_floor_three";
                break;
            case "IV":
                joinfloor = "master_catacombs_floor_four";
                break;
            case "V":
                joinfloor = "master_catacombs_floor_five";
                break;
            case "VI":
                joinfloor = "master_catacombs_floor_six";
                break;
            case "VII":
                joinfloor = "master_catacombs_floor_seven";
                break;
        }
    } else {
        switch (floor) {
            case "I":
                joinfloor = "catacombs_floor_one";
                break;
            case "II":
                joinfloor = "catacombs_floor_two";
                break;
            case "III":
                joinfloor = "catacombs_floor_three";
                break;
            case "IV":
                joinfloor = "catacombs_floor_four";
                break;
            case "V":
                joinfloor = "catacombs_floor_five";
                break;
            case "VI":
                joinfloor = "catacombs_floor_six";
                break;
            case "VII":
                joinfloor = "catacombs_floor_seven";
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
            joinfloor = "kuudra_basic";
            break;
        case "Hot":
            joinfloor = "kuudra_hot";
            break;
        case "Burning":
            joinfloor = "kuudra_burning";
            break;
        case "Fiery":
            joinfloor = "kuudra_fiery";
            break;
        case "Infernal":
            joinfloor = "kuudra_infernal";
            break;
    }
}).setCriteria(/(?:\[.+\] )?\w+ entered Kuudra's Hollow, (.+) Tier!/).setContains();

register("chat", () => {
    joinfloor = "catacombs_entrance"
}).setCriteria(/(?:\[.+\] )?\w+ entered The Catacombs, Entrance!/).setContains();

//reset
register("chat", () => {
    if (downtimeplayer.length !== 0) return;
    afterready = false;
    stopready = false;
    readyplayer = [];
}).setCriteria("[NPC] Mort: You should find it useful if you get lost.");

register("chat", () => {
    if (downtimeplayer.length !== 0) return;
    afterready = false;
    stopready = false;
    readyplayer = [];
}).setCriteria("[NPC] Elle: Okay adventurers, I will go and fish up Kuudra!");

// ■■■   ■■■   ■■■
// ■  ■  ■  ■  ■
// ■■■   ■■■   ■■■
// ■ ■   ■       ■
// ■  ■  ■     ■■■
function checkenemy() {
    const whatchoice = Math.floor(Math.random() * 3);
    ichoose = rps[whatchoice];
    if (tryget === 0) {
        rpsis = false;
        return;
    }
    if (enemyhavebcc) {
        ChatLib.command(`pc I choose ${ichoose}`);
    } else {
        setTimeout(() => {
            checkenemy();
            tryget--;
        }, 100); //0.1s
    }
}

function getenemychoose() {
    if (enemychoose != null) {
        const whatchoice = Math.floor(Math.random() * 3);
        ichoose = rps[whatchoice];
        setTimeout(() => {
            ChatLib.command(`pc I choose ${ichoose}`);
        }, 500);
    } else {
        setTimeout(() => {
            getenemychoose();
        }, 100);
    }
}

function winrps() {
    setTimeout(() => {
        ChatLib.command("pc This battle is mine");
    }, 2000);
    enemychoose = null;
    enemyign = null;
    ichoose = null;
    dorpsnow = false;
    rpsis = false;
    rpsyou = false;
    enemyhavebcc = false;
    numa = 0;
}

function loserps() {
    setTimeout(() => {
        ChatLib.command("pc uh nah");
    }, 2000);
    enemychoose = null;
    enemyign = null;
    ichoose = null;
    dorpsnow = false;
    rpsis = false;
    rpsyou = false;
    enemyhavebcc = false;
    numa = 0;
}

function nextrps() {
    numa++;
    enemychoose = null;
    ichoose = null;
    ichoose = rps[whatchoice];
    setTimeout(() => {
        if (rpsyou) {
            ChatLib.command(`pc I choose ${ichoose}`);
        } else if (!rpsyou) {
            getenemychoose();
        }
    }, 2000);
}

register("chat", (player, hand) => {
    if (!Settings.AllCommandToggle) return;
    if (player === Player.getName()) return;
    const getchoose = `${hand}`;
    if (player.includes("ቾ") || player.includes("⚒") || player.includes("Ⓑ")) {
        // biome-ignore lint/style/noParameterAssign: <explanation>
        player = player.split(" ")[0];
    }
    realplayername = player;
    const strplayername = realplayername.toString().toLowerCase();
    if (rpsis === true) {
        if (strplayername === enemyign) {
            if (!enemyhavebcc) {
                enemyhavebcc = true;
            }
            if (enemychoose == null) {
                enemychoose = getchoose;
                changed = true;
                if (ichoose != null && enemychoose != null && changed === true) {
                    changed = false;
                    if (numa > 4) {
                        enemychoose = null;
                        enemyign = null;
                        ichoose = null;
                        dorpsnow = false;
                        rpsis = false;
                        numa = 0;
                        ChatLib.command("pc Five times, the RPS game Forced end.");
                        return;
                    }
                    switch (enemychoose) {
                        case "Paper":
                            switch (ichoose) {
                                case "Paper":
                                    nextrps();
                                    break;
                                case "Rock":
                                    loserps();
                                    break;
                                case "Scissors":
                                    winrps();
                                    break;
                            }
                            break;
                        case "Rock":
                            switch (ichoose) {
                                case "Paper":
                                    winrps();
                                    break;
                                case "Rock":
                                    nextrps();
                                    break;
                                case "Scissors":
                                    loserps();
                                    break;
                            }
                            break;
                        case "Scissors":
                            switch (ichoose) {
                                case "Paper":
                                    loserps();
                                    break;
                                case "Rock":
                                    winrps();
                                    break;
                                case "Scissors":
                                    nextrps();
                                    break;
                            }
                            break;
                    }
                }
            }
        }
    }
}).setCriteria(/^Party >(?: \[.+\])? (\w+) ?[Ⓑ|ቾ|⚒]?: I choose (.+)/);

//runs
register("chat", () => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.Partyruns) return;
    kuudraruns++;
}).setCriteria(/ *KUUDRA DOWN!/);

register("chat", () => {
    if (!Settings.AllCommandToggle) return;
    if (!Settings.Partyruns) return;
    dungoenruns++;
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

function inviteConfirm(invname) {
    if (confirm) {
        ChatLib.command(`p invite ${invname}`);
        confirmwaittime = 0;
        confirm = false;
    } else {
        if (confirmwaittime === 0) return;
        setTimeout(() => {
            confirmwaittime--;
            inviteConfirm(invname);
        }, 1000);
    }
}

register("command", () => {
    if (confirmwaittime === 0) {
        ChatLib.chat(`${prefix} Confirm Timed Out`);
        return;
    }
    confirm = true;
}).setName("bccconfirminvite");


//i hate this shit containers
register("guiClosed", () => {
    scanned = false;
})

register("tick", () => {
    const inv = Player.getContainer();
    if (scanned || !inv || !inv.getName().includes("Your Bags") && !inv.getName().includes("Accessory Bag")) return;
    scanned = true;
    Client.scheduleTask(4, () => {
        const items = inv.getItems();
        let mp = "";
        let power = "";
        let tuning = "";
        let enrichamount = 0;
        let enrich = "";
        let max = 0;
        let now = 0;
        if (inv.getName().includes("Your Bags")) {
            // biome-ignore lint/complexity/noForEach: <explanation>
            items.slice(24, 25).forEach(item => {
                const lore = item?.getLore();
                let canscantuning = false;
                for (let line of lore) {
                    line = ChatLib.removeFormatting(line);
                    if (line.toString()?.includes("+") && canscantuning) {
                        tuning += line.substring(line.indexOf("+") + 1, line.indexOf(" "));
                    } else if (line.toString()?.includes("Magical Power:")) {
                        mp = line.substring(line.indexOf(":") + 2)
                    } else if (line.toString()?.includes("Selected Power:")) {
                        power = line.substring(line.indexOf(":") + 2)
                    } else if (line.toString()?.includes("Tuning:")) {
                        canscantuning = true;
                    }
                }
            })
        } else if (inv.getName().includes("Accessory Bag Thaumaturgy")) {
            // biome-ignore lint/complexity/noForEach: <explanation>
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
            // biome-ignore lint/complexity/noForEach: <explanation>
            items.slice(0, inv.getSize() - 45).forEach(item => {
                if (!item) return;
                const lore = item.getLore();
                const removeditemname = ChatLib.removeFormatting(item.getName());
                const removedfirstitemname = removeditemname.split(" ")[0];
                if (!item.getName().startsWith("§d") && !item.getName().startsWith("§6") && !item.getName().startsWith("§d") && !celeblations.includes(removedfirstitemname)) return;
                let lines = 0;
                for (let line of lore) {
                    if (lines > 3) break;
                    lines++;
                    line = ChatLib.removeFormatting(line)
                    if (line.toString()?.includes("Enriched with")) {
                        enrichamount++;
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
        if (enrichamount !== 0) {
            if (max > now) {
                enrichScannedAmount += enrichamount;
            } else if (max === now) {
                enrichScannedAmount += enrichamount;
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
    const Lore = inv.getStackInSlot(4).getLore();
    for (let line of Lore) {
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
            const slayertype = ["Zombie", "Spider", "Wolf", "", "Enderman", "Vampire", "Blaze"];
            let slayerscanned = 0;
            const slayer = slayertype[slayerscanned];
            // biome-ignore lint/complexity/noForEach: <explanation>
            items.slice(19, 26).forEach(item => {
                const lore = item?.getLore();
                if (!lore) {
                    slayerscanned++;
                    return;
                }
                let canscandrop = false;
                let scanline = 0;
                for (let line of lore) {
                    scanline--;
                    line = ChatLib.removeFormatting(line);
                    if (line.toString()?.includes("Selected Drop")) {
                        canscandrop = true;
                        scanline = 2;
                    } else if (line.toString()?.includes("Progress:")) {
                        data.RNG.Slayer[slayer][1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                    } else if (line.toString()?.includes("Stored Slayer XP:")) {
                        data.RNG.Slayer[slayer][0] = "noselected";
                        data.RNG.Slayer[slayer][1] = 0;
                    }
                    if (scanline === 1) {
                        data.RNG.Slayer[slayer][0] = line.substring(0); //こーれ天才です。任せてください。
                        canscandrop = false;
                    }
                }
                slayerscanned++;
            })
            data.save();
        } else if (inv.getName().includes("Catacombs RNG Meter")) {
            let catacombsfloor = 1;
            let catacombstype = "Normal";
            // biome-ignore lint/complexity/noForEach: <explanation>
            items.slice(19, 35).forEach(item => {
                const lore = item?.getLore();
                let canscandrop = false;
                let scanline = 0;
                for (let line of lore) {
                    scanline--;
                    line = ChatLib.removeFormatting(line);
                    if (line.toString()?.includes("M1")) {
                        catacombstype = "Master";
                        catacombsfloor = 1;
                    } else if (line.toString()?.includes("Selected Drop")) {
                        canscandrop = true;
                        scanline = 2;
                    } else if (line.toString()?.includes("Progress:")) {
                        if (catacombstype === "Normal") {
                            const normalfloor = `F${catacombsfloor}`;
                            data.RNG.Catacombs[catacombstype][normalfloor][1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                        } else if (catacombstype === "Master") {
                            const masterfloor = `M${catacombsfloor}`;
                            data.RNG.Catacombs[catacombstype][masterfloor][1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                        }
                    } else if (line.toString()?.includes("Stored Dungeon Score:")) {
                        if (catacombstype === "Normal") {
                            const normalfloor = `F${catacombsfloor}`;
                            data.RNG.Catacombs[catacombstype][normalfloor][0] = "noselected";
                            data.RNG.Catacombs[catacombstype][normalfloor][1] = 0;
                        } else if (catacombstype === "Master") {
                            const masterfloor = `M${catacombsfloor}`;
                            data.RNG.Catacombs[catacombstype][masterfloor][0] = "noselected";
                            data.RNG.Catacombs[catacombstype][masterfloor][1] = 0;
                        }
                    }
                    if (scanline === 1) {
                        if (catacombstype === "Normal") {
                            const normalfloor = `F${catacombsfloor}`;
                            data.RNG.Catacombs[catacombstype][normalfloor][0] = line.substring(0);
                        } else if (catacombstype === "Master") {
                            const masterfloor = `M${catacombsfloor}`;
                            data.RNG.Catacombs[catacombstype][masterfloor][0] = line.substring(0);
                        }
                        canscandrop = false;
                    }
                }
                catacombsfloor++;
            })
            data.save();
        } else if (inv.getName().includes("Crystal Nucleus RNG Meter")) {
            const lore = inv.getStackInSlot(4).getLore();
            let scanline = 0;
            let canscandrop = false;
            for (let line of lore) {
                scanline--;
                line = ChatLib.removeFormatting(line);
                if (line.toString()?.includes("Selected Drop")) {
                    canscandrop = true;
                    scanline = 2;
                } else if (line.toString()?.includes("Progress:")) {
                    data.RNG.Nucleus[1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                } else if (line.toString()?.includes("Stored Nucleus XP:")) {
                    data.RNG.Nucleus[0] = "noselected";
                    data.RNG.Nucleus[1] = 0;
                }
                if (scanline === 1) {
                    data.RNG.Nucleus[0] = line.substring(0);
                    canscandrop = false;
                }
            }
        } else {
            const lore = inv.getStackInSlot(15).getLore();
            let scanline = 0;
            let canscandrop = false;
            for (let line of lore) {
                scanline--;
                line = ChatLib.removeFormatting(line);
                if (line.toString()?.includes("Selected Drop")) {
                    canscandrop = true;
                    scanline = 2;
                } else if (line.toString()?.includes("Progress:")) {
                    data.RNG.Nucleus[1] = line.substring(line.indexOf(":") + 2, line.indexOf("%"))
                } else if (line.toString()?.includes("Stored Nucleus XP:")) {
                    data.RNG.Nucleus[0] = "noselected";
                    data.RNG.Nucleus[1] = 0;
                }
                if (scanline === 1) {
                    data.RNG.Nucleus[0] = line.substring(0);
                    canscandrop = false;
                }
            }
        }
    })
})


function RunCommands(player, message, chatfrom) {
    const strplayername = player.toString().toLowerCase();
    const Getmessage = message.toString().toLowerCase();
    const parts = Getmessage.split(" ");
    const firstmessage = parts[0];
    const lowgetname = Player.getName().toLowerCase();
    const floorchat = firstmessage.match(/^f(\d)$/);
    const masterchat = firstmessage.match(/^m(\d)$/);
    const tierchat = firstmessage.match(/^t(\d)$/);
    const white = data.whitelist.name;
    const black = data.blacklist.name;
    let docommand = null;

    if (Party?.leader === Player.getName() || Party.leader == null) {
        if (floorchat != null && chatfrom === "party") {
            switch (floorchat[1]) {
                case "0":
                    if (PartyFloorSettings.PartyEntrance) {
                        docommand = "joininstance catacombs_Entrance";
                    }
                    break;
                case "1":
                    if (PartyFloorSettings.PartyF1) {
                        docommand = "joininstance catacombs_floor_one";
                    }
                    break;
                case "2":
                    if (PartyFloorSettings.PartyF2) {
                        docommand = "joininstance catacombs_floor_two";
                    }
                    break;
                case "3":
                    if (PartyFloorSettings.PartyF3) {
                        docommand = "joininstance catacombs_floor_three";
                    }
                    break;
                case "4":
                    if (PartyFloorSettings.PartyF4) {
                        docommand = "joininstance catacombs_floor_four";
                    }
                    break;
                case "5":
                    if (PartyFloorSettings.PartyF5) {
                        docommand = "joininstance catacombs_floor_five";
                    }
                    break;
                case "6":
                    if (PartyFloorSettings.PartyF6) {
                        docommand = "joininstance catacombs_floor_six";
                    }
                    break;
                case "7":
                    if (PartyFloorSettings.PartyF7) {
                        docommand = "joininstance catacombs_floor_seven";
                    }
                    break;
            }
        }

        if (masterchat != null && chatfrom === "party") {
            switch (masterchat[1]) {
                case "1":
                    if (PartyFloorSettings.PartyM1) {
                        docommand = "joininstance master_catacombs_floor_one";
                    }
                    break;
                case "2":
                    if (PartyFloorSettings.PartyM2) {
                        docommand = "joininstance master_catacombs_floor_two";
                    }
                    break;
                case "3":
                    if (PartyFloorSettings.PartyM3) {
                        docommand = "joininstance master_catacombs_floor_three";
                    }
                    break;
                case "4":
                    if (PartyFloorSettings.PartyM4) {
                        docommand = "joininstance master_catacombs_floor_four";
                    }
                    break;
                case "5":
                    if (PartyFloorSettings.PartyM5) {
                        docommand = "joininstance master_catacombs_floor_five";
                    }
                    break;
                case "6":
                    if (PartyFloorSettings.PartyM6) {
                        docommand = "joininstance master_catacombs_floor_six";
                    }
                    break;
                case "7":
                    if (PartyFloorSettings.PartyM7) {
                        docommand = "joininstance master_catacombs_floor_seven";
                    }
                    break;
            }
        }

        if (tierchat != null && chatfrom === "party") {
            switch (tierchat[1]) {
                case "1":
                    if (PartyFloorSettings.PartyT1) {
                        docommand = "joininstance kuudra_Basic";
                    }
                    break;
                case "2":
                    if (PartyFloorSettings.PartyT2) {
                        docommand = "joininstance kuudra_Hot";
                    }
                    break;
                case "3":
                    if (PartyFloorSettings.PartyT3) {
                        docommand = "joininstance kuudra_Burning";
                    }
                    break;
                case "4":
                    if (PartyFloorSettings.PartyT4) {
                        docommand = "joininstance kuudra_Fiery";
                    }
                    break;
                case "5":
                    if (PartyFloorSettings.PartyT5) {
                        docommand = "joininstance kuudra_Infernal";
                    }
                    break;
            }
        }
    }

    if (floorchat == null && masterchat == null && tierchat == null) {
        switch (firstmessage) {
            case "help":
                if (Settings.Partyhelp) {
                    ChatLib.command("pc !help, !f(floor), !m(floor), !t(tier), !ptme, !warp, !wt, !inv (ign), !allinv, !promote (ign), !kick (ign), !dt (reason), !fps, !ping, !tps, !coords, !cf, !dice, !rng, !boop (ign), !rps (ign), !meow (ign), !cute, !time, !playtime, !runs (dungeon/kuudra), !iq");
                }
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ leader ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "ptme":
            case "pt":
                if (Settings.Partyptme && chatfrom === "party") {
                    if (Party?.leader === Player.getName() || Party.leader == null) {
                        docommand = `p transfer ${strplayername}`;
                    }
                }
                break;
            case "warp":
            case "pwarp":
                if (Settings.Partywarp && chatfrom === "party") {
                    if (Party?.leader === Player.getName() || Party.leader == null) {
                        docommand = "p warp";
                    }
                }
                break;
            case "warptransfer":
            case "wt":
                if (Settings.Partywarptransfer && chatfrom === "party") {
                    if (Party?.leader === Player.getName() || Party.leader == null) {
                        if ((Settings.whitelisttoggle && white.includes(strplayername)) || (!Settings.whitelisttoggle && !black.includes(strplayername))) {
                            ChatLib.command("p warp");
                            setTimeout(() => {
                                ChatLib.command(`p transfer ${strplayername}`);
                            }, 500);
                        } else if (black.includes(strplayername)) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                        } else if (Settings.whitelisttoggle) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                        }
                    }
                }
                break;
            case "inv":
            case "invite": {
                const invign = parts[1];
                if (chatfrom === "party") {
                    if (Settings.Partyinv) {
                        if (Party?.leader === Player.getName() || Party.leader == null) {
                            if (Settings.Partyinvconfirm) {
                                if ((Settings.whitelisttoggle && white.includes(strplayername)) || (!Settings.whitelisttoggle && !black.includes(strplayername))) {
                                    confirmwaittime = 60;
                                    inviteConfirm(invign);
                                    setTimeout(() => {
                                        new TextComponent(`${prefix} Click to invite §d${invign}.`)
                                            .setClick("run_command", "/bccconfirminvite")
                                            .setHover("show_text", "&aClick to invite!")
                                            .chat();
                                    }, 50);
                                } else if (black.includes(strplayername)) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                                } else if (Settings.whitelisttoggle) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                                }
                            } else {
                                if ((Settings.whitelisttoggle && white.includes(strplayername)) || (!Settings.whitelisttoggle && !black.includes(strplayername))) {
                                    ChatLib.command(`p invite ${invign}`);
                                } else if (black.includes(strplayername)) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                                } else if (Settings.whitelisttoggle) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                                }
                            }
                        }
                    }
                } else if (chatfrom === "dm") {
                    if (Settings.DMinvite) {
                        if (Party?.leader === Player.getName() || Party.leader == null) {
                            if (Settings.Partyinvconfirm) {
                                if ((Settings.whitelisttoggle && white.includes(strplayername)) || (!Settings.whitelisttoggle && !black.includes(strplayername))) {
                                    inviteConfirm(strplayername);
                                    setTimeout(() => {
                                        new TextComponent(`${prefix} Click to invite §d${strplayername}.`)
                                            .setClick("run_command", "/bccconfirminvite")
                                            .setHover("show_text", "&aClick to invite!")
                                            .chat();
                                    }, 50);
                                } else if (black.includes(strplayername)) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                                } else if (Settings.whitelisttoggle) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                                }
                            } else {
                                if ((Settings.whitelisttoggle && white.includes(strplayername)) || (!Settings.whitelisttoggle && !black.includes(strplayername))) {
                                    ChatLib.command(`p invite ${strplayername}`);
                                } else if (black.includes(strplayername)) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                                } else if (Settings.whitelisttoggle) {
                                    ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                                }
                            }
                        }
                    }
                }
                break;
            }
            case "allinv":
            case "allinvite":
                if (Settings.Partyallinv && chatfrom === "party") {
                    if (Party?.leader === Player.getName() || Party.leader == null) {
                        docommand = "p setting allinvite";
                    }
                }
                break;
            case "promote":
                if (Settings.Partypromote && chatfrom === "party") {
                    if (Party?.leader === Player.getName() || Party.leader == null) {
                        const promoteign = parts[1];
                        docommand = `p promote ${promoteign}`;
                    }
                }
                break;
            case "kick":
            case "pkick":
                if (Settings.Partykick && chatfrom === "party") {
                    if (Party?.leader === Player.getName() || Party.leader == null) {
                        const kickign = parts[1];
                        docommand = `p kick ${kickign}`;
                    }
                }
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ Utils ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "dt":
            case "downtime":
                if (Settings.Partydt && chatfrom !== "dm") {
                    afterdowntime = true;
                    afterready = true;
                    if (!downtimeplayer.includes(strplayername)) {
                        downtimeplayer.push(strplayername);
                        if (parts.length !== 1) {
                            let reason = parts[1];
                            if (2 < parts.length) {
                                for (let re = 2; re < parts.length; re++) {
                                    reason += ` ${parts[re]}`;
                                }
                            }
                            downtimereason.push(reason);
                        } else if (parts.length === 1) {
                            downtimereason.push("No reason Given");
                        }
                        ChatLib.chat(`${prefix} §aReminder set for the end of the run`);
                    }
                    if (Settings.PartyReady) {
                        if (!readyplayer.includes(strplayername)) {
                            readyplayer.push(strplayername);
                        }
                    }
                    if (somefeatureis) {
                        ChatLib.command("somefeaturesrequeuestop", true);
                    }
                }
                break;
            case "r":
            case "ready":
                if (Settings.PartyReady) {
                    if (afterready) {
                        pready(strplayername);
                    }
                }
                break;
            case "fps":
                if (Settings.Partyfps && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc FPS: ${Client.getFPS()}`);
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "ping":
                if (Settings.Partyping && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        Client.sendPacket(new C16PacketClientStatus(C16PacketClientStatus.EnumState.REQUEST_STATS));
                        lastPingAt = System.nanoTime();
                        requestedPing = true;
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "tps":
                if (Settings.Partytps && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        requestedTPS = true;
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "power":
            case "enrich":
            case "mp":
            case "magical":
            case "tuning":
                if (Settings.PartyPower && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc MP: ${data.profile.mp} | Power: ${data.profile.power} | Tuning: ${data.profile.tuning} | Enrich: ${data.profile.enrichamount}, ${data.profile.enrich}`)
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "pet":
                if (Settings.PartyPet && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc Pet: ${data.profile.pet}`);
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "coords":
            case "coord":
            case "whereareyou":
            case "xyz":
            case "waypoint":
                if (chatfrom === "party") {
                    if (Settings.PartyCoords) {
                        if (
                            (Settings.whitelisttoggle && white.includes(strplayername)) ||
                            (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                            (Settings.blackonlyleader && black.includes(strplayername)) ||
                            (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                        ) {
                            ChatLib.command(`pc x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                        } else if (black.includes(strplayername)) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                        } else if (Settings.whitelisttoggle) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                        }
                    }
                } else if (chatfrom === "dm") {
                    if (Settings.DMCoords) {
                        if (
                            (Settings.whitelisttoggle && white.includes(strplayername)) ||
                            (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                            (Settings.blackonlyleader && black.includes(strplayername)) ||
                            (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                        ) {
                            ChatLib.command(`r x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                        } else if (black.includes(strplayername)) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                        } else if (Settings.whitelisttoggle) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                        }
                    }
                } else if (chatfrom === "all") {
                    if (Settings.allchattoggle) {
                        if (
                            (Settings.whitelisttoggle && white.includes(strplayername)) ||
                            (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                            (Settings.blackonlyleader && black.includes(strplayername)) ||
                            (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                        ) {
                            ChatLib.command(`ac x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`);
                        } else if (black.includes(strplayername)) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                        } else if (Settings.whitelisttoggle) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                        }
                    }
                }
                break;
            // ■■■■■■■■■■■■■■■■■■■■■■■■■■■ Party ■■■■■■■■■■■■■■■■■■■■■■■■■■■
            case "cf":
            case "coin":
            case "coinflip":
            case "flip":
                if (Settings.Partycf && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc ${strplayername} rolled ${Math.floor(Math.random() * 2) === 0 ? "Heads" : "Tails"}`);
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "dice":
            case "roll":
                if (Settings.Partydice && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc ${strplayername} rolled a ${1 + Math.floor(Math.random() * 6)}.`);
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "rng":
                if (Settings.Partyrng && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const rngign = parts[1];
                        if (rngign != null && rngign !== "sontaku") {
                            ChatLib.command(`pc ${rngign} have ${Math.floor(Math.random() * 100) + 1}% RNG Chance.`);
                        } else if (rngign === "sontaku") {
                            ChatLib.command(`pc ${strplayername} have 100% RNG Chance.`);
                        } else {
                            ChatLib.command(`pc ${strplayername} have ${Math.floor(Math.random() * 100) + 1}% RNG Chance.`);
                        }
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "rrng":
            case "realrng":
                if (Settings.PartyRealrng && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const rngtype = parts[1];
                        switch (rngtype) {
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
                                ChatLib.command(`pc WolfRNG: ${data.RNG.Slayer.Wolf[0]}, ${data.RNG.Slayer.Wolf[1]}%`);
                                break;
                            case "enderman":
                            case "end":
                            case "void":
                            case "voidgloom":
                            case "seraph":
                                ChatLib.command(`pc EndermanRNG: ${data.RNG.Slayer.Enderman[0]}, ${data.RNG.Slayer.Enderman[1]}%`);
                                break;
                            case "vampire":
                            case "vamp":
                            case "rift":
                                ChatLib.command(`pc VampireRNG: ${data.RNG.Slayer.Vampire[0]}, ${data.RNG.Slayer.Vampire[1]}%`);
                                break;
                            case "blaze":
                            case "inferno":
                            case "demonlord":
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
                                ChatLib.command(`pc NucleusRNG: ${data.RNG.Nucleus[0]}, ${data.RNG.Nucleus[1]}%`);
                                break;
                        }
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "boop": {
                const boopign = parts[1];
                if (boopign !== strplayername) {
                    if (Settings.Partyboop && chatfrom !== "dm") {
                        if (
                            (Settings.whitelisttoggle && white.includes(strplayername)) ||
                            (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                            (Settings.blackonlyleader && black.includes(strplayername)) ||
                            (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                        ) {
                            if (boopign == null) {
                                if (strplayername !== lowgetname) {
                                    ChatLib.command(`boop ${strplayername}`);
                                }
                            } else {
                                ChatLib.command(`boop ${boopign}`);
                            }
                        } else if (black.includes(strplayername)) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                        } else if (Settings.whitelisttoggle) {
                            ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                        }
                    }
                }
                break;
            }
            case "rps":
                if (Settings.Partyrps && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const enemyign = parts[1];
                        const whatchoice = Math.floor(Math.random() * 3);
                        if (strplayername === lowgetname) {
                            // me to enemy
                            tryget = 50;
                            rpsis = true;
                            checkenemy();
                        } else if (enemyign === lowgetname) {
                            // enemy from me
                            ichoose = rps[whatchoice];
                            rpsis = true;
                            fromrps = true;
                            ChatLib.command(`pc I choose ${ichoose}`);
                        }
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "meow":
                if (Settings.Partymeow && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const meowign = parts[1];
                        if (meowign !== lowgetname) {
                            ChatLib.command(`tell ${meowign} meow`);
                        }
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                    break;
                }
                break;
            case "cute":
                if (Settings.Partycute && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc ${strplayername} have ${Math.floor(Math.random() * 100) + 1}% Cute.`);
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "nowtime":
            case "timezone":
            case "time":
                if (Settings.Partynowtime && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        ChatLib.command(`pc ${new Date().toLocaleTimeString()}`);
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "playtime":
                if (Settings.Partyplaytime && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const timetype = parts[1];
                        switch (timetype) {
                            case "today":
                            case null:
                            case undefined:
                            case "day":
                                ptoday = (Date.now() - data.jointime) / 1000;
                                ptoday = ptoday.toFixed();
                                playtimetoday = formatSeconds(ptoday);
                                ChatLib.command(`pc Today Playtime: ${playtimetoday}`);
                                break;
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
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "runs":
                if (Settings.Partyruns && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const runtype = parts[1];
                        if (runtype === "kuudra") {
                            ChatLib.command(`pc Today Kuudra Runs: ${kuudraruns}`);
                        } else if (runtype === "dungeon" || runtype === "dungeons" || runtype === "catacombs" || runtype == null || runtype === undefined) {
                            ChatLib.command(`pc Today Dungeon Runs: ${dungoenruns}`);
                        }
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
            case "iq":
            case "iqtest":
                if (Settings.Partyiq && chatfrom !== "dm") {
                    if (
                        (Settings.whitelisttoggle && white.includes(strplayername)) ||
                        (!Settings.whitelisttoggle && !black.includes(strplayername)) ||
                        (Settings.blackonlyleader && black.includes(strplayername)) ||
                        (Settings.whitelisttoggle && Settings.whiteonlyleader && !white.includes(strplayername))
                    ) {
                        const iqign = parts[1];
                        const iqis = Math.floor(Math.random() * 302);
                        if (iqign != null && iqign !== "sontaku") {
                            if (iqis === 0) {
                                ChatLib.command(`pc OMG!! ${iqign} have 5000 IQ!! NO WAY!!`);
                            } else if (iqis >= 1 && iqis <= 85) {
                                ChatLib.command(`pc ${iqign} have ${iqis} IQ! Study more!`);
                            } else if (iqis >= 86 && iqis <= 110) {
                                ChatLib.command(`pc ${iqign} have ${iqis} IQ! Not bad!`);
                            } else if (iqis >= 111 && iqis <= 200) {
                                ChatLib.command(`pc ${iqign} have ${iqis} IQ! You have good brain! `);
                            } else if (iqis >= 201 && iqis <= 300) {
                                ChatLib.command(`pc WOW! ${iqign} have ${iqis} IQ! :Galaxy Brain:`);
                            } else if (iqis === 301) {
                                ChatLib.command(`pc ${iqign} have 334 IQ! nandeya!`);
                            }
                        } else if (iqign === "sontaku") {
                            ChatLib.command(`pc OMG!! ${strplayername} have 5000 IQ!! NO WAY!!`);
                        } else {
                            if (iqis === 0) {
                                ChatLib.command(`pc OMG!! ${strplayername} have 5000 IQ!! NO WAY!!`);
                            } else if (iqis >= 1 && iqis <= 85) {
                                ChatLib.command(`pc ${strplayername} have ${iqis} IQ! Study more!`);
                            } else if (iqis >= 86 && iqis <= 110) {
                                ChatLib.command(`pc ${strplayername} have ${iqis} IQ! Not bad!`);
                            } else if (iqis >= 111 && iqis <= 200) {
                                ChatLib.command(`pc ${strplayername} have ${iqis} IQ! You have good brain! `);
                            } else if (iqis >= 201 && iqis <= 300) {
                                ChatLib.command(`pc WOW! ${strplayername} have ${iqis} IQ! :Galaxy Brain:`);
                            } else if (iqis === 301) {
                                ChatLib.command(`pc ${strplayername} have 334 IQ! nandeya!`);
                            }
                        }
                    } else if (black.includes(strplayername)) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
                    } else if (Settings.whitelisttoggle) {
                        ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
                    }
                }
                break;
        }
    }

    if (docommand != null) {
        if ((Settings.whitelisttoggle && white.includes(strplayername)) || (!Settings.whitelisttoggle && !black.includes(strplayername))) {
            ChatLib.command(docommand);
        } else if (black.includes(strplayername)) {
            ChatLib.chat(`${prefix} §f${strplayername} §cis in blacklist`);
        } else if (Settings.whitelisttoggle) {
            ChatLib.chat(`${prefix} §f${strplayername} §cis not in whitelist`);
        }
    }
}