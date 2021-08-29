"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aliases = void 0;
const utils_1 = require("../utils");
async function default_1(client, msg, _, locale) {
    if (!msg.guild)
        return;
    if (!msg.member)
        return;
    const meAt = msg.guild.me?.voice?.channel;
    const userAt = msg.guild.me?.voice?.channel;
    if (!meAt)
        return msg.channel.send(locale('leave_no_voice'));
    if (!meAt || meAt !== userAt) {
        const membersIn = meAt.members.filter((m) => !m.user.bot).size;
        if (membersIn < 1) {
            client.lavalink.leave(msg.guild.id);
            msg.channel.send(locale('leave_success'));
        }
        else if (utils_1.hasPermissions(msg.author.id, meAt, ['MOVE_MEMBERS'])) {
            const m = await msg.channel.send(locale('leave_fource_question_1', meAt.name));
            if (utils_1.hasPermissions(client.user?.id, msg.channel, ['ADD_REACTIONS'])) {
                m.react('✅');
                await m.awaitReactions((react, user) => react.emoji.name === '✅' && user.id === msg.author.id, { max: 1 });
            }
            else {
                msg.channel.send(locale('leave_force_no_react', client.config.prefix));
                await msg.channel.awaitMessages((message, user) => message.content === locale('leave_force_no_react_answer', client.config.prefix) && user.id === msg.author.id, { max: 1 });
                client.lavalink.leave(msg.guild.id);
            }
        }
        else
            msg.channel.send(locale('leave_force_fail_1', meAt.name));
    }
    else {
        const membersIn = meAt.members.filter((m) => !m.user.bot && m.id !== msg.author.id).size;
        if (membersIn < 1) {
            client.lavalink.leave(msg.guild.id);
            msg.channel.send(locale('leave_success'));
        }
        else if (utils_1.hasPermissions(msg.author.id, meAt, ['MOVE_MEMBERS'])) {
            const m = await msg.channel.send(locale('leave_force_question_2', meAt.name));
            if (utils_1.hasPermissions(client.user?.id, msg.channel, ['ADD_REACTIONS'])) {
                m.react('✅');
                await m.awaitReactions((react, user) => react.emoji.name === '✅' && user.id === msg.author.id, { max: 1 });
            }
            else {
                msg.channel.send(locale('leave_force_no_react', client.config.prefix));
                await msg.channel.awaitMessages((message, user) => message.content === locale('leave_force_no_react_answer', client.config.prefix) && user.id === msg.author.id, { max: 1 });
                client.lavalink.leave(msg.guild.id);
            }
        }
        else
            msg.channel.send(locale('leave_force_fail_2', meAt.name));
    }
}
exports.default = default_1;
exports.aliases = ['leave', 'stop', '정지', '나가기'];
