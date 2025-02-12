import Settings from "../../config/general/generalConfig";

// Coming Soon......

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
    if (enemyChoose) {
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
    if (!Settings.AllCommandToggle || !Settings.PartyRPS) return;
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
    if (enemyChoose) return;
    enemyChoose = enemyHand;
    if (!playerChoose && !enemyChoose) return;
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