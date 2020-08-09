export type OfferType = {
    id: string;
    name: string;
    price: number;
    description?: number;
}

export type OfferCategoryType = {
    id: number;
    name: string;
    type: string;
    offers: OfferType[];
}

export type OfferPreviewType = {
    id: number;
    name: string;
    categoryId: number;
    image: string;
}
