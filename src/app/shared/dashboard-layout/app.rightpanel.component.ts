import {Component} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppLayoutComponent } from '../app-layout/app-layout/app-layout.component';

@Component({
    selector: 'app-rightpanel',
    templateUrl: './app.rightpanel.component.html'
})
export class AppRightPanelComponent {

    constructor(public app: AppLayoutComponent) {}
}
