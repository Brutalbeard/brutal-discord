"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.apod_client = axios_1.default.create({
    baseURL: 'https://api.nasa.gov/planetary'
});
