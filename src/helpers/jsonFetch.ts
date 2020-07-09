export type DataType<T extends object> = {
    data: T;
    status: number;
    ok: true;
} | {
    error: string;
    status: number;
    ok: false;
}

export const jsonFetch = async <T extends object,>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<DataType<T>> => {
    let body: {data: T} | {error: string};
    let ok: boolean, status: number;

    try {
        const res = await fetch(url, options);

        ok = res.ok;
        status = res.status;

        body = await res.json();
    } catch(e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return {error: 'Unexpected error', ok: false, status: 500};
    }

    if (ok === false) {
        return {
            error: (body as {error: string}).error,
            ok,
            status,
        };
    }

    return {
        data: (body as {data: T}).data,
        ok,
        status,
    };
};
