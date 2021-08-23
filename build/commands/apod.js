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
var apod_client_1 = require("../lib/apod-client");
var discord_js_1 = require("discord.js");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('apod')
        .setDescription('NASA\'s astronomy Picture of the Day!')
        .addBooleanOption(function (bool) {
        bool
            .setName("random")
            .setDescription("Gets you a random image from sometime in the past")
            .setRequired(false);
        return bool;
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var rand, queryDate, res, embed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rand = interaction
                            .options
                            ._hoistedOptions
                            .find(function (element) {
                            return element.name === 'random';
                        });
                        queryDate = null;
                        if (rand && rand.value === true) {
                            queryDate = randomDate(new Date(1998, 0, 1), new Date());
                        }
                        return [4, apod_client_1.apodClient
                                .get('/apod', {
                                params: {
                                    date: queryDate,
                                    api_key: process.env['APOD_KEY']
                                }
                            })
                                .then(function (res) {
                                return res.data;
                            })
                                .catch(function (e) {
                                console.error(e);
                            })];
                    case 1:
                        res = _a.sent();
                        embed = new discord_js_1.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(res.title)
                            .setURL('https://discord.js.org')
                            .setImage(res.hdurl)
                            .setDescription(res.explanation ? res.explanation : "")
                            .setFooter(res.copyright ? "Credit: " + res.copyright : "")
                            .setTimestamp(new Date(res.date));
                        return [4, interaction
                                .reply({
                                embeds: [embed]
                            })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
};
function randomDate(start, end) {
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
