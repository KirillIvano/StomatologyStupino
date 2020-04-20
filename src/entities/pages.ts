import {PagePartConfig} from './parts';

export interface HandlePageLoad {
    (parent: HTMLElement, params?: string[]): ((() => void) | void | Promise<void> | Promise<() => void>);
}

export type Page = {
    content: string;
    parts?: PagePartConfig[];
    handleContentLoad?: HandlePageLoad;
}
