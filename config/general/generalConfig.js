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
import PartyFloorSettings from "../floorConfig/floorConfig";

const version = "2.0.0";
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
    allCommandToggle = true;

    @SwitchProperty({
        name: "Party invite confirmation",
        description: "Confirm when sending a Party invite",
        category: "General",
        subcategory: "General"
    })
    PartyInviteConfirm = false;

    @SwitchProperty({
        name: "allChat command",
        description: "If this is on, commands other than leader commands will work in AllChat.",
        category: "General",
        subcategory: "General"
    })
    allChatToggle = false;

    @SwitchProperty({
        name: "no Party Run Command",
        description: "Allows you to use PartyCommand even when there is no party. \n§cIf this is on, messages starting with ! cannot be sent when there is no Party.",
        category: "General",
        subcategory: "General"
    })
    noPartyCommand = false;

    @SwitchProperty({
        name: "auto Requeue",
        description: "auto Requeue in Dungeon, Kuudra",
        category: "General",
        subcategory: "Requeue"
    })
    autoRequeueToggle = false;

    @SliderProperty({
        name: "Requeue Time",
        description: "Waiting time after clearing dungeon, kuudra",
        category: "General",
        subcategory: "Requeue",
        min: 0,
        max: 60
    })
    autoRequeueTime = 10;

    @SelectorProperty({
        name: "Requeue Type",
        description: "instance requeue or joinInstance",
        category: "General",
        subcategory: "Requeue",
        options: ["instance", "joinInstance"]
    })
    autoRequeueType = 0;

    @SwitchProperty({
        name: "whitelist toggle",
        description: "whitelist toggle on/off",
        category: "General",
        subcategory: "List"
    })
    whitelistToggle = false;

    @SwitchProperty({
        name: "whitelist only block leader command",
        description: "If this is off, all commands will be unavailable to players not on the whitelist.(except !dt, !warp)",
        category: "General",
        subcategory: "List"
    })
    whitelistOnlyBlockLeader = false;

    @SwitchProperty({
        name: "blacklist only block leader command",
        description: "If this is Off, all commands will be unavailable to players on the BlackList.(except !dt, !warp)",
        category: "General",
        subcategory: "List"
    })
    blacklistOnlyBlockLeader = false;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Party ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    @CheckboxProperty({
        name: "help",
        description: "Send help",
        category: "Party",
        subcategory: "General"
    })
    PartyHelp = true;

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
    PartyPtme = true;

    @CheckboxProperty({
        name: "warp",
        description: "Party Warp (!warp)",
        category: "Party",
        subcategory: "Leader"
    })
    PartyWarp = true;

    @CheckboxProperty({
        name: "warpTransfer",
        description: "Warp and Transfer (!wt)",
        category: "Party",
        subcategory: "Leader"
    })
    PartyWarpTransfer = true;

    @CheckboxProperty({
        name: "inv",
        description: "Party Invite (!inv ign)",
        category: "Party",
        subcategory: "Leader"
    })
    PartyInvite = true;

    @CheckboxProperty({
        name: "allInv",
        description: "Party AllInvite (!allinv)",
        category: "Party",
        subcategory: "Leader"
    })
    PartyAllInv = true;

    @CheckboxProperty({
        name: "promote",
        description: "Party promote (!promote ign)",
        category: "Party",
        subcategory: "Leader"
    })
    PartyPromote = true;

    @CheckboxProperty({
        name: "kick",
        description: "Party kick (!kick ign)",
        category: "Party",
        subcategory: "Leader"
    })
    PartyKick = true;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ Member ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    @CheckboxProperty({
        name: "dt(downtime)",
        description: "Notifying downtime (!dt or !dt reason)",
        category: "Party",
        subcategory: "Member"
    })
    PartyDT = true;

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
    PartyFps = true;

    @CheckboxProperty({
        name: "ping",
        description: "Send Ping (!ping)",
        category: "Party",
        subcategory: "Member"
    })
    PartyPing = true;

    @CheckboxProperty({
        name: "tps",
        description: "Send TPS (!tps)",
        category: "Party",
        subcategory: "Member"
    })
    PartyTps = true;

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
        description: "Send coinFlip (!cf)",
        category: "Party",
        subcategory: "Other"
    })
    PartyCoinFlip = true;

    @CheckboxProperty({
        name: "dice",
        description: "Send dice (!dice)",
        category: "Party",
        subcategory: "Other"
    })
    PartyDice = true;

    @CheckboxProperty({
        name: "rng",
        description: "Send rng (!rng  this is §cnot §rreal chance. it's joke)",
        category: "Party",
        subcategory: "Other"
    })
    PartyRNG = true;

    @CheckboxProperty({
        name: "realrng",
        description: "Send Realrng (!rrng (type) this is §areal §rchance.)",
        category: "Party",
        subcategory: "Other"
    })
    PartyRealRNG = true;

    @CheckboxProperty({
        name: "boop",
        description: "Send boop (!boop ign) §cThis command will send dm.",
        category: "Party",
        subcategory: "Other"
    })
    PartyBoop = true;

    @CheckboxProperty({
        name: "Rock Paper Scissors",
        description: "Do Rock Paper Scissors (!rps ign)",
        category: "Party",
        subcategory: "Other"
    })
    PartyRPS = true;

    @CheckboxProperty({
        name: "meow",
        description: "Send meow (!meow ign) §cThis command will send dm.",
        category: "Party",
        subcategory: "Other"
    })
    PartyMeow = true;

    @CheckboxProperty({
        name: "cute",
        description: "Send cute (!cute)",
        category: "Party",
        subcategory: "Other"
    })
    PartyCute = true;

    @CheckboxProperty({
        name: "timeZone",
        description: "send current time and time zone (!time)",
        category: "Party",
        subcategory: "Other"
    })
    PartyTimeZone = true;

    @CheckboxProperty({
        name: "playtime",
        description: "Send how many hours you played today. If you don't play the game for an hour, it will be reset. (!playtime)",
        category: "Party",
        subcategory: "Other"
    })
    PartyPlaytime = true;

    @CheckboxProperty({
        name: "runs",
        description: "Send how many times you've played Dungeon/Kuudra today. (!runs dungeon/kuudra)",
        category: "Party",
        subcategory: "Other"
    })
    PartyRuns = true;

    @CheckboxProperty({
        name: "iq",
        description: "Send IQ (!iq)",
        category: "Party",
        subcategory: "Other"
    })
    PartyIQ = true;

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