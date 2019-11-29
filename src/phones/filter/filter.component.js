import {BaseComponent} from "../../shared/components/base/base.component.js";


export class FilterComponent extends BaseComponent {
    constructor({element}) {
        super({element});
        this._render();

        this
            .on('input', '.search', (e) => {
                this.emit('search', e.delegatedTarget.value);
            })
            .on('change', '.sort', (e) => {
               this.emit('sort', e.delegatedTarget.value);
            });
    }

    _render() {
        this._element.innerHTML = `
            <p>
                Search:
                <input class="search">
            </p>
        
            <p>
            Sort by:
            <select class="sort">
                <option value="age">Newest</option>
                <option value="name">Alphabetical</option>
            </select>
            </p>
        `
    }
}