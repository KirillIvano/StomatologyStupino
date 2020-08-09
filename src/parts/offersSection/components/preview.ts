import {OfferPreviewType} from '@/entities/offer';
import {getImageUrl} from '@/helpers/getImageUrl';

export const getPreviewView = ({
    name,
    categoryId,
    image,
    categoryName,
}: OfferPreviewType & {categoryName: string}) => `
    <a href="/category/${categoryId}" class="offerItem col-xs-12 col-md-6 redirect-link">
        <img class="icon" src="${getImageUrl(image)}" alt="">
        <div class="offerInfo">
            <div class="offerName">${name}</div>
            <div class="offerDescription">${categoryName}</div>
        </div>
    </a>
`;
