import {OfferType} from '@/entities/offer';

export const getOfferView = ({
    name,
    price,
}: OfferType) => (
    `<div class="offer">
        <p class="offerName">${name}</p>
        <p class="offerPrice">${price}р</p>
    </div>`
);

export const getFilteredOffersView = (offers: OfferType[], filterVal: string) => offers.reduce(
    (acc, offer) => offer.name.includes(filterVal) ?
        acc + getOfferView(offer) :
        acc,
    '',
);

