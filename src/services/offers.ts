import {OfferCategoryType} from '@/entities/offer';

export const getOfferByType =
    (type: string) => fetch(
        `http://194.67.113.29:5000/offer/category/${type}`,
    ).then(
        res => res.json() as Promise<{
            offerCategory: OfferCategoryType;
            error?: undefined;
        } | {
            offerCategory?: undefined;
            error: string;
        }>,
    );
