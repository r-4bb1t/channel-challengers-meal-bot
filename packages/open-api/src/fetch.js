"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
/* External dependencies */
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const qs_1 = __importDefault(require("qs"));
const withParams = (url, params) => `${url}?${qs_1.default.stringify(params)}`;
const fetch = (url, params = {}, headers = {}, body = undefined, method = 'GET') => {
    return (0, cross_fetch_1.default)(withParams(url, params), {
        headers: Object.assign({ accept: 'application/json', 'content-type': 'application/json' }, headers),
        body: body ? JSON.stringify(body) : undefined,
        method,
    });
};
const fetchWithAuth = (auth) => (url, params, headers, body, method) => {
    return fetch(url, params, Object.assign(Object.assign({}, headers), { 'x-access-key': auth.accessKey, 'x-access-secret': auth.accessSecret }), body, method);
};
const post = (auth) => (url, params, body) => {
    return fetchWithAuth(auth)(url, params, {}, body, 'POST');
};
exports.post = post;
