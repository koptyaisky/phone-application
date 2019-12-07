import {BaseComponent} from "../../shared/components/base/base.component";
import template from './phones-catalog.component.hbs';
import './phones-catalog.component.css';


export class PhonesCatalogComponent extends BaseComponent{
    constructor({element}) {
        super({element});

        this._phones = [];
        this
            .on('click', '.show-details', (e) => {
                const {phoneId} = e.delegatedTarget.dataset;
                this.emit('phone-selected', phoneId);
            })
            .on('click', '.add', (e) => {
                const {phoneId} = e.delegatedTarget.dataset;
                this.emit('add-to-cart', phoneId);
            });
    }

    show(phones) {
        this._phones = phones;
        this._render();
        super.show();
    }

    _render() {
        this._element.innerHTML = template({phone: this._phones});
    }
}