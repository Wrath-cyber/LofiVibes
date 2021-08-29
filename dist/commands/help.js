"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = void 0;
const utils_1 = require("../utils");
async function default_1(client, msg, query, locale) {
    const channel = msg.channel;
    const perm = utils_1.hasPermissions(client.user?.id, channel, ['EMBED_LINKS', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY']);
    if (perm) {
        const embed = new utils_1.DefaultEmbed('', msg.guild?.me?.roles.color, {
            description: ':radio: 24/7 radio player for discord\n- developed by `Wrath#1919`'
        }).setImage('https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg')
            .setFooter('* illustration by Juan Pablo Machado (http://jpmachado.art)');
        const m = await msg.channel.send(locale('help_continue'), embed);
        m.react('🚩');
        await m.awaitReactions((react, user) => react.emoji.name === '🚩' && user.id === msg.author.id, { max: 1 });
        m.reactions.removeAll().catch(() => { });
        const fields = [];
        for (const command of client.commands) {
            const { aliases } = command;
            if (!aliases)
                continue;
            const name = aliases.reduce((acc, alias) => `${acc}\`${client.config.prefix}${alias}\` `, '');
            fields.push({ name, value: locale(`${aliases[0]}_help`) });
        }
        const embed2 = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color)
            .addFields(fields)
            .setImage('https://cdn.discordapp.com/attachments/665664775606239236/815682840498274324/gif.gif');
        m.edit('', embed2);
        return;
    }
    let str = '';
    for (const command of client.commands) {
        const { aliases } = command;
        if (!aliases)
            continue;
        const name = aliases.reduce((acc, alias) => `${acc}\`${client.config.prefix}${alias}\` `, '');
        str += `${name}\n${locale(`${aliases[0]}_help`)}\n\n`;
    }
    msg.channel.send(str);
}
exports.default = default_1;
exports.aliases = ['help', '도움', '도움말', '명령어'];
