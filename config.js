import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from 'Vigilance';
import PartyFloorSettings from "./floorconfig/floorconfig";

const version = "1.5.0"
@Vigilant("BetterChatCommand", "§f§lBetterChatCommand", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Party", "DM"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `§f§l<BetterChatCommand> Ver${version}`);
        this.setCategoryDescription("Party", `§f§l<BetterChatCommand> Ver${version}`);
        this.setCategoryDescription("DM", `§f§l<BetterChatCommand> Ver${version}`);
    }

    @SwitchProperty({
        name: "Toggle",
        description: "Toggle on/off",
        category: "General",
        subcategory: "General"
    })
    AllCommandToggle = true;

    @SwitchProperty({
        name: "Party invite confirmation",
        description: "Confirm when sending a Party invite",
        category: "General",
        subcategory: "General"
    })
    Partyinvconfirm = false;

    @SwitchProperty({
        name: "allchat command",
        description: "If this is on, commands other than leader commands will work in Allchat.",
        category: "General",
        subcategory: "General"
    })
    allchattoggle = false;

    @SwitchProperty({
        name: "whitelist toggle",
        description: "whitelist toggle on/off",
        category: "General",
        subcategory: "General"
    })
    whitelisttoggle = false;

    @SwitchProperty({
        name: "whitelist only block leader command",
        description: "If this is off, all commands will be unavailable to players not on the whitelist.(except !dt, !warp)",
        category: "General",
        subcategory: "General"
    })
    whiteonlyleader = false;

    @SwitchProperty({
        name: "blacklist only block leader command",
        description: "If this is Off, all commands will be unavailable to players on the BlackList.(except !dt, !warp)",
        category: "General",
        subcategory: "General"
    })
    blackonlyleader = false;

    @SwitchProperty({
        name: "debug",
        description: "I made this for my own use when debugging. Turning it on doesn't add any new features.",
        category: "General",
        subcategory: "General"
    })
    debugmode = false;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Party ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    @CheckboxProperty({
        name: "help",
        description: "Send help",
        category: "Party",
        subcategory: "General"
    })
    Partyhelp = true;

    @ButtonProperty({
        name: "Floor(tier)",
        description: "Enter the floor or tier with !(floor)",
        category: "Party",
        subcategory: "Leader",
        placeholder: "!floor"
    })
    PartyFloor() {
        PartyFloorSettings.openGUI()
    }

    @CheckboxProperty({
        name: "ptme",
        description: "Party Transfer (!ptme)",
        category: "Party",
        subcategory: "Leader"
    })
    Partyptme = true;

    @CheckboxProperty({
        name: "warp",
        description: "Party Warp (!warp)",
        category: "Party",
        subcategory: "Leader"
    })
    Partywarp = true;

    @CheckboxProperty({
        name: "warptransfer",
        description: "Warp and Transfer (!wt)",
        category: "Party",
        subcategory: "Leader"
    })
    Partywarptransfer = true;

    @CheckboxProperty({
        name: "inv",
        description: "Party Invite (!inv ign)",
        category: "Party",
        subcategory: "Leader"
    })
    Partyinv = true;

    @CheckboxProperty({
        name: "allinv",
        description: "Party AllInvite (!allinv)",
        category: "Party",
        subcategory: "Leader"
    })
    Partyallinv = true;

    @CheckboxProperty({
        name: "promote",
        description: "Party promote (!promote ign)",
        category: "Party",
        subcategory: "Leader"
    })
    Partypromote = true;

    @CheckboxProperty({
        name: "kick",
        description: "Party kick (!kick ign)",
        category: "Party",
        subcategory: "Leader"
    })
    Partykick = true;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Member ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    @CheckboxProperty({
        name: "dt(downtime)",
        description: "Notifying downtime (!dt or !dt reason)",
        category: "Party",
        subcategory: "Member"
    })
    Partydt = true;

    @CheckboxProperty({
        name: "ready",
        description: "If the player who did !dt does !r, they will enter the floor they were on before.",
        category: "Party",
        subcategory: "Member"
    })
    PartyReady = true;

    @CheckboxProperty({
        name: "fps",
        description: "Send fps (!fps)",
        category: "Party",
        subcategory: "Member"
    })
    Partyfps = true;

    @CheckboxProperty({
        name: "ping",
        description: "Send Ping (!ping)",
        category: "Party",
        subcategory: "Member"
    })
    Partyping = true;

    @CheckboxProperty({
        name: "tps",
        description: "Send TPS (!tps)",
        category: "Party",
        subcategory: "Member"
    })
    Partytps = true;

    @CheckboxProperty({
        name: "power",
        description: "Send Power, Tuning, Enrich, Pet",
        category: "Party",
        subcategory: "Member"
    })
    PartyPower = true;

    @CheckboxProperty({
        name: "pet",
        description: "Send Pet",
        category: "Party",
        subcategory: "Member"
    })
    PartyPet = true;

    @CheckboxProperty({
        name: "coords",
        description: "Send Coords (!coords)",
        category: "Party",
        subcategory: "Other"
    })
    PartyCoords = true;

    @CheckboxProperty({
        name: "coinflip",
        description: "Send coinflip (!cf)",
        category: "Party",
        subcategory: "Other"
    })
    Partycf = true;

    @CheckboxProperty({
        name: "dice",
        description: "Send dice (!dice)",
        category: "Party",
        subcategory: "Other"
    })
    Partydice = true;

    @CheckboxProperty({
        name: "rng",
        description: "Send rng (!rng  this is §cnot §rreal chance. it's joke)",
        category: "Party",
        subcategory: "Other"
    })
    Partyrng = true;

    @CheckboxProperty({
        name: "realrng",
        description: "Send Realrng (!rrng (type) this is §areal §rchance.)",
        category: "Party",
        subcategory: "Other"
    })
    PartyRealrng = true;

    @CheckboxProperty({
        name: "boop",
        description: "Send boop (!boop ign) §cThis command will send dm.",
        category: "Party",
        subcategory: "Other"
    })
    Partyboop = true;

    @CheckboxProperty({
        name: "Rock Paper Scissors",
        description: "Do Rock Paper Scissors (!rps ign)",
        category: "Party",
        subcategory: "Other"
    })
    Partyrps = true;

    @CheckboxProperty({
        name: "meow",
        description: "Send meow (!meow ign) §cThis command will send dm.",
        category: "Party",
        subcategory: "Other"
    })
    Partymeow = true;

    @CheckboxProperty({
        name: "cute",
        description: "Send cute (!cute)",
        category: "Party",
        subcategory: "Other"
    })
    Partycute = true;

    @CheckboxProperty({
        name: "nowtime",
        description: "send current time and time zone (!time)",
        category: "Party",
        subcategory: "Other"
    })
    Partynowtime = true;

    @CheckboxProperty({
        name: "playtime",
        description: "Send how many hours you played today. If you don't play the game for an hour, it will be reset. (!playtime)",
        category: "Party",
        subcategory: "Other"
    })
    Partyplaytime = true;

    @CheckboxProperty({
        name: "runs",
        description: "Send how many times you've played Dungeon/Kuudra today. (!runs dungeon/kuudra)",
        category: "Party",
        subcategory: "Other"
    })
    Partyruns = true;

    @CheckboxProperty({
        name: "iq",
        description: "Send IQ (!iq)",
        category: "Party",
        subcategory: "Other"
    })
    Partyiq = true;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ DM ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    @CheckboxProperty({
        name: "DM invite",
        description: "Party Invite from DM (!inv)",
        category: "DM",
        subcategory: "Party"
    })
    DMinvite = true;

    @CheckboxProperty({
        name: "DM Coords",
        description: "Send Coord from DM (!coords)",
        category: "DM",
        subcategory: "Party"
    })
    DMCoords = true;

}

export default new Settings();