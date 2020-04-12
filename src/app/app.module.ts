import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {Header} from '@/parts/Header/header.component';


@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [AppComponent, Header],
    bootstrap: [AppComponent],
})
export class AppModule{
}
