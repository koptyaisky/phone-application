import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component";
import {PhonesServise} from "./phones.service";
import {PhonesDetailsComponent} from "./phone-details/phone-details.component";
import {BaseComponent} from "../shared/components/base/base.component";
import {CartComponent} from "./cart/cart.component";
import {FilterComponent} from "./filter/filter.component";
import template from './phones.component.hbs';

export class PhonesComponent extends BaseComponent{
    constructor({element}) {
        super({element});
        this._render();
        this._initCatalog();
        this._initDetails();
        this._initCart();
        this._initFilter();
    }

    _initCatalog() {
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
        });
        this._showFilteredPhones();
        this._catalog
            .subscribe('phone-selected', async ({detail: phoneId}) => {
                try {
                    const phone = await PhonesServise.getOneById(phoneId);
                    this._catalog.hide();
                    this._details.show(phone);
                } catch(err) {
                    console.log(err);
                }
            })
            .subscribe('add-to-cart', ({detail: phoneId}) => {
                this._cart.add(phoneId);
            });
    }

    _initDetails() {
        this._details = new PhonesDetailsComponent({
            element: this._element.querySelector('.phones-details')
        });
        this._details
            .subscribe('back', () => {
                this._details.hide();
                this._showFilteredPhones();
            })
            .subscribe('add-to-cart', ({detail: phoneId}) => {
                this._cart.add(phoneId);
            });
    }

    _initCart() {
        this._cart = new CartComponent({
            element: this._element.querySelector('.cart'),
        });
    }

    _initFilter() {
        this._filter = new FilterComponent({
            element: this._element.querySelector('.filter')
        });
        this._filter
            .subscribe('search', ({detail: searchText}) => {
                this._searchText = searchText;
                this._showFilteredPhones();
            })
            .subscribe('sort', ({detail: sortBy}) => {
                this._sortBy = sortBy;
                this._showFilteredPhones();
            });
    }

    async _showFilteredPhones() {
        try {
            const phones = await PhonesServise.getAll({searchText: this._searchText, sortBy: this._sortBy});
            this._catalog.show(phones);
        } catch (err) {
            console.log(err);
        }
    }

    _render() {
        this._element.innerHTML = template();
    }
}