"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(prefix, raw) {
        this.content = raw.split(prefix)[1];
        this.splited = this.content.split(' ');
        this.cmd = this.splited[0];
        this.args = this.splited.splice(1);
    }
}
exports.default = default_1;
