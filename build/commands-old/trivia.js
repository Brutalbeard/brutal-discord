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
var discord_js_1 = require("discord.js");
var trivia_client_1 = require("../lib/trivia-client");
var waitTime = 8;
module.exports = {
    name: 'trivia',
    description: "Spark up some trivia fun! You get " + waitTime + " seconds to answer...",
    usage: "{some category} <- use \"!trivia categories\" to get the full list (defaults to General)",
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            var arr_1, category, regex_1, embeddedQuestion, triviaBody;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (args[0] && args[0].toLowerCase() == "categories") {
                            arr_1 = [];
                            trivia_categories.forEach(function (elem) {
                                arr_1.push(elem.name);
                            });
                            return [2, message.channel
                                    .send("Categories: " + arr_1.join(', '))];
                        }
                        category = trivia_categories[0];
                        if (args[0]) {
                            regex_1 = new RegExp(args[0], 'gmi');
                            category = trivia_categories.find(function (elem) {
                                return regex_1.test(elem.name);
                            });
                        }
                        embeddedQuestion = new discord_js_1.MessageEmbed();
                        return [4, trivia_client_1.triviaClient
                                .get('/api.php', {
                                params: {
                                    amount: 1,
                                    category: category.id,
                                    type: 'multiple',
                                    difficulty: 'easy',
                                    encode: "base64"
                                }
                            })
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                var body, keys, _i, keys_1, key, i, possibleAnswers, questionString, i;
                                return __generator(this, function (_a) {
                                    body = res.data.results[0];
                                    keys = Object.keys(body);
                                    for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                        key = keys_1[_i];
                                        if (Array.isArray(body[key])) {
                                            for (i in body[key]) {
                                                body[key][i] = Buffer.from(body[key][i], 'base64').toString();
                                            }
                                        }
                                        else {
                                            body[key] = Buffer.from(body[key], 'base64').toString();
                                        }
                                    }
                                    possibleAnswers = body.incorrect_answers;
                                    possibleAnswers.push(body.correct_answer);
                                    possibleAnswers = possibleAnswers.sort();
                                    questionString = [];
                                    for (i in possibleAnswers) {
                                        questionString.push(parseInt(i) + 1 + " - " + possibleAnswers[i]);
                                    }
                                    embeddedQuestion.setTitle(body.question);
                                    embeddedQuestion.setDescription(questionString.join(",\n"));
                                    return [2, body];
                                });
                            }); })
                                .catch(function (e) {
                                console.error(e);
                            })];
                    case 1:
                        triviaBody = _a.sent();
                        message.channel
                            .send(embeddedQuestion)
                            .then(function () {
                            setTimeout(function () {
                                message.channel
                                    .send("**" + triviaBody.question + "** --- " + triviaBody.correct_answer);
                            }, waitTime * 1000);
                        });
                        return [2];
                }
            });
        });
    },
};
var trivia_categories = [
    {
        "id": 9,
        "name": "General Knowledge"
    },
    {
        "id": 10,
        "name": "Entertainment: Books"
    },
    {
        "id": 11,
        "name": "Entertainment: Film"
    },
    {
        "id": 12,
        "name": "Entertainment: Music"
    },
    {
        "id": 13,
        "name": "Entertainment: Musicals & Theatres"
    },
    {
        "id": 14,
        "name": "Entertainment: Television"
    },
    {
        "id": 15,
        "name": "Entertainment: Video Games"
    },
    {
        "id": 16,
        "name": "Entertainment: Board Games"
    },
    {
        "id": 17,
        "name": "Science & Nature"
    },
    {
        "id": 18,
        "name": "Science: Computers"
    },
    {
        "id": 19,
        "name": "Science: Mathematics"
    },
    {
        "id": 20,
        "name": "Mythology"
    },
    {
        "id": 21,
        "name": "Sports"
    },
    {
        "id": 22,
        "name": "Geography"
    },
    {
        "id": 23,
        "name": "History"
    },
    {
        "id": 24,
        "name": "Politics"
    },
    {
        "id": 25,
        "name": "Art"
    },
    {
        "id": 26,
        "name": "Celebrities"
    },
    {
        "id": 27,
        "name": "Animals"
    },
    {
        "id": 28,
        "name": "Vehicles"
    },
    {
        "id": 29,
        "name": "Entertainment: Comics"
    },
    {
        "id": 30,
        "name": "Science: Gadgets"
    },
    {
        "id": 31,
        "name": "Entertainment: Japanese Anime & Manga"
    },
    {
        "id": 32,
        "name": "Entertainment: Cartoon & Animations"
    }
];
