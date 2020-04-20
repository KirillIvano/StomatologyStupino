export const createCarousel = (parent: HTMLElement) => {
    const items = Array.from(parent.getElementsByClassName('carouselItem'));
    const itemsLen = items.length;

    let selectedItem = 0;

    const changeItem = (oldIndex: number, newIndex: number) => {
        items[oldIndex].classList.remove('active');
        items[newIndex].classList.add('active');
    };

    const handleMoveForward = (): void => {
        const newSelectedItem = (selectedItem + 1) % itemsLen;

        changeItem(selectedItem, newSelectedItem);

        selectedItem = newSelectedItem;
    };

    const handleMoveBack = (): void => {
        const newSelectedItem = selectedItem - 1 < 0 ? itemsLen - 1 : selectedItem - 1;

        changeItem(selectedItem, newSelectedItem);

        selectedItem = newSelectedItem;
    };

    items[0].classList.add('active');

    return {
        handleMoveBack,
        handleMoveForward,
    };
};
