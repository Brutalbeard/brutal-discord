"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.ud_client = axios_1.default.create({
    baseURL: 'https://api.urbandictionary.com/v0'
});
