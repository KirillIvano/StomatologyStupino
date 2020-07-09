import {PagePart, HandlePartLoadType} from '@/entities/parts';
import {getOfferPreviews, getOfferCategories} from '@/services/offers';

import {getCategoryNamesMapping} from './helpers';
import content from './template.html';
import './styles.less';
import { getPreviewView } from './components/preview';

const onLoad: HandlePartLoadType = async container => {
    const offersContainer = container.getElementsByClassName('offersContent')[0].children[1];

    const [previewsRes, categoriesRes] = await Promise.all([
        getOfferPreviews(),
        getOfferCategories(),
    ]);

    if (previewsRes.ok === false) {
        container.innerText = 'error occured';
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

const part: PagePart = {
    content,
    handlePartLoad: onLoad,
    partName: 'offers',
};

export default part;
