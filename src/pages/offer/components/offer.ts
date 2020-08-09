import {OfferType} from '@/entities/offer';

export const getOfferView = ({
    name,
    price,
    description,
}: OfferType) => (
    `<div class="offer">
        <div class="offer__head">
            <p class="offer__name">${name}</p>
            <p class="offer__price">${price}р</p>
        </div>
        ${description ? `<p class="offer__description">${description}</p>` : ''}
    </div>`
);

export const getFilteredOffersView = (offers: OfferType[], filterVal: string) => offers.reduce(
    (acc, offer) => offer.name.toLowerCase().includes(filterVal.toLowerCase()) ?
        acc + getOfferView(offer) :
        acc,
    '',
);

