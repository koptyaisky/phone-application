import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {PhonesServise} from "./phones.service.js";


export class PhonesComponent {
    constructor({element}) {
        this._element = element;
        this._render();

        new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            phones: PhonesServise.getAll(),
            onPhoneSelected: (phoneId) => {
                console.log(phoneId);
            },
        });
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
        
            <section>
              <p>Shopping Cart</p>
              <ul>
                <li>Phone 1</li>
                <li>Phone 2</li>
                <li>Phone 3</li>
              </ul>
            </section>
          </div>
        
          <!--Main content-->
          <div class="col-md-10">
            <div class="phones-catalog"></div>
          </div>
        </div>
        `
    }
}