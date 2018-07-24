"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.giphy_client = axios_1.default.create({
    baseURL: 'http://api.giphy.com/v1/gifs',
    params: {
        api_key: process.env['GIPHY_KEY']
    }
});
