"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSenderUrl = exports.makeUrl = void 0;
const makeUrl = (url, appVersion) => `${url}/open/${appVersion}`;
exports.makeUrl = makeUrl;
const makeSenderUrl = (url, from) => {
    return `${url}/${from}`;
};
exports.makeSenderUrl = makeSenderUrl;
