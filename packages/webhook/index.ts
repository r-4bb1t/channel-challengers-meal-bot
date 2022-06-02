/* External dependencies */
import dotenv from "dotenv";
import express from "express";
import axios from "axios";

/* Workspace dependencies */
import ChannelOpenApiClient from "@channel-challengers/open-api/src/client";
import { WebhookResponse } from "./types";

dotenv.config();

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

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new ChannelOpenApiClient({
  accessKey: process.env.CHANNEL_ACCESS_KEY ?? "",
  accessSecret: process.env.CHANNEL_ACCESS_SECRET ?? "",
});

app.post("/", async (res: WebhookResponse) => {
  try {
    const { body } = res;
    const { event, entity } = body;
    const {
      plainText = "",
      personType = "",
      chatId: groupId,
      personId,
    } = entity;

    const summonKeyword = `/${keyword}`;
    const isPushEvent = event === "push";
    const hasSummonKeyword = plainText.includes(summonKeyword);
    const isManagerMessage = personType === "manager";
    const needToSummon = isPushEvent && hasSummonKeyword && isManagerMessage;
    const manager = await axios.get(
      `https://api.channel.io/open/v5/managers/${personId}`,
      {
        headers: {
          "x-access-key": process.env.CHANNEL_ACCESS_KEY ?? "",
          "x-access-secret": process.env.CHANNEL_ACCESS_SECRET ?? "",
        },
      }
    );
    const name = manager.data.manager.name;

    if (needToSummon) {
      const { id, username } =
        summonTargetManagerInfo[
          Math.floor(Math.random() * summonTargetManagerInfo.length)
        ];
      await client.group.postMessage({
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
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
