/* External dependencies */
import dotenv from 'dotenv';
import express from 'express';

/* Workspace dependencies */
import ChannelOpenApiClient from '@channel-challengers/open-api/src/client';
import { WebhookResponse } from './types';

dotenv.config();

const port = process.env.PORT || 8080;

const botName = '회장 나와라 봇';
const keyword = '회장';
// NOTE: You can also get username of manager from OpenApi by manager id
const summonTargetManagerInfo = {
  id: '161679',
  username: 'hoi',
};

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended : false } ));

const client = new ChannelOpenApiClient({
  accessKey: process.env.CHANNEL_ACCESS_KEY ?? '',
  accessSecret: process.env.CHANNEL_ACCESS_SECRET ?? '',
});

app.post('/',
  async (res: WebhookResponse) => {
    try {
      const { body } = res;
      const { event, entity } = body;
      const { plainText = '', personType = '', chatId: groupId } = entity;

      const summonKeyword = `@${keyword}`;
      const isPushEvent = event === 'push';
      const hasSummonKeyword = plainText.includes(summonKeyword);
      const isManagerMessage = personType === 'manager';
      const needToSummon = isPushEvent && hasSummonKeyword && isManagerMessage;

      if (needToSummon) {
        const { id, username } = summonTargetManagerInfo;
        await client.group.postMessage({
          groupId,
          botName,
          blocks: [{ type: 'text', value: `<link type="manager" value="${id}">@${username}</link>` }],
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
);

app.listen(port, () => console.log(`Listening on port ${port}...`));
