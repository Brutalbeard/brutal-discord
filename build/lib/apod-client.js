"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
exports.apodClient = axios_1.default.create({
    baseURL: 'https://api.nasa.gov/planetary'
});
