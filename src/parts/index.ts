import {PagePartConfig} from '@/entities/parts';

export const contactsPartConfig: PagePartConfig = {
    getPart: () => import(
        /* webpackChunkName: "contacts-section" */
        /* webpackMode: "lazy" */
        './contactsSection').then(m => m.default),
};

export const offersPartConfig: PagePartConfig = {
    getPart: () => import(
        /* webpackChunkName: "offers-section" */
        /* webpackMode: "lazy" */
        './offersSection').then(m => m.default),
};
