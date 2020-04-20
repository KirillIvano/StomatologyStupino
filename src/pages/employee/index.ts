import {Page} from '@/entities/pages';
import {contactsPartConfig} from '@/parts';

import content from './layout.html';

const page: Page = {
    content: content,
    parts: [contactsPartConfig],
};

export default page;
