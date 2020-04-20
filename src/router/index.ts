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

    private links: [HTMLLinkElement, () => void][] = [];

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

                    const partContainer = this.parent.querySelector(`[data-part="${partName}"]`);
                    if (!partContainer) return;
                    partContainer.outerHTML = content;

                    if (handlePartLoad) {
                        const handlePartUnload = await handlePartLoad(this.parent, params);

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
    // create links for the rest of the document
    private createInitialLinks(): void {
        const commonLinks = Array.prototype.slice.call(
            document.getElementsByClassName('redirect-link'),
        ) as HTMLLinkElement[];

        commonLinks.forEach(
            link => link.addEventListener('click', () => this.navigate(link.dataset.route)),
        );
    }
    // create links for routed part
    private updateLinks(): void {
        const links = Array.prototype.slice.call(
            this.parent.getElementsByClassName('redirect-link'),
        ) as HTMLLinkElement[];

        this.links = links.map(
            link => {
                const clickHandler = () => this.navigate(link.dataset.route);

                link.addEventListener('click', clickHandler);

                return [link, clickHandler];
            },
        );
    }
    // remove links for routed part
    private removeLinks(): void {
        this.links.forEach(([link, handler]) => link.removeEventListener('click', handler));

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
            this.handleContentUnload = await page.handleContentLoad(this.parent, params) || null;
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
        this.handlePageClose && this.handlePageClose();

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

    async navigate(path): Promise<void> {
        if (!this.isInitialized) throw new Error('Router is not initialized');
        if (this.currentPath === path) return;

        history.pushState(null, null, path);

        await this.update(path);
    }
}

export const router = new Router();
