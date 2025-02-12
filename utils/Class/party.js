const partySpamMessages = [
    /.+ has disbanded the party!/,
    /(.+) invited (.+) to the party! They have 60 seconds to accept./,
    /-----------------------------------------------------/,
    /Party [Members|Leader:|Members:]+.+/
]

let hidingPartySpam = false;

const hidePartySpam = (ms) => {
    hidingPartySpam = true;
    setTimeout(() => {
        hidingPartySpam = false;
    }, ms);
}

register("chat", (event) => {
    if (!hidingPartySpam) return;
    const unformatted = ChatLib.getChatMessage(event, false);
    if (partySpamMessages.some(value => unformatted.match(value))) return cancel(event);
})

const stripRank = (rankedPlayer) => rankedPlayer.replace(/\[[\w+\+-]+] /, "").trim();

let bloomCoreExists = null;

export default new class Party {
    constructor() {
        this.isParty = false;
        this.members = {};
        this.leader = null;
        this.memberJoined = [
            /^(.+) &r&ejoined the party.&r$/,
            /^(.+) &r&einvited &r.+ &r&eto the party! They have &r&c60 &r&eseconds to accept.&r$/,
            /^&eYou have joined &r(.+)'[s]? &r&eparty!&r$/,
            /^&dParty Finder &r&f> &r(.+) &r&ejoined the dungeon group! \(&r&b.+&r&e\)&r$/
        ];
        this.memberLeft = [
            /^(.+) &r&ehas been removed from the party.&r$/,
            /^(.+) &r&ehas left the party.&r$/,
            /^(.+) was removed from your party because they disconnected.$/,
            /^Kicked (.+) because they were offline.$/
        ];
        this.partyDisbanded = [
            /^.+ &r&ehas disbanded the party!&r$/,
            /^&cThe party was disbanded because all invites expired and the party was empty&r$/,
            /^&eYou left the party.&r$/,
            /^&6Party Members \(\d+\)&r$/,
            /^You are not currently in a party\.$/,
            /^You have been kicked from the party by .+$/,
            /^The party was disbanded because the party leader disconnected\.$/
        ];
        this.leaderMessages = [
            /^&eParty Leader: &r(.+) &r&a●&r$/,
            /^&eYou have joined &r(.+)'s* &r&eparty!&r$/,
            /^&eThe party was transferred to &r(.+) &r&eby &r.+&r$/,
            /^.+ has promoted &r(.+) &r&eto Party Leader&r$/
        ];

        register("chat", (event) => {
            const formatted = ChatLib.getChatMessage(event, true)
            const unformatted = formatted.removeFormatting();
            this.memberJoined.forEach(regex => {
                const match = formatted.match(regex);
                if (match) this.addMember(match[1]);
            });
            this.memberLeft.forEach(regex => {
                const match = formatted.match(regex);
                if (match) this.removeMember(match[1]);
            });
            this.leaderMessages.forEach(regex => {
                const match = formatted.match(regex);
                if (match) this.makeLeader(match[1]);
            });
            this.partyDisbanded.forEach(regex => {
                const match = formatted.match(regex);
                if (match) this.disbandParty();
            });

            // Joined a party
            if (/&eYou'll be partying with: .+/.test(formatted)) {
                const players = formatted.match(/&eYou'll be partying with: (.+)/)[1].split("&e, ");
                for (const p of players) this.addMember(p);
                this.isParty = true;
            };
            // Party List shown in chat
            if (/^&eParty .+: (.+)/.test(formatted)) {
                const match = formatted.match(/^&eParty .+: &r(.+)/);
                const players = match[1].split(/&r&a ● &r|&r&c ● &r| &r&a●&r| &r&c●&r/);
                for (i in players) {
                    if (players[i].replace(/ /g, "") !== "") this.addMember(players[i]);
                };
            };
            // You make a party in party finder
            if (unformatted === "Party Finder > Your party has been queued in the dungeon finder!") {
                setTimeout(() => {
                    this.isParty = true;
                    if (bloomCoreExists == null) bloomCoreExists = FileLib.exists("bloomCore", "Party.js");
                    if (bloomCoreExists) return;
                    hidePartySpam(1000);
                    ChatLib.command("pl");
                    this.isParty = true;
                }, 250);
            };

            // Creating a party
            if (Object.keys(this.members).length === 1) {
                const match = formatted.match(/(.+) &r&einvited &r.+ &r&eto the party! They have &r&c60 &r&eseconds to accept.&r/);
                if (match) this.makeLeader(match[1]);
                this.isParty = true;
            };

            // Joining a party
            if (/&eYou have joined &r.+'s &r&eparty!&r/.test(formatted)) {
                setTimeout(() => {
                    this.isParty = true;
                    if (bloomCoreExists == null) bloomCoreExists = FileLib.exists("bloomCore", "Party.js");
                    if (bloomCoreExists) return;
                    hidePartySpam(750);
                    ChatLib.command("pl");
                }, 300);
            };

            // Party leader left
            const match = formatted.match(/&eThe party was transferred to &r(.+) &r&ebecause &r(.+) &r&eleft&r/);
            if (match) {
                if (stripRank(match[2].removeFormatting()) === Player.getName()) this.disbandParty();
                else {
                    this.makeLeader(match[1]);
                    this.removeMember(match[2]);
                };
            };
        })
    }

    addMember(player) {
        // Can use member's formatted name with rank
        this.members[stripRank(player.removeFormatting())] = player;
    }

    removeMember(player) {
        delete this.members[stripRank(player.removeFormatting())];
    }

    makeLeader(player) {
        this.leader = stripRank(player.removeFormatting());
    }

    disbandParty() {
        this.members = {};
        this.leader = null;
        this.isParty = false;
    }
}
//from bloomCore