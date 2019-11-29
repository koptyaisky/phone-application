import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesServise} from "./phones.service.js";
import {PhonesDetailsComponent} from "./phone-details/phone-details.component.js";
import {BaseComponent} from "../shared/components/base/base.component.js";
import {CartComponent} from "./cart/cart.component.js";


export class PhonesComponent extends BaseComponent{
    constructor({element}) {
        super({element});
        this._render();
        this._initCatalog();
        this._initDetails();
        this._initCart();
    }

    _initCatalog() {
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            phones: PhonesServise.getAll(),
            onPhoneSelected: (phoneId) => {
                const phone = PhonesServise.getOneById(phoneId);
                this._catalog.hide();
                this._details.show(phone);
            },
            onAdd: (phoneId) => {
                this._cart.add(phoneId);
            }
        });
    }

    _initDetails() {
        this._details = new PhonesDetailsComponent({
            element: this._element.querySelector('.phones-details'),
            onBackToCatalog: () => {
                this._details.hide();
                this._catalog.show();
            },
            onAdd: (phoneId) => {
                this._cart.add(phoneId);
            }
        })
    }

    _initCart() {
        this._cart = new CartComponent({
            element: this._element.querySelector('.cart'),
        })
    }

    _render() {
        this._element.innerHTML = `
        <div class="row">
        
          <!--Sidebar-->
          <div class="col-md-2">
            <section>
              <p>
                Search:
                <input>
              </p>
        
              <p>
                Sort by:
                <select>
                  <option value="name">Alphabetical</option>
                  <option value="age">Newest</option>
                </select>
              </p>
            </section>
        
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