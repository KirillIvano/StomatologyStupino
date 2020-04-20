export const createDebouncer = time => {
    let isUsed = false;
    let presentTimeout = null;

    return {
        perform(func: Function) {
            if (isUsed) {
                clearTimeout(presentTimeout);
            } else {
                isUsed = true;
            }

            presentTimeout = setTimeout(() => {
                func();
                isUsed = false;
            }, time);
        },
    };
};
