"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = void 0;
const Query_1 = __importDefault(require("../classes/Query"));
const utils_1 = require("../utils");
const SECOND = 1000;
const NUMBER_EMOJIS = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];
const NUMBER_UNICODES = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
async function default_1(client, msg, query, locale) {
    if (!msg.guild)
        return;
    const perm = (0, utils_1.hasPermissions)(client.user?.id, msg.channel, ['EMBED_LINKS', 'ADD_REACTIONS']);
    const themes = await client.db.select('*').from('themes');
    if (perm) {
        const embed = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color, {
            title: locale('theme_found', themes.length),
            description: locale('theme_submit', 'https://discord.gg/XG5RE9NzdP')
        });
        const m = await msg.channel.send(locale('theme_loading'));
        for (const index in themes) {
            if (!themes[index])
                return;
            embed.addField(`${NUMBER_EMOJIS[index]} ${themes[index].name}`, themes[index].url);
            m.react(NUMBER_UNICODES[index]);
        }
        m.edit('', embed);
        const reactions = await m.awaitReactions((react, user) => NUMBER_UNICODES.includes(react.emoji.name) && user.id === msg.author.id, { max: 1, time: 60 * SECOND });
        const reaction = reactions.first();
        m.reactions.removeAll().catch(() => { });
        if (!reaction) {
            m.edit(locale('theme_timeout'), { embed: null });
            return;
        }
        const chosen = NUMBER_UNICODES.indexOf(reaction.emoji.name);
        if (!themes[chosen]) {
            m.edit(locale('theme_invalid', NUMBER_EMOJIS[chosen]), { embed: null });
            return;
        }
        m.edit(locale('theme_success', themes[chosen].name), { embed: null });
        await client.db.update({ theme: themes[chosen].id }).where({ guild: msg.guild.id }).from('channels');
    }
    else {
        let str = locale('theme_found', themes.length);
        const m = await msg.channel.send(locale('track_loading'));
        for (const index in themes) {
            if (!themes[index])
                return;
            str += `\n${NUMBER_EMOJIS[index]} ${themes[index].name}\n${themes[index].url}\n`;
        }
        str += '\n' + locale('track_on_embed', client.config.prefix);
        m.edit(str);
        const messages = await msg.channel.awaitMessages((message) => message.author.id === msg.author.id && message.content.startsWith(`${client.config.prefix}set `), { max: 1, time: 60 * SECOND });
        const message = messages.first();
        if (!message) {
            m.edit(locale('track_timeout'), { embed: null });
            return;
        }
        const messageQuery = new Query_1.default(client.config.prefix, message.content);
        const chosen = parseInt(messageQuery.args[0] || '1') - 1;
        if (!themes[chosen]) {
            m.edit(locale('theme_invalid', NUMBER_EMOJIS[chosen]), { embed: null });
            return;
        }
        m.edit(locale('theme_success', themes[chosen].name), { embed: null });
        await client.db.update({ theme: themes[chosen].id }).where({ guild: msg.guild.id }).from('channels');
    }
    const userAt = msg.member?.voice.channel;
    const meAt = msg.guild.me?.voice?.channel;
    if (meAt) {
        if (meAt === userAt) {
            meAt.leave();
            const guildConfig = ((await client.db.select('theme').where('guild', msg.guild.id).from('channels'))[0] || { theme: 1 });
            const [theme] = await client.db.select('*').from('themes').where('id', guildConfig.theme);
            client.lavalink.play(meAt, theme.url);
            const data = await (0, utils_1.getYtInfo)(theme.url);
            if ((0, utils_1.hasPermissions)(client.user?.id, msg.channel, ['EMBED_LINKS'])) {
                const embed = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color, {
                    title: data.title,
                    description: locale('track_play_detail', data.author.name, data.url)
                }).setImage(data.image)
                    .setFooter(locale('track_play_detail_footer', client.config.prefix));
                msg.channel.send(embed);
            }
            else
                msg.channel.send(locale('track_play_success'));
        }
        else {
            if ((0, utils_1.hasPermissions)(msg.author.id, meAt, ['MOVE_MEMBERS'])) {
                const m = await msg.channel.send(locale('track_play_force_question', meAt.name));
                if ((0, utils_1.hasPermissions)(client.user?.id, msg.channel, ['ADD_REACTIONS'])) {
                    m.react('✅');
                    await m.awaitReactions((react, user) => react.emoji.name === '✅' && user.id === msg.author.id, { max: 1 });
                }
                else {
                    msg.channel.send(locale('theme_play_force_no_react', client.config.prefix));
                    await msg.channel.awaitMessages((message, user) => message.content === locale('track_play_force_no_react_answer', client.config.prefix) && user.id === msg.author.id, { max: 1 });
                }
                meAt.leave();
                const guildConfig = ((await client.db.select('theme').where('guild', msg.guild.id).from('channels'))[0] || { theme: 1 });
                const [theme] = await client.db.select('*').from('themes').where('id', guildConfig.theme);
                client.lavalink.play(meAt, theme.url);
                const data = await (0, utils_1.getYtInfo)(theme.url);
                if ((0, utils_1.hasPermissions)(client.user?.id, msg.channel, ['EMBED_LINKS'])) {
                    const embed = new utils_1.DefaultEmbed(query.cmd, msg.guild?.me?.roles.color, {
                        title: data.title,
                        description: locale('track_play_detail', data.author.name)
                    }).setImage(data.image)
                        .setFooter(locale('track_play_detail_footer', client.config.prefix));
                    msg.channel.send(embed);
                }
                else
                    msg.channel.send(locale('track_play_success'));
            }
            else
                msg.channel.send(locale('track_play_force_fail', meAt.name));
        }
    }
}
exports.default = default_1;
exports.aliases = ['track', '테마', '테마설정'];
