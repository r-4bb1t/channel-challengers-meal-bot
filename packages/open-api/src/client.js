"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* External dependencies */
const uuid_1 = require("uuid");
/* Internal dependencies */
const constants_1 = require("./constants");
const fetch_1 = require("./fetch");
const utils_1 = require("./utils");
class GroupOpenApiSender {
    constructor(client) {
        this.client = client;
        this.url = (0, utils_1.makeSenderUrl)((0, utils_1.makeUrl)(constants_1.baseUrl, this.client.appVersion), constants_1.SenderTypes.Group);
    }
    postMessage({ groupId, botName, blocks, }) {
        return (0, fetch_1.post)(this.client.auth)(`${this.url}/${groupId}/messages`, { botName }, {
            requestId: (0, uuid_1.v4)(),
            blocks,
        });
    }
}
class ChannelOpenApiClient {
    constructor(config) {
        this.appVersion = 'v5';
        const { accessSecret, accessKey } = config;
        this.auth = {
            accessSecret,
            accessKey,
        };
    }
    get group() {
        return new GroupOpenApiSender(this);
    }
}
exports.default = ChannelOpenApiClient;
