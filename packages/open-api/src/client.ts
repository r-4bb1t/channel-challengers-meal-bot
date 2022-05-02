/* External dependencies */
import { v4 as uuid } from 'uuid';

/* Internal dependencies */
import { baseUrl, SenderTypes } from './constants';
import { Auth, PostMessageDTO } from './types';
import { post } from './fetch';
import { makeSenderUrl, makeUrl } from './utils';

interface SenderBase {
  client: ChannelOpenApiClient
  url: string
}

class GroupOpenApiSender implements SenderBase {
  client: ChannelOpenApiClient;

  url: string;

  constructor(client: ChannelOpenApiClient) {
    this.client = client;
    this.url = makeSenderUrl(
      makeUrl(baseUrl, this.client.appVersion),
      SenderTypes.Group,
    );
  }

  postMessage({
    groupId,
    botName,
    blocks,
  }: PostMessageDTO) {
    return post(this.client.auth)(
      `${this.url}/${groupId}/messages`,
      { botName },
      {
        requestId: uuid(),
        blocks,
      },
    );
  }
}

interface ChannelOpenApiClientConstructor {
  accessSecret: string
  accessKey: string
}

class ChannelOpenApiClient {
  auth: Auth;

  appVersion: string = 'v5';

  constructor(config: ChannelOpenApiClientConstructor) {
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

export default ChannelOpenApiClient;
