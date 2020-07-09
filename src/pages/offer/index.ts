import {Page} from '@/entities/pages';
import {getOffersByCategory} from '@/services/offers';
import {contactsPartConfig} from '@/parts';

import './styles.less';
import {createDebouncer} from './helpers';
import {getFilteredOffersView} from './components/offer';
import {getOfferCategoryView} from './components/offerCategory';
import {OfferType} from '@/entities/offer';

const addFilter = (parent: HTMLElement, offers: OfferType[]) => {
    const categoryItemsEl = parent.getElementsByClassName('offerCategoryItems')[0] as HTMLDivElement;

    const inputDebouncer = createDebouncer(200);
    const searchInput = parent.getElementsByClassName('offerSearch')[0] as HTMLInputElement;

    const searchBarInputHandler = () => inputDebouncer.perform(() => {
        categoryItemsEl.innerHTML = getFilteredOffersView(offers, searchInput.value);
    });

    searchInput.addEventListener(
        'input',
        searchBarInputHandler,
    );
};

const page: Page = {
    content: '<section data-part="contacts"></section>',
    parts: [contactsPartConfig],

    async handleContentLoad(parent, [offerType]) {
        const offersRes = await getOffersByCategory(offerType);

        if (offersRes.ok === false) {
            parent.innerHTML = offersRes.error;
            return;
        }

        const {offers, name} = offersRes.data;

        const clientifiedOffers = offers.map(offer => ({
            ...offer,
            id: String(offer.id),
        }));

        parent.insertAdjacentHTML('afterbegin', getOfferCategoryView({
            name,
            offers: clientifiedOffers,
        }));

        addFilter(parent, clientifiedOffers);
    },
};

export default page;
