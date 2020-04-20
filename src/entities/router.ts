import {Page} from './pages';

export type RouteConfig = {
    path: string | RegExp;
    getPage: () => Promise<Page>;
};
