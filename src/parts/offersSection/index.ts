import {PagePart, HandlePartLoadType} from '@/entities/parts';
import {getOfferPreviews, getOfferCategories} from '@/services/offers';
import {smoothScroll} from '@/scripts/smoothScroll';

import {getCategoryNamesMapping} from './helpers';
import content from './template.html';
import './styles.less';
import {getPreviewView} from './components/preview';


const initScrollButton = (container: HTMLElement) => {
    const btn = container.querySelector('.offer__button');

    if (!btn) return;

    btn.addEventListener('click', () => {
        smoothScroll({
            duration: 500,
            targetId: 'contacts_section',
        });
    });
};

const initOffers = async (container: HTMLElement) => {
    const offersContainer = container.getElementsByClassName('offersContent')[0].children[1];

    const [previewsRes, categoriesRes] = await Promise.all([
        getOfferPreviews(),
        getOfferCategories(),
    ]);

    if (previewsRes.ok === false) {
        container.innerText = 'Не удалось';
        return;
    }
    if (categoriesRes.ok === false) {
        container.innerText = 'error occured';
        return;
    }

    const namesMapping = getCategoryNamesMapping(categoriesRes.data.categories);
    const enhancedPreviews = previewsRes
        .data
        .previews
        .map(
            preview => ({
                ...preview,
                categoryName: namesMapping[preview.categoryId],
            }),
        );

    offersContainer.innerHTML = enhancedPreviews.reduce(
        (acc: string, preview) => acc + getPreviewView(preview),
        '',
    );
};

const onLoad: HandlePartLoadType = async container => {
    await initOffers(container);
    initScrollButton(container);
};

const part: PagePart = {
    content,
    handlePartLoad: onLoad,
    partName: 'offers',
};

export default part;
