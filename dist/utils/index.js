"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYtInfo = exports.DefaultEmbed = exports.hasPermissions = exports.readRecursively = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const yt_search_1 = __importDefault(require("yt-search"));
// from https://gist.github.com/kethinov/6658166
function readRecursively(dirPath, fileList = []) {
    const files = fs_1.readdirSync(dirPath);
    for (const file of files) {
        const filePath = dirPath + '/' + file;
        const stat = fs_1.statSync(filePath);
        if (stat.isFile())
            fileList.push(filePath);
        else
            fileList = readRecursively(filePath, fileList);
    }
    return fileList;
}
exports.readRecursively = readRecursively;
function hasPermissions(userId, channel, permissions) {
    const channelPerms = channel.permissionsFor(userId);
    if (!channelPerms)
        return false;
    for (const permission of permissions) {
        if (!channelPerms.has(permission)) {
            return false;
        }
    }
    return true;
}
exports.hasPermissions = hasPermissions;
class DefaultEmbed extends discord_js_1.MessageEmbed {
    constructor(situation, roleForColoring, options) {
        super(options);
        this.color = 0xdf73ff;
        this.setAuthor(`${situation ? `Lofi Girl - ${situation}` : 'Lofi Girl'}`, 'https://cdn.discordapp.com/avatars/763033945767280650/f28f0969527e600a8a2c16fae84f8ce3.webp');
        this.setThumbnail('https://media.discordapp.net/attachments/708927519973441556/763208406047129631/994BB93F5AD305BF02.png');
    }
}
exports.DefaultEmbed = DefaultEmbed;
async function getYtInfo(urlstr) {
    const url = new URL(urlstr);
    return await yt_search_1.default({ videoId: url.searchParams.get('v') });
}
exports.getYtInfo = getYtInfo;
