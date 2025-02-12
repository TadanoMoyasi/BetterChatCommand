import PogObject from "../../PogData";

export const data = new PogObject(
    "BetterChatCommand",
    {
        firstTime: false,
        lastVersion: "",
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
            enrichAmount: 0,
            enrich: "nodata",
            mp: "nodata",
            pet: "nodata",
        },
        playtimes: {
            joinTime: 1,
            leftTime: 1,
            mayor: {
                lastMayor: "",
                playtime: 1,
            },
            All: "nodata",
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
                Zombie: {
                    item: "nodata",
                    xp: 0
                },
                Spider: {
                    item: "nodata",
                    xp: 0
                },
                Wolf: {
                    item: "nodata",
                    xp: 0
                },
                Enderman: {
                    item: "nodata",
                    xp: 0
                },
                Vampire: {
                    item: "nodata",
                    xp: 0
                },
                Blaze: {
                    item: "nodata",
                    xp: 0
                },
            },
            Catacombs: {
                Normal: {
                    F1: {
                        item: "nodata",
                        xp: 0
                    },
                    F2: {
                        item: "nodata",
                        xp: 0
                    },
                    F3: {
                        item: "nodata",
                        xp: 0
                    },
                    F4: {
                        item: "nodata",
                        xp: 0
                    },
                    F5: {
                        item: "nodata",
                        xp: 0
                    },
                    F6: {
                        item: "nodata",
                        xp: 0
                    },
                    F7: {
                        item: "nodata",
                        xp: 0
                    },
                },
                Master: {
                    M1: {
                        item: "nodata",
                        xp: 0
                    },
                    M2: {
                        item: "nodata",
                        xp: 0
                    },
                    M3: {
                        item: "nodata",
                        xp: 0
                    },
                    M4: {
                        item: "nodata",
                        xp: 0
                    },
                    M5: {
                        item: "nodata",
                        xp: 0
                    },
                    M6: {
                        item: "nodata",
                        xp: 0
                    },
                    M7: {
                        item: "nodata",
                        xp: 0
                    },
                }
            },
            Nucleus: {
                item: "nodata",
                xp: 0
            },
            Experiment: {
                item: "nodata",
                xp: 0
            },
        },
        todayData: {
            dungeon: {
                All: 0,
                Entrance: 0,
                F1: 0,
                F2: 0,
                F3: 0,
                F4: 0,
                F5: 0,
                F6: 0,
                F7: 0,
                M1: 0,
                M2: 0,
                M3: 0,
                M4: 0,
                M5: 0,
                M6: 0,
                M7: 0
            },
            Kuudra: {
                All: 0,
                Basic: 0,
                Hot: 0,
                Burning: 0,
                Fiery: 0,
                Infernal: 0
            }
        }
    },
    "data/data.json"
);