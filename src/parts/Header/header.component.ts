import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
    selector: 'app-header',
    template: '<button (click)="change(true)">+</button>',
    styles: ['h2, p {color: red;}'],
})
export class Header {
    @Output() onChanged = new EventEmitter<boolean>();

    change(isIncreased: boolean): void {
        this.onChanged.emit(isIncreased);
    }}
