import {BaseComponent} from "../../shared/components/base/base.component";
import template from './phone-details.component.hbs';
import './phone-details.component.css';


export class PhonesDetailsComponent extends BaseComponent {
    constructor({element}) {
        super({element});

        this
            .on('click', '.phone-thumb-img', (e) => {
                this._changeImg(e.delegatedTarget);
            })
            .on('click', '.back-btn', (e) => {
                this.emit('back');
            })
            .on('click', '.add', (e) => {
                this.emit('add-to-cart', this._phone.id);
            });
    }
    show(phone) {
        this._phone = phone;
        this._render();
        super.show();
    }

    _changeImg(el) {
        let imageUrl = el.src;
        let bigImage = this._element.querySelector('.phone');
        bigImage.src = imageUrl;
    }

    _render() {
        this._element.innerHTML = template({phone: this._phone});
    }

}