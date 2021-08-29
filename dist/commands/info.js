"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../utils");
const os_1 = __importDefault(require("os"));
async function default_1(client, msg, query) {
    const channel = msg.channel;
    const perm = utils_1.hasPermissions(client.user?.id, channel, ['EMBED_LINKS']);
    const inline = true;
    const freemem = Math.round(os_1.default.freemem() / 1024 / 1024);
    const totalmem = Math.round(os_1.default.totalmem() / 1024 / 1024);
    const usedmem = totalmem - freemem;
    const activeChannels = client.channels.cache.filter((c) => c instanceof discord_js_1.VoiceChannel && c.members.has(client.user?.id));
    const registedChannes = await client.db.select('*').from('channels');
    const embed = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color, {
        fields: [
            { name: 'Bot Uptime', value: (client.uptime / 1000) + 'sec', inline },
            { name: 'System Uptime', value: os_1.default.uptime + 'sec', inline },
            { name: 'Mem (Used/Total)', value: `${usedmem}MB/${totalmem}MB (${Math.round(usedmem / totalmem * 1000) / 10}%)`, inline },
            { name: 'Active Users', value: activeChannels.reduce((prev, curr) => prev + curr.members.filter((m) => !m.user.bot).size, 0) + ' users', inline },
            { name: 'Active Channels', value: activeChannels.size + ' channels', inline },
            { name: 'Total Guilds', value: client.guilds.cache.size + ' guilds', inline },
            { name: 'Total Channels', value: client.channels.cache.filter((c) => c instanceof discord_js_1.VoiceChannel).size + ' channels', inline },
            { name: 'Registed Channels', value: registedChannes.length + ' channels', inline }
        ]
    });
    const str = `**Bot Uptime**\n\`${(client.uptime / 1000)}sec\`\n\n` +
        `**System Uptime**\n\`${os_1.default.uptime}sec\`\n\n` +
        `**Mem (Used/Total)**\n\`${usedmem}MB/${totalmem}MB (${Math.round(usedmem / totalmem * 1000) / 10}%)\`\n\n` +
        `**Active Users**\n\`${activeChannels.reduce((prev, curr) => prev + curr.members.filter((m) => !m.user.bot).size, 0)} users\`\n\n` +
        `**Active Channels**\n\`${activeChannels.size} channels\`\n\n` +
        `**Total Guilds**\n\`${client.guilds.cache.size} guilds\`\n\n` +
        `**Total Channels**\n\`${client.channels.cache.filter((c) => c instanceof discord_js_1.VoiceChannel).size} channels\`\n\n` +
        `**Registed Channels**\n\`${registedChannes.length} channels\`\n\n`;
    msg.channel.send(perm ? embed : str);
}
exports.default = default_1;
exports.aliases = ['info', '상태', '정보'];
