/// <reference types="express-serve-static-core" />
declare type ChannelWebhookEvent = string;
declare type ChannelWebhookEntity = {
    plainText: string;
    personType: string;
    chatId: string;
    personId: string;
};
export interface TypedResponseBody<T> extends Express.Response {
    body: T;
}
export declare type WebhookResponse = TypedResponseBody<{
    event: ChannelWebhookEvent;
    entity: ChannelWebhookEntity;
}>;
export {};
