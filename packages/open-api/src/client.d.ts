import { Auth, PostMessageDTO } from './types';
interface SenderBase {
    client: ChannelOpenApiClient;
    url: string;
}
declare class GroupOpenApiSender implements SenderBase {
    client: ChannelOpenApiClient;
    url: string;
    constructor(client: ChannelOpenApiClient);
    postMessage({ groupId, botName, blocks, }: PostMessageDTO): Promise<Response>;
}
interface ChannelOpenApiClientConstructor {
    accessSecret: string;
    accessKey: string;
}
declare class ChannelOpenApiClient {
    auth: Auth;
    appVersion: string;
    constructor(config: ChannelOpenApiClientConstructor);
    get group(): GroupOpenApiSender;
}
export default ChannelOpenApiClient;
