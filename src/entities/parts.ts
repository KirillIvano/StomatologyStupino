// page-part - entity that appears once at the same time
// but shared between different pages
export interface HandlePartLoadType {
    (parent: HTMLElement, params?: object): (() => void) | void | Promise<void> | Promise<() => void>;
}

export type PagePart = {
    content: string;
    partName: string;
    handlePartLoad?: HandlePartLoadType;
}

export type PagePartConfig = {
    getPart: () => Promise<PagePart>;
}
