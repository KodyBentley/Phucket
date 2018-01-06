"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static randomHash() {
        let text = '';
        let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i <= 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.default = Utils;
