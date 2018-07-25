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
    name: 'poll',
    description: 'Create a shiny new poll for people to vote on!',
    usage: "Is Ian a baller? - yes no",
    args: true,
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var pollAuthor, poll_id, question, options, poll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, users_1.default(message.author)];
                    case 1:
                        pollAuthor = _a.sent();
                        return [4, getLastPollId(message)];
                    case 2:
                        poll_id = _a.sent();
                        question = splitQuestion(args);
                        options = splitVotingOptions(args);
                        poll = {
                            poll_id: poll_id,
                            poll_author: pollAuthor,
                            room: message.channel.id,
                            question: question,
                            voting_options: options,
                            created_at: new Date(),
                            updated_at: new Date(),
                            deleted: false
                        };
                        return [4, mongo_client_1.default.polls.insertOne(poll).then(function () {
                                message.channel.send("Poll Created! To Vote on it, user ID " + poll_id);
                            }).catch(function (e) {
                                message.channel.send("There was an issue storing your poll! Whomp whomp :-/").catch(function (err) {
                                    console.error(err);
                                });
                                console.error(e);
                            })];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
};
function getLastPollId(message) {
    return __awaiter(this, void 0, void 0, function () {
        var poll_id, today, yesterday, docs, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date();
                    yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    return [4, mongo_client_1.default.polls.find({
                            room: message.channel.id,
                            created_at: {
                                $gte: (yesterday)
                            },
                            deleted: false
                        }).toArray()];
                case 1:
                    docs = _a.sent();
                    if (docs.length == 0) {
                        poll_id = '1';
                    }
                    else {
                        temp = docs[docs.length - 1].poll_id;
                        poll_id = (parseInt(temp) + 1).toString();
                    }
                    return [2, poll_id];
            }
        });
    });
}
function splitQuestion(args) {
    var pieces = args.slice(0, args.indexOf('-'));
    var question = pieces.join(' ');
    return question;
}
function splitVotingOptions(args) {
    var options = args.slice(args.indexOf('-') + 1);
    var arr = [];
    options.forEach(function (element) {
        arr.push({
            option: element,
            voters: []
        });
    });
    return arr;
}
