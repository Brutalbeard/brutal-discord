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
    name: 'vote',
    description: 'Cast your vote on a poll!',
    usage: "{poll id}, {voting option}",
    args: true,
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var today, yesterday, user;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        today = new Date();
                        yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        return [4, users_1.default(message.author)];
                    case 1:
                        user = _a.sent();
                        return [4, mongo_client_1.default.polls
                                .findOne({
                                room: message.channel.id,
                                created_at: {
                                    $gte: (yesterday)
                                },
                                poll_id: args[0],
                                deleted: false
                            })
                                .then(function (poll) { return __awaiter(_this, void 0, void 0, function () {
                                var okToVote;
                                return __generator(this, function (_a) {
                                    okToVote = true;
                                    poll.voting_options.find(function (element) {
                                        for (var _i = 0, _a = element.voters; _i < _a.length; _i++) {
                                            var voter = _a[_i];
                                            if (voter.id == user.id) {
                                                okToVote = false;
                                                message.author.send("You've already voted on this poll");
                                            }
                                        }
                                        if (element.option === args[1] && okToVote === true) {
                                            element.voters.push(user);
                                            mongo_client_1.default.polls
                                                .replaceOne({ "_id": poll._id }, poll)
                                                .then(function () {
                                                message.author.send("Vote counted!");
                                            })
                                                .catch(function (e) {
                                                console.error(e);
                                                message.channel.send("Issue counting your vote :=/");
                                            });
                                        }
                                    });
                                    return [2];
                                });
                            }); })
                                .catch(function (e) {
                                console.error("Poll not found");
                                message.channel
                                    .send("Poll not found");
                            })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
};
