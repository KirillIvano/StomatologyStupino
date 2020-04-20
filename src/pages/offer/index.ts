import {Page} from '@/entities/pages';
import {OfferType, OfferCategoryType} from '@/entities/offer';
import {getOfferByType} from '@/services/offers';
import {contactsPartConfig} from '@/parts';

import './styles.less';
import {createDebouncer} from './helpers';

const createOfferTemplate = ({
    name,
    price,
}: OfferType) => (
    `<div class="offer">
        <p class="offerName">${name}</p>
        <p class="offerPrice">${price}р</p>
    </div>`
);

const createFilteredOffersTemplate = (offers: OfferType[], filterVal) => offers.reduce(
    (acc, offer) => offer.name.includes(filterVal) ? acc + createOfferTemplate(offer) : acc,
    '',
);
const createAllOffersTemplate = (offers: OfferType[]) =>
    offers.reduce((acc, offer) => acc + createOfferTemplate(offer), '');

const createOfferCategoryTemplate = ({
    name,
    offers,
}: OfferCategoryType): string => (
    `<div class="offerCategory container">
        <h1 class="offerCategoryName">${name}</h1>
        <input placeholder="Найти услугу..." class="offerSearch" type="text" />
        <div class="offerCategoryItems">
            ${createAllOffersTemplate(offers)}
        </div>
    </div>`
);

const page: Page = {
    content: '<section data-part="contacts"></section>',
    parts: [contactsPartConfig],
    handleContentLoad(parent, [offerType]) {
        getOfferByType(offerType).then(({offerCategory, error}) => {
            if (error) {
                parent.innerText = error;
            }

            parent.insertAdjacentHTML('afterbegin', createOfferCategoryTemplate(offerCategory));

            const categoryItemsEl = parent.getElementsByClassName('offerCategoryItems')[0] as HTMLDivElement;

            const inputDebouncer = createDebouncer(200);
            const searchInput = parent.getElementsByClassName('offerSearch')[0] as HTMLInputElement;
            const {offers} = offerCategory;

            const searchBarInputHandler = () => inputDebouncer.perform(() => {
                categoryItemsEl.innerHTML = createFilteredOffersTemplate(offers, searchInput.value);
            });

            searchInput.addEventListener(
                'input',
                searchBarInputHandler,
            );

            return () => searchInput.removeEventListener('input', searchBarInputHandler);
        });
    },
};

export default page;
