import {BaseComponent} from "../../shared/components/base/base.component.js";


export class PhonesDetailsComponent extends BaseComponent {
    constructor({element, onBackToCatalog}) {
        super({element});
        this._onBackToCatalog = onBackToCatalog;
        this._element.addEventListener("click", ({target: el}) => {
            let backBtn = el.closest('.back-btn');
            let smallImg = el.closest('.phone-thumb-img');
            if(backBtn) {
                this._onBackToCatalog();
            }
            if(smallImg) {
                this._changeImg(event, smallImg);
            }
        });
    }
    show(phone) {
        this._phone = phone;
        this._render();
        super.show();
    }

    _changeImg(event, el) {
        let imageUrl = el.getAttribute('src');
        let bigImage = this._element.querySelector('.phone');
        bigImage.setAttribute('src', imageUrl);
    }

    _render() {
        this._element.innerHTML = `
        <img class="phone" src="${this._phone.images[0]}">

        <button class="back-btn">Back</button>
        <button>Add to basket</button>
    
    
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