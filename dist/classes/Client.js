"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const i18n_1 = require("i18n");
const knex_1 = __importDefault(require("knex"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const Lavalink_1 = __importDefault(require("./Lavalink"));
const Logger_1 = __importDefault(require("./Logger"));
const PATH = path_1.default.resolve();
class default_1 extends discord_js_1.Client {
    constructor() {
        super();
        this.commands = [];
        this.start = (token) => this.login(token || this.config.token);
        this.regist = (event = 'ready', exec) => this.on(event, (...args) => exec(this, ...args));
        const configPath = PATH + '/config.json';
        const commandPath = PATH + '/dist/commands';
        const isConfigExists = fs_1.existsSync(configPath);
        const isCommandExists = fs_1.existsSync(commandPath);
        if (isConfigExists) {
            const configRaw = fs_1.readFileSync(configPath).toString('utf-8');
            const config = JSON.parse(configRaw);
            this.config = {
                token: config.token || process.env.TOKEN || 'ODE0OTA4MDYwNzM2ODE1MTY0.YDksRQ.wZGJ4uEZSYlSJzUYKT6sgfNSpec',
                prefix: config.prefix || process.env.PREFIX || '!',
                koreanbots: config.koreanbots || { enable: false },
                dev: Boolean(config.dev || process.env.DEV || false),
                webhook: config.webhook || {}
            };
        }
        else {
            this.config = {
                token: process.env.TOKEN || '',
                prefix: process.env.PREFIX || '!',
                dev: Boolean(process.env.DEV) || false,
                koreanbots: { enable: false }
            };
        }
        if (this.config.token.length < 1)
            throw new Error('TOKEN not provided');
        if (isCommandExists) {
            const files = utils_1.readRecursively(commandPath);
            for (const file of files) {
                if (!file.endsWith('.js'))
                    continue;
                this.commands.push(require(file));
            }
        }
        this.db = knex_1.default({
            client: 'mysql',
            connection: {
                host: 'localhost',
                port: 3306,
                user: 'lofigirl',
                database: 'lofigirl'
            }
        });
        this.locale = new i18n_1.I18n();
        this.locale.configure({
            locales: fs_1.readdirSync(PATH + '/i18n/').filter((v) => v.endsWith('.json')).map((v) => v.replace('.json', '')),
            directory: PATH + '/i18n'
        });
        const logger = new Logger_1.default(this.config.webhook);
        this.lavalink = new Lavalink_1.default(this, [{
                id: 'main',
                host: 'localhost',
                port: 2334,
                password: 'youshallnotpass'
            }], logger);
    }
}
exports.default = default_1;
