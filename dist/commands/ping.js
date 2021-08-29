"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descript = exports.aliases = void 0;
function default_1(client, msg, _, locale) {
    msg.channel.send(locale('ping_success', client.ws.ping));
}
exports.default = default_1;
exports.aliases = ['ping', '핑', 'pong'];
exports.descript = '통신 지연 속도를 측정하고 보여줘요';
