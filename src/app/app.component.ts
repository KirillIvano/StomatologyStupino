import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div>{{clicks}}</div>
        <app-header (onChanged)="onChanged($event)"></app-header>
    `,
})
export class AppComponent {
    clicks = 0;
    onChanged(isIncreased: boolean): void {
        isIncreased ? this.clicks++ : this.clicks--;
    }
}
