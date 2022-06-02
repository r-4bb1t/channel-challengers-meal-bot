"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
/* External dependencies */
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
/* Workspace dependencies */
const client_1 = __importDefault(require("@channel-challengers/open-api/src/client"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const botName = "랜덤 운영진 밥약 봇";
const keyword = "밥약";
// NOTE: You can also get username of manager from OpenApi by manager id
const summonTargetManagerInfo = [
    { id: "177331", username: "김현채" },
    { id: "177450", username: "양제현" },
    { id: "177529", username: "유영인" },
    { id: "179217", username: "강태웅" },
    { id: "179243", username: "김채린" },
];
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const client = new client_1.default({
    accessKey: (_a = process.env.CHANNEL_ACCESS_KEY) !== null && _a !== void 0 ? _a : "",
    accessSecret: (_b = process.env.CHANNEL_ACCESS_SECRET) !== null && _b !== void 0 ? _b : "",
});
app.post("/", (res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { body } = res;
        const { event, entity } = body;
        const { plainText = "", personType = "", chatId: groupId, personId, } = entity;
        const summonKeyword = `/${keyword}`;
        const isPushEvent = event === "push";
        const hasSummonKeyword = plainText.includes(summonKeyword);
        const isManagerMessage = personType === "manager";
        const needToSummon = isPushEvent && hasSummonKeyword && isManagerMessage;
        const manager = yield axios_1.default.get(`https://api.channel.io/open/v5/managers/${personId}`, {
            headers: {
                "x-access-key": (_c = process.env.CHANNEL_ACCESS_KEY) !== null && _c !== void 0 ? _c : "",
                "x-access-secret": (_d = process.env.CHANNEL_ACCESS_SECRET) !== null && _d !== void 0 ? _d : "",
            },
        });
        const name = manager.data.manager.name;
        if (needToSummon) {
            const { id, username } = summonTargetManagerInfo[Math.floor(Math.random() * summonTargetManagerInfo.length)];
            yield client.group.postMessage({
                groupId,
                botName,
                blocks: [
                    {
                        type: "text",
                        value: `<link type="manager" value="${id}">@${username}</link>님!! <link type="manager" value="${personId}">@${name}</link>님한테 밥 사주세용`,
                    },
                ],
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(port, () => console.log(`Listening on port ${port}...`));
