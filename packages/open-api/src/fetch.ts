/* External dependencies */
import baseFetch from 'cross-fetch';
import qs from 'qs';
import { Auth } from './types';

type Fetch<Response> = (
  url: string,
  params?: Record<string, string>,
  headers?: Record<string, string>,
  body?: any,
  method?: string,
) => Promise<Response>;

const withParams = (url: string, params?: Record<string, string>) =>
  `${url}?${qs.stringify(params)}`;

const fetch: Fetch<Response> = (
  url,
  params = {},
  headers = {},
  body = undefined,
  method = 'GET',
) => {
  return baseFetch(
    withParams(url, params),
    {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      method,
    },
  );
};

type FetchWithAuth<Response> = (auth: Auth) => Fetch<Response>;

const fetchWithAuth: FetchWithAuth<Response> = (auth) => (url, params, headers, body, method) => {
  return fetch(
    url,
    params,
    {
      ...headers,
      'x-access-key': auth.accessKey,
      'x-access-secret': auth.accessSecret,
    },
    body,
    method,
  );
};

export const post = (auth: Auth) => (
  url: string,
  params?: Record<string, string>,
  body?: Record<string, any>,
) => {
  return fetchWithAuth(auth)(
    url,
    params,
    {},
    body,
    'POST',
  );
};