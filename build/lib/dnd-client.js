"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var dnd = axios_1.default.create({
    baseURL: "http://dnd5eapi.co/api"
});
exports.default = dnd;
