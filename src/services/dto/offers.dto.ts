export type OfferCategoryDto = {
    id: number;
    name: string;
}

export type OfferDto = {
    id: number;
    categoryId: number;
    name: string;
    price: number;
}

export type OfferPreviewDto = {
    id: number;
    name: string;
    categoryId: number;
    image: string;
}
