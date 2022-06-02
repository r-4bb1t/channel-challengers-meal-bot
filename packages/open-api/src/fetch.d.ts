import { Auth } from './types';
export declare const post: (auth: Auth) => (url: string, params?: Record<string, string> | undefined, body?: Record<string, any> | undefined) => Promise<Response>;
