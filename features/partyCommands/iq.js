import { hasParty } from "../../utils/utils";

export function sendIQMessage(name, iq, chatFrom) {
    if (iq === 0) {
        hasParty(chatFrom, `OMG!! ${name} have 5000 IQ!! NO WAY!!`);
    } else if (iq >= 1 && iq <= 40) {
        hasParty(chatFrom, `${name} have ${iq} IQ! 1+1=⑨!`);
    } else if (iq >= 41 && iq <= 85) {
        hasParty(chatFrom, `${name} have ${iq} IQ! Study more!`);
    } else if (iq >= 86 && iq <= 110) {
        hasParty(chatFrom, `${name} have ${iq} IQ! Not bad!`);
    } else if (iq >= 111 && iq <= 200) {
        hasParty(chatFrom, `${name} have ${iq} IQ! You have good brain!`);
    } else if (iq >= 201 && iq <= 300) {
        hasParty(chatFrom, `WOW! ${name} have ${iq} IQ! :Galaxy Brain:`);
    } else if (iq === 301) {
        hasParty(chatFrom, `${name} have 334 IQ! nandeya!`);
    }
}