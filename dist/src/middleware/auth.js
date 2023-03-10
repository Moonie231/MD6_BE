"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = '12345678';
const auth = (req, res, next) => {
    console.log(req.headers);
    let authorization = req.headers.authorization;
    console.log();
    if (authorization) {
        let accessToken = req.headers.authorization.split(' ')[1];
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, exports.SECRET, (err, payload) => {
                if (err) {
                    res.status(403).json({
                        err: err.message,
                        message: 'you are anonymous'
                    });
                }
                else {
                    req.decoded = payload;
                    next();
                }
            });
        }
        else {
            res.status(403).json({ message: 'you are anonymous' });
        }
    }
    else {
        res.status(403).json({ message: 'you are anonymous' });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map