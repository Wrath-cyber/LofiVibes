"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = exports._ = void 0;
const utils_1 = require("../../utils");
async function default_1(client) {
    const fields = [];
    for (const command of client.commands) {
        console.log(fields);
        const { aliases } = command;
        if (!aliases)
            continue;
        const name = aliases.reduce((acc, alias) => `${acc}\`${client.config.prefix}${alias}\` `, '');
        fields.push({ name, value: client.locale.__(`${aliases[0]}_help`) });
    }
    return {
        embeds: [
            new utils_1.DefaultEmbed('도움말')
                .setImage('https://cdn.discordapp.com/attachments/530043751901429762/812601825568096287/Peek_2021-02-20_17-29.gif')
                .addFields(fields)
                .toJSON()
        ]
    };
}
exports.default = default_1;
exports._ = '도움말';
exports.meta = {
    data: {
        name: '도움말',
        description: '도움말을 보여줘요'
    }
};
