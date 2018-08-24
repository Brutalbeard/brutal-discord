"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_client_1 = require("../lib/mongo-client");
var users_1 = require("../lib/users");
module.exports = {
    name: 'updoot',
    description: 'Give someone a doot! For fun!',
    usage: "{@username}",
    args: true,
    cooldown: 5,
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var user, mentionedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, users_1.default(message.author)];
                    case 1:
                        user = _a.sent();
                        return [4, users_1.default(message.mentions.users.array()[0])];
                    case 2:
                        mentionedUser = _a.sent();
                        if (user.id == mentionedUser.id) {
                            message.channel.send("Can't updoot yourself idiot.");
                        }
                        else if (user.id != mentionedUser.id) {
                            mongo_client_1.default.users.updateOne({ id: mentionedUser.id }, {
                                $inc: { doots: 1 }
                            }).then(function () {
                                message.channel.send("@" + mentionedUser.username + " now has " + (mentionedUser.doots + 1) + " doot(s)! Thanks " + user.username);
                            }).catch(function (e) {
                                console.error(e);
                                message.channel.send("Had an issue giving a doot :-/");
                            });
                        }
                        return [2];
                }
            });
        });
    },
};
