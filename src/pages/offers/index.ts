import {Page} from '@/entities/pages';
import {offersPartConfig, contactsPartConfig} from '@/parts';

import html from './layout.html';

const page: Page = {
    content: html,
    parts: [offersPartConfig, contactsPartConfig],
};

export default page;
