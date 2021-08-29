"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = void 0;
const utils_1 = require("../utils");
async function default_1(client, msg, query, locale) {
    if (!msg.guild)
        return;
    if (!msg.member)
        return;
    if (!msg.member.voice.channel)
        return msg.channel.send(locale('play_no_voice'));
    if (!msg.member.voice.channel.joinable)
        return msg.channel.send(locale('play_not_joinable'));
    if (!msg.member.voice.channel.speakable)
        return msg.channel.send(locale('play_not_speakable'));
    const userAt = msg.member.voice.channel;
    const meAt = msg.guild.me?.voice?.channel;
    if (meAt) {
        if (meAt.id === userAt.id)
            meAt.leave();
        else if (meAt.members.size > 1)
            meAt.leave();
        else if (utils_1.hasPermissions(msg.author.id, meAt, ['MOVE_MEMBERS'])) {
            const m = await msg.channel.send(locale('play_force_question', meAt.name));
            if (utils_1.hasPermissions(client.user?.id, msg.channel, ['ADD_REACTIONS'])) {
                m.react('✅');
                await m.awaitReactions((react, user) => react.emoji.name === '✅' && user.id === msg.author.id, { max: 1 });
            }
            else {
                msg.channel.send(locale('play_force_no_react', client.config.prefix));
                await msg.channel.awaitMessages((message, user) => message.content === locale('play_force_no_react_answer', client.config.prefix) && user.id === msg.author.id, { max: 1 });
            }
            meAt.leave();
        }
        else
            await msg.channel.send(locale('play_force_fail', meAt.name));
    }
    const guildConfig = ((await client.db.select('theme').where('guild', msg.guild.id).from('channels'))[0] || { theme: 1 });
    const [theme] = await client.db.select('*').from('themes').where('id', guildConfig.theme);
    client.lavalink.play(userAt, theme.url);
    const data = await utils_1.getYtInfo(theme.url);
    if (utils_1.hasPermissions(client.user?.id, msg.channel, ['EMBED_LINKS'])) {
        const embed = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color, {
            title: data.title,
            description: locale('play_detail', data.author.name, data.url)
        }).setImage(data.image)
            .setFooter(locale('play_detail_footer', client.config.prefix));
        msg.channel.send(embed);
    }
    else
        msg.channel.send(locale('play_success'));
}
exports.default = default_1;
exports.aliases = ['play', 'join', '재생', '시작'];
