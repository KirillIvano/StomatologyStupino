import {Page} from '@/entities/pages';
import {createCarousel} from '@/scripts/carousel';
import {offersPartConfig, contactsPartConfig} from '@/parts';

import html from './layout.html';
import './styles.less';

const handleContentLoad = (parent: HTMLElement) => {
    const carouselElement = parent.getElementsByClassName('carousel')[0] as HTMLElement;
    const {handleMoveBack, handleMoveForward} = createCarousel(carouselElement);

    const [leftControl, rightControl] = Array.from(carouselElement.getElementsByClassName('carouselControl'));

    leftControl.addEventListener('click', handleMoveBack);
    rightControl.addEventListener('click', handleMoveForward);

    return () => {
        leftControl.removeEventListener('click', handleMoveBack);
        rightControl.removeEventListener('click', handleMoveForward);
    };
};

const page: Page = {
    content: html,
    parts: [offersPartConfig, contactsPartConfig],
    handleContentLoad,
};

export default page;
