import {jsonFetch} from '@/helpers/jsonFetch';
import {generateApiUrl} from '@/helpers/generateApiUrl';

import {OfferCategoryDto, OfferDto, OfferPreviewDto} from './dto/offers.dto';

export const getOfferPreviews = () =>
    jsonFetch<{previews: OfferPreviewDto[]}>(
        generateApiUrl('/offer/preview'),
    );

export const getOfferCategories = () =>
    jsonFetch<{categories: OfferCategoryDto[]}>(
        generateApiUrl('/offer/category/all'),
    );

export const getOfferInfo = (id: number) =>
    jsonFetch<{}>(
        generateApiUrl(`/offer/${id}`),
    );

export const getOffersByCategory = (categoryId: string) =>
    jsonFetch<{offers: OfferDto[]; name: string}>(
        generateApiUrl(
            categoryId !== 'all' ? `/offer/category/${categoryId}` : '/offer/all',
        ),
    );
