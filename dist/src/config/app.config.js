"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
class AppConfig {
    constructor() {
        this.name = process.env.APP_NAME || 'CASE MD6';
        this.port = Number(process.env.SV_PORT || 8000);
        this.host = process.env.APP_HOST || 'localhost';
    }
}
exports.default = AppConfig;
//# sourceMappingURL=app.config.js.map