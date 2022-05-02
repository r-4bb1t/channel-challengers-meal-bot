/* Internal dependencies */
import { SenderTypes } from './constants';

export const makeUrl = (url: string, appVersion: string) => `${url}/open/${appVersion}`;

export const makeSenderUrl = (url: string, from: SenderTypes) => {
  return `${url}/${from}`;
};