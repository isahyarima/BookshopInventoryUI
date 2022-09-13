import {Component, OnInit} from '@angular/core';
import { MenuRestrictionService } from 'src/app/authentication/menu-restriction.service';
import { AppLayoutComponent } from '../app-layout/app-layout/app-layout.component';

@Component({
    selector: 'app-menu',
    template: `
		<ul class="layout-menu">
			<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppLayoutComponent,private menuGuardService: MenuRestrictionService) {}

    ngOnInit() {
        this.model = [
            {label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
            {
                label: 'Themes', icon: 'fa fa-fw fa-paint-brush', badge: '20',
                items: [
                    {
                        label: 'Solid',
                        icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Blue', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('blue', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('blue', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('blue', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Cyan', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('cyan', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('cyan', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('cyan', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Green', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('green', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('green', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('green', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Yellow', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('yellow', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('yellow', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('yellow', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Purple', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('purple', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('purple', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('purple', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Pink', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('pink', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('pink', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('pink', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('bluegrey', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('bluegrey', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('bluegrey', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Teal', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('teal', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('teal', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('teal', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Orange', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('orange', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('orange', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('orange', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Grey', icon: 'fa fa-fw fa-paint-brush',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('grey', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('grey', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('grey', 'gradient')
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Special',
                        icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Cappuccino', icon: 'fa fa-fw fa-picture-o',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('cappuccino', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('cappuccino', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('cappuccino', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Montreal', icon: 'fa fa-fw fa-picture-o',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('montreal', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('montreal', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('montreal', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Hollywood', icon: 'fa fa-fw fa-picture-o',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('hollywood', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('hollywood', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('hollywood', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Peak', icon: 'fa fa-fw fa-picture-o',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('peak', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('peak', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('peak', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Alive', icon: 'fa fa-fw fa-certificate',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('alive', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('alive', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('alive', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Emerald', icon: 'fa fa-fw fa-certificate',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('emerald', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('emerald', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('emerald', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Ash', icon: 'fa fa-fw fa-certificate',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('ash', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('ash', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('ash', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Noir', icon: 'fa fa-fw fa-certificate',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('noir', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('noir', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('noir', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Mantle', icon: 'fa fa-fw fa-certificate',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('mantle', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('mantle', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('mantle', 'gradient')
                                    }
                                ]
                            },
                            {
                                label: 'Predawn', icon: 'fa fa-fw fa-certificate',
                                items: [
                                    {
                                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                                        command: (event) => this.changeTheme('predawn', 'light')
                                    },
                                    {
                                        label: 'Dark', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('predawn', 'dark')
                                    },
                                    {
                                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                                        command: (event) => this.changeTheme('predawn', 'gradient')
                                    }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Settings', icon: 'fa fa-fw fa-sign-in',
                visible: this.menuGuardService.hideOrShow(['payment-verification',]),
                items: [
                    {
                        label: 'Author', icon: 'fa fa-fw fa-user',
                        routerLink: ['/author'],
                        visible: this.menuGuardService.hideOrShow(['payment-verification'])
                    },
                    {
                        label: 'Book Category', icon: 'fa fa-fw fa-user',
                        routerLink: ['/category'],
                        visible: this.menuGuardService.hideOrShow(['payment-verification'])
                    },
                    {
                        label: 'Publisher', icon: 'fa fa-fw fa-user',
                        routerLink: ['/publisher'],
                        visible: this.menuGuardService.hideOrShow(['payment-verification'])
                    },
                    {
                        label: 'Supplier', icon: 'fa fa-fw fa-user',
                        routerLink: ['/supplier'],
                        visible: this.menuGuardService.hideOrShow(['payment-verification'])
                    },
                    {
                        label: 'Store', icon: 'fa fa-fw fa-user',
                        routerLink: ['/store'],
                        visible: this.menuGuardService.hideOrShow(['payment-verification'])
                    },
                    {
                        label: 'Bank', icon: 'fa fa-fw fa-user',
                        routerLink: ['/bank'],
                        visible: this.menuGuardService.hideOrShow(['payment-verification'])
                    }
                ]
            },
            {
                label: 'Book', icon: 'fa fa-fw fa-user',
                routerLink: ['/book'],
                visible: this.menuGuardService.hideOrShow(['payment-verification'])
            },
            {
                label: 'Purchase Order', icon: 'fa fa-fw fa-user',
                routerLink: ['/purchase-order'],
                visible: this.menuGuardService.hideOrShow(['payment-verification'])
            },
            {
                label: 'Purchase Register', icon: 'fa fa-fw fa-user',
                routerLink: ['/purchase-register'],
                visible: this.menuGuardService.hideOrShow(['payment-verification'])
            },
        ];
    }

    changeTheme(theme: string, scheme: string) {
        this.changeStyleSheetsColor('theme-css', 'theme-' + theme + '.css');
        this.changeStyleSheetsColor('layout-css', 'layout-' + theme + '.css');

        this.app.menuMode = scheme;
    }

    changeStyleSheetsColor(id, value) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }
}
