/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

// idk what needs import. so i will import all things
import "./data/data";

import "./config/floorConfig/floorConfig";
import "./config/general/generalConfig";

import "./features/command";
import "./features/core";
import "./features/autoUpdate";
import "./features/autoRequeue";

import "./features/partyCommands/core/runCommand";
import "./features/partyCommands/core/noPartyRunCommand";
import "./features/partyCommands/downtime";
import "./features/partyCommands/floor";
import "./features/partyCommands/invite";
import "./features/partyCommands/iq";
import "./features/partyCommands/lists";
import "./features/partyCommands/profileStatus";
import "./features/partyCommands/realRNG";
import "./features/partyCommands/RPS";
import "./features/partyCommands/runs";
import "./features/partyCommands/status";

import "./utils/joinFloor";
import "./utils/utils";
import "./utils/letsEncryptCerts";
import "./utils/Class/party";
import "./utils/Class/packetChat";