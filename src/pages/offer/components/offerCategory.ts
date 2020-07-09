import {OfferType} from '@/entities/offer';

import {getFilteredOffersView} from './offer';

export const getOfferCategoryView = ({
    name,
    offers,
}: {name: string; offers: OfferType[]}): string => (
    `<div class="offerCategory container">
        <h1 class="offerCategoryName">${name}</h1>
        <input placeholder="Найти услугу..." class="offerSearch" type="text" />
        <div class="offerCategoryItems">
            ${getFilteredOffersView(offers, '')}
        </div>
    </div>`
);
