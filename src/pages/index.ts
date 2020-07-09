import {RouteConfig} from '@/entities/router';

const mainPageConfig: RouteConfig = {
    path: '/',
    getPage: () =>
        import(
            /* webpackChunkName: "main-page" */
            /* webpackMode: "lazy" */
            './main').then(
            res => res.default,
        ),
};

const offersPageConfig: RouteConfig = {
    path: '/offers',
    getPage: () =>
        import(
            /* webpackChunkName: "offers-page" */
            /* webpackMode: "lazy" */
            './offers').then(
            res => res.default,
        ),
};

const employeePageConfig: RouteConfig = {
    path: '/employee',
    getPage: () =>
        import(
            /* webpackChunkName: "employee-page" */
            /* webpackMode: "lazy" */
            './employee').then(
            res => res.default,
        ),
};

const contactsPageConfig: RouteConfig = {
    path: '/contacts',
    getPage: () => import(
        /* webpackChunkName: "employee-page" */
        /* webpackMode: "lazy" */
        './contacts').then(
        res => res.default,
    ),
};

const offerPageConfig: RouteConfig = {
    path: /\/category\/(.+)/,
    getPage: () =>
        import(
            /* webpackChunkName: "offers-page" */
            /* webpackMode: "lazy" */
            './offer').then(
            res => res.default,
        ),
};

export const pagesConfigs = [
    mainPageConfig,
    employeePageConfig,
    offersPageConfig,
    offerPageConfig,
    contactsPageConfig,
];
