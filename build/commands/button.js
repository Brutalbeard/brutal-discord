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
var builders_1 = require("@discordjs/builders");
var mongo_client_1 = require("../lib/mongo-client");
var Chance = require("chance");
var chance = new Chance();
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('butt')
        .setDescription('Get some buttons!'),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var myId, newTrivia, dbObject, time, countdown;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myId = chance.guid();
                        newTrivia = {
                            id: myId,
                            smartUsers: [],
                            dumbUsers: [],
                            row: {
                                components: []
                            }
                        };
                        newTrivia.row = {
                            components: [
                                {
                                    custom_id: myId + "-1",
                                    disabled: false,
                                    emoji: null,
                                    label: 'Answer 1',
                                    style: 2,
                                    type: 2,
                                    url: null,
                                    correctAnswer: true,
                                    timesChosen: 0
                                },
                                {
                                    custom_id: myId + "-2",
                                    disabled: false,
                                    emoji: null,
                                    label: 'Answer 2',
                                    style: 2,
                                    type: 2,
                                    url: null,
                                    correctAnswer: false,
                                    timesChosen: 0
                                },
                                {
                                    custom_id: myId + "-3",
                                    disabled: false,
                                    emoji: null,
                                    label: 'Answer 3',
                                    style: 2,
                                    type: 2,
                                    url: null,
                                    correctAnswer: false,
                                    timesChosen: 0
                                },
                                {
                                    custom_id: myId + "-4",
                                    disabled: false,
                                    emoji: null,
                                    label: 'Answer 4',
                                    style: 2,
                                    type: 2,
                                    url: null,
                                    correctAnswer: false,
                                    timesChosen: 0
                                }
                            ],
                            type: 1
                        };
                        return [4, mongo_client_1.default
                                .trivia
                                .insertOne(newTrivia)
                                .catch(function (e) {
                                console.error("DB ERROR: ", e);
                            })];
                    case 1:
                        dbObject = _a.sent();
                        time = 3;
                        return [4, interaction
                                .reply({ content: "Butts " + time + "!", components: [newTrivia.row] })];
                    case 2:
                        _a.sent();
                        countdown = setInterval(function () {
                            time -= 1;
                            interaction
                                .editReply({ content: "Butts " + time + "!", components: [newTrivia.row] });
                        }, 1000);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var finalTrivia, components, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(newTrivia.row);
                                        return [4, mongo_client_1.default
                                                .trivia
                                                .findOne({
                                                id: myId
                                            }).then(function (res) {
                                                return res;
                                            }).catch(function (e) {
                                                console.error(e);
                                            })];
                                    case 1:
                                        finalTrivia = _a.sent();
                                        components = finalTrivia.row.components;
                                        for (i in components) {
                                            components[i].disabled = true;
                                            if (components[i].correctAnswer === true)
                                                components[i].style = "SUCCESS";
                                            components[i].label = components[i].label + " (" + components[i].timesChosen + ")";
                                        }
                                        finalTrivia.row.components = components;
                                        console.log(finalTrivia);
                                        clearInterval(countdown);
                                        interaction
                                            .editReply({ content: "Butts " + time + "!", components: [finalTrivia.row] });
                                        return [2];
                                }
                            });
                        }); }, 4000);
                        return [2];
                }
            });
        });
    },
};
