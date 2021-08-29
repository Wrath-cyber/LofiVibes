"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = exports._ = void 0;
const utils_1 = require("../../utils");
async function default_1(client) {
    const embed = new utils_1.DefaultEmbed('초대', null, {
        title: ':tada: 여길 눌러 LofiGirl을 초대해 보세요 :tada:',
        url: `https://discord.com/api/oauth2/authorize?client_id=${client.user?.id}&permissions=0&scope=bot`,
        description: '[지원 서버](https://discord.gg/WJRtvankkB)도 있어요'
    });
    return {
        embeds: [
            embed.toJSON()
        ]
    };
}
exports.default = default_1;
exports._ = '초대';
exports.meta = {
    data: {
        name: '초대',
        description: '봇 초대 링크와 지원 서버 링크를 보여줘요'
    }
};
