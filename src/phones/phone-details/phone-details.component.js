import {BaseComponent} from "../../shared/components/base/base.component.js";


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
        this._element.innerHTML = `
        <img class="phone" src="${this._phone.images[0]}">

        <button class="back-btn">Back</button>
        <button class="add">Add to basket</button>
    
    
        <h1>${this._phone.name}</h1>
    
        <p>${this._phone.description}</p>
    
        <ul class="phone-thumbs">
          ${this._phone.images.map((imagePhone) => `
            <li>
              <img class="phone-thumb-img" src="${imagePhone}">
            </li>
          `).join('')}
        </ul>
        `
    }

}