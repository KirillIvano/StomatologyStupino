import {RouteConfig} from '@/entities/router';
import {Page} from '@/entities/pages';
import {PagePartConfig} from '@/entities/parts';

const defaltPageConfig: RouteConfig = {
    path: '/',
    getPage: () => Promise.resolve({
        content: 'Такой страницы у нас нет :(',
    }),
};

class Router {
    private parent: HTMLElement;
    private routes: RouteConfig[];

    private isInitialized = false;

    private links: HTMLAnchorElement[] = [];

    private currentPath = null;
    private handleContentUnload: undefined | (() => void) = null;

    initialize(parent: HTMLElement, routes: RouteConfig[]): void {
        this.parent = parent;
        this.routes = routes;
        this.isInitialized = true;

        this.createInitialLinks();
        this.navigate(location.pathname);
        this.listenUpdates();
    }

    // draw page parts
    private async executeParts(partsConfigs: PagePartConfig[], params?: object) {
        return Promise.all(
            partsConfigs.map(
                async partConf => {
                    const part = await partConf.getPart();

                    const {partName, content, handlePartLoad} = part;

                    const partContainer = this.parent.querySelector(`[data-part="${partName}"]`) as HTMLElement;
                    if (!partContainer) return;

                    partContainer.innerHTML = content;

                    if (handlePartLoad) {
                        const handlePartUnload = await handlePartLoad(partContainer, params);

                        if (handlePartUnload) {
                            this.handleContentUnload = () => {
                                handlePartUnload();
                                this.handleContentUnload();
                            };
                        }
                    }
                },
            ),
        );
    }

    private handleLinkClick = (e: MouseEvent) => {
        e.preventDefault();
        this.navigate((e.currentTarget as HTMLAnchorElement).href);
    };


    private handleLinkEnterPress = (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();
        this.navigate((e.currentTarget as HTMLAnchorElement).href);
    }

    private enhanceLink = (link: HTMLAnchorElement) => {
        link.addEventListener('click', this.handleLinkClick);
        link.addEventListener('keyup', this.handleLinkEnterPress);
        link.tabIndex = 0;

        return link;
    }

    // create links for the rest of the document
    private createInitialLinks(): void {
        const commonLinks = Array.prototype.slice.call(
            document.getElementsByClassName('redirect-link'),
        ) as HTMLAnchorElement[];

        commonLinks.forEach(this.enhanceLink);
    }
    // create links for routed part
    private updateLinks(): void {
        const links = Array.prototype.slice.call(
            this.parent.getElementsByClassName('redirect-link'),
        ) as HTMLAnchorElement[];

        this.links = links.map(this.enhanceLink);
    }

    // remove links for routed part
    private removeLinks(): void {
        this.links.forEach(link => {
            link.removeEventListener('click', this.handleLinkClick);
            link.removeEventListener('keyup', this.handleLinkEnterPress);
        });

        this.links = [];
    }

    private renderContent(content): void {
        this.parent.innerHTML = content;
    }

    private handlePageClose(): void {
        if (this.handleContentUnload) {
            this.handleContentUnload();
            this.handleContentUnload = null;
        }

        this.removeLinks();
    }

    private async handlePageOpen(page: Page, params?: string[]) {
        if (page.handleContentLoad) {
            this.handleContentUnload = (await page.handleContentLoad(this.parent, params)) || null;
        }

        page.parts && await this.executeParts(page.parts, params);

        this.updateLinks();
    }

    private listenUpdates(): void {
        const presentLocation = location.pathname;
        if (presentLocation !== this.currentPath) {
            this.update(presentLocation);
        }

        setTimeout(() => this.listenUpdates(), 50);
    }

    private async update(path: string): Promise<void> {
        if (!this.isInitialized) throw new Error('Router is not initialized');

        this.currentPath = path;
        this.handlePageClose();

        const routeConfig = this.routes.find(
            route => route.path instanceof RegExp ?
                route.path.test(path) :
                route.path === path,
        ) || defaltPageConfig;

        const page = await routeConfig.getPage();
        this.renderContent(page.content);

        if (routeConfig.path instanceof RegExp) {
            const configPath = routeConfig.path;
            const params = path.match(configPath).slice(1);

            this.handlePageOpen(page, params);
        } else {
            this.handlePageOpen(page);
        }
    }

    async navigate(path: string): Promise<void> {
        if (!this.isInitialized) throw new Error('Router is not initialized');
        if (this.currentPath === path) return;

        history.pushState(null, null, path);
    }
}

export const router = new Router();
