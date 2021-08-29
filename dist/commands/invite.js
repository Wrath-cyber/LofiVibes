"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = void 0;
const utils_1 = require("../utils");
function default_1(client, msg, query, locale) {
    const channel = msg.channel;
    const perm = utils_1.hasPermissions(client.user?.id, channel, ['EMBED_LINKS']);
    if (perm) {
        const embed = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color, {
            title: locale('invite_title'),
            url: `https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=0&scope=bot`,
            description: locale('invite_description', 'https://discord.gg/XG5RE9NzdP')
        });
        msg.channel.send(embed);
        return;
    }
    msg.channel.send(`${locale('invite_title')}\nhttps://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=0&scope=bot\n\n${locale('invite_description', 'https://discord.gg/WJRtvankkB')}`);
}
exports.default = default_1;
exports.aliases = ['invite', 'support', '초대', '초대링크'];
