"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("./classes/Client"));
const onMessage_1 = __importDefault(require("./events/onMessage"));
const onReady_1 = __importDefault(require("./events/onReady"));
const onVoiceStateUpdate_1 = __importDefault(require("./events/onVoiceStateUpdate"));
const client = new Client_1.default();
client.start();
client.regist('ready', onReady_1.default);
client.regist('message', onMessage_1.default);
client.regist('voiceStateUpdate', onVoiceStateUpdate_1.default);
