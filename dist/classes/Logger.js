"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class Logger extends discord_js_1.WebhookClient {
    constructor({ id, token }) {
        super(id, token);
        this.ERROR_COLOR = 0xff0000;
        this.WARNING_COLOR = 0xffff00;
    }
    logError(type = 'Unknown', msg = '<blank>') {
        const embed = new discord_js_1.MessageEmbed({
            color: this.ERROR_COLOR,
            title: type,
            description: msg
        }).setTimestamp();
        this.send(embed);
    }
    logWarn(msg = '<blank>') {
        const embed = new discord_js_1.MessageEmbed({
            color: this.WARNING_COLOR,
            title: 'Warning',
            description: msg
        }).setTimestamp();
        this.send(embed);
    }
    logInfo(isLeave = false, gid) {
        const embed = new discord_js_1.MessageEmbed({
            color: isLeave ? 0x0000ff : 0x00ffff,
            title: isLeave ? 'Leaving' : 'Playing',
            description: `${gid.name} (${gid.id})`
        }).setTimestamp();
        this.send(embed);
    }
}
exports.default = Logger;
