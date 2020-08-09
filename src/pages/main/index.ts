import {Page} from '@/entities/pages';
import {offersPartConfig, contactsPartConfig} from '@/parts';
import {smoothScroll} from '@/scripts/smoothScroll';

import html from './layout.html';
import './styles.less';

const page: Page = {
    content: html,
    parts: [offersPartConfig, contactsPartConfig],
    handleContentLoad: parent => {
        const btn = document.getElementById('contactsBtn');
        const intro = parent.getElementsByClassName('intro')[0] as HTMLDivElement;

        intro.style.height = `${screen.width > 600 ? screen.height * .7 : screen.height * .5}px`;

        btn.addEventListener('click', () => {
            smoothScroll({
                duration: 500,
                targetId: 'contacts_section',
            });
        });
    },
};

export default page;
