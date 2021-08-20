"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.triviaClient = axios_1.default.create({
    baseURL: 'https://opentdb.com'
});
