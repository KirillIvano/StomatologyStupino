import {OfferCategoryDto} from '@/services/dto/offers.dto';

export const getCategoryNamesMapping = (categories: OfferCategoryDto[]) =>
    categories.reduce((acc: Record<number, string>, category) => {
        acc[category.id] = category.name;

        return acc;
    }, {});
