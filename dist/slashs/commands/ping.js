"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = exports._ = void 0;
async function default_1(client) {
    return { content: `:ping_pong: 지연시간: **${client.ws.ping}밀리초**` };
}
exports.default = default_1;
exports._ = '핑';
exports.meta = {
    data: {
        name: '핑',
        description: '통신 지연 속도를 측정하고 보여줘요'
    }
};
