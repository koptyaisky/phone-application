import {BaseComponent} from "../../shared/components/base/base.component";
import template from './filter.component.hbs';


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
        this._element.innerHTML = template();
    }
}