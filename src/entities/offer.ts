export type OfferType = {
    name: string;
    price: number;
}

export type OfferCategoryType = {
    id: string;
    name: string;
    type: string;
    offers: OfferType[];
}
