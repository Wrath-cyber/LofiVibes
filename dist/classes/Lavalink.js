"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("@lavacord/discord.js");
const superagent_1 = require("superagent");
class Lavalink extends discord_js_1.Manager {
    constructor(client, opt, logger) {
        super(client, opt);
        this.trackCache = {};
        this.logger = logger;
    }
    async play(channel, url) {
        if (!channel)
            return;
        console.log(channel);
        await this.leave(channel.guild.id);
        const player = await this.join({ guild: channel.guild.id, channel: channel.id, node: 'main' });
        player.on('error', (err) => this.logger.logError(err.type, err.error));
        player.on('warn', (warn) => this.logger.logWarn(warn));
        this.logger.logInfo(false, channel.guild);
        await player.play(await this.getTrack(url));
    }
    async stop(guild) {
        if (guild.voice)
            this.logger.logInfo(true, guild);
        await this.leave(guild.id);
    }
    async getTrack(url) {
        if (!this.trackCache[url]) {
            const params = new URLSearchParams();
            params.append('identifier', url);
            const node = this.nodes.get('main');
            if (!node)
                process.exit(1);
            const res = await superagent_1.get('http://' + node.host + ':' + node.port + '/loadtracks?' + params)
                .set('Authorization', node.password);
            this.trackCache[url] = res.body.tracks[0].track;
        }
        return this.trackCache[url];
    }
}
exports.default = Lavalink;
