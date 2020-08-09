type ScrollConfig = {
    duration: number;

    offset?: number;
    targetId?: string;
}

export const smoothScroll = ({
    duration,
    offset,
    targetId,
}: ScrollConfig) => {
    if (!offset && !targetId) throw new Error('Нет информации о том, куда скроллить, передайте targetId или offset');

    let startTime = 0;
    const initialWindowPosition = pageYOffset;

    const targetOffset = offset ?
        offset :
        document.getElementById(targetId).getBoundingClientRect().top;

    const updateWindowPosition = (progress: number) => {
        window.scrollTo(0, initialWindowPosition + progress * targetOffset);
    };

    const tick = (currentTime: number)  => {
        const currentDuration = currentTime - startTime;

        if (currentDuration > duration) return;

        const progress = currentDuration / duration;
        updateWindowPosition(progress);

        requestAnimationFrame(tick);
    };

    requestAnimationFrame(time => {
        startTime = time;

        tick(time);
    });
};
