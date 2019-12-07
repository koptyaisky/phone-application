import {BaseComponent} from "../../shared/components/base/base.component";
import template from './cart.component.hbs';


export class CartComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this._phones = {};
        this.on('click', '.remove', (e) => {
            const {phoneId} = e.delegatedTarget.dataset;
            this._phones[phoneId] -= 1;

            if(this._phones[phoneId] === 0) {
                delete this._phones[phoneId];
            }
            this._render();
        });
    }

    add(phoneId) {
        if(!this._phones[phoneId]) {
            this._phones[phoneId] = 1;
            this._render();
            return;
        }
        this._phones[phoneId] += 1;
        this._render();
    }

    _render() {
        this._element.innerHTML = template({phones: this._phones});
    }
}