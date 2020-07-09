import {Page} from '@/entities/pages';
import {createCarousel} from '@/scripts/carousel';
import {offersPartConfig, contactsPartConfig} from '@/parts';
import {getDoctors} from '@/services/doctors';

import html from './layout.html';
import './styles.less';
import {getDoctorView} from './components/doctor';

const handleContentLoad = async (parent: HTMLElement) => {
    const carouselElement = parent.getElementsByClassName('carousel')[0] as HTMLElement;
    const carouselItemsElement = carouselElement.getElementsByClassName('employeeCarouselContent')[0] as HTMLElement;

    const doctorsRes = await getDoctors();
    if (doctorsRes.ok === false) {
        carouselElement.innerHTML = 'Ошибка при получении врачей';
        return;
    }

    const doctorsView = doctorsRes.data.doctors
        .reduce((acc: string, doctor) => acc + getDoctorView(doctor), '');
    carouselItemsElement.innerHTML = doctorsView;

    const {handleMoveBack, handleMoveForward} = createCarousel(carouselElement);

    const [leftControl, rightControl] = Array.from(carouselElement.getElementsByClassName('carouselControl'));

    leftControl.addEventListener('click', handleMoveBack);
    rightControl.addEventListener('click', handleMoveForward);

    return () => {
        leftControl.removeEventListener('click', handleMoveBack);
        rightControl.removeEventListener('click', handleMoveForward);
    };
};

const page: Page = {
    content: html,
    parts: [offersPartConfig, contactsPartConfig],
    handleContentLoad,
};

export default page;
