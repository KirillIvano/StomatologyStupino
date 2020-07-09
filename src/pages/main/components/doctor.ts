import {Doctor} from '@/entities/doctor';
import {getImageUrl} from '@/helpers/getImageUrl';

export const getDoctorView = ({
    name,
    info,
    image,
}: Doctor) => `
    <div class="employeeCarouselItem carouselItem row">
        <div class="imageContainer">
            <img class="image" src="${getImageUrl(image)}" alt="">
        </div>
        <div class="employeeInfo col-xs-12 col-md-6">
            <h1 class="employeeName">${name}</h1>
            <p class="employeeDescription">
                ${info} 
            </p>
        </div>
    </div>
`;
