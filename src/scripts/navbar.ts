let navBarSlider: HTMLDivElement;
let selectedAnchor: HTMLAnchorElement = null;

const navbar = document.getElementsByClassName('navbar')[0] as HTMLDivElement;
const links = Array.prototype.slice.call(
    navbar.getElementsByTagName('a'),
) as HTMLAnchorElement[];

const moveSliderToAnchor = (a: HTMLAnchorElement): void => {
    const {width: sliderWidth, left: sliderOffset} = a.getBoundingClientRect();

    navBarSlider.style.transform = `translate(${sliderOffset}px)`;
    navBarSlider.style.width = `${sliderWidth}px`;
};

const navbarClickHandler = (e: MouseEvent): void => {
    let currentNode = e.target as HTMLElement;

    while (currentNode.tagName !== 'A') {
        if (currentNode.tagName === 'NAV') return;
        currentNode = currentNode.parentElement;
    }

    selectedAnchor = currentNode as HTMLAnchorElement;+
    moveSliderToAnchor(currentNode as HTMLAnchorElement);
};

const updateSlider = () => {
    const route = location.pathname;

    selectedAnchor = links.find(({dataset}) => route === dataset.route);
    selectedAnchor && moveSliderToAnchor(selectedAnchor);
};

export const initializeSlider = (): void => {
    navBarSlider = document.createElement('div');
    navBarSlider.classList.add('slider');

    updateSlider();

    navbar.appendChild(navBarSlider);
    navbar.addEventListener('click', navbarClickHandler);
};

window.addEventListener('resize', () => {
    if (navBarSlider) {
        moveSliderToAnchor(selectedAnchor);
    }
});
