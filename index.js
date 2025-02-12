/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

// idk what needs import. so i will import all things
import "./data/data.js";

import "./config/floorConfig/floorConfig.js";
import "./config/general/generalConfig.js";

import "./features/command.js";
import "./features/core.js";
import "./features/autoUpdate.js";
import "./features/autoRequeue.js";
import "./features/afterInvite.js";

import "./features/partyCommands/core/runCommand.js";
import "./features/partyCommands/core/noPartyRunCommand.js";
import "./features/partyCommands/downtime.js";
import "./features/partyCommands/floor.js";
import "./features/partyCommands/invite.js";
import "./features/partyCommands/iq.js";
import "./features/partyCommands/lists.js";
import "./features/partyCommands/profileStatus.js";
import "./features/partyCommands/realRNG.js";
import "./features/partyCommands/RPS.js";
import "./features/partyCommands/runs.js";
import "./features/partyCommands/status.js";

import "./utils/joinFloor.js";
import "./utils/utils.js";
import "./utils/letsEncryptCerts.js";
import "./utils/Class/party.js";
import "./utils/Class/packetChat.js";