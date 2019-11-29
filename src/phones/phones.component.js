import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesServise} from "./phones.service.js";
import {PhonesDetailsComponent} from "./phone-details/phone-details.component.js";
import {BaseComponent} from "../shared/components/base/base.component.js";
import {CartComponent} from "./cart/cart.component.js";
import {FilterComponent} from "./filter/filter.component.js";


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
            .subscribe('phone-selected', ({detail: phoneId}) => {
                const phone = PhonesServise.getOneById(phoneId);
                this._catalog.hide();
                this._details.show(phone);
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

    _showFilteredPhones() {
        const phones = PhonesServise.getAll({searchText: this._searchText, sortBy: this._sortBy});
        this._catalog.show(phones);
    }

    _render() {
        this._element.innerHTML = `
            <div class="row">
                <!--Sidebar-->
                <div class="col-md-2">
                    <section class="filter"></section>
                    <section class="cart"></section>
                </div>
                
                <!--Main content-->
                <div class="col-md-10">
                    <div class="phones-catalog"></div>
                    <div class="phones-details"></div>
                </div>
            </div>
        `
    }
}