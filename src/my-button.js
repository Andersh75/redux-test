import { PolymerElement, html } from '@polymer/polymer';
import '@vaadin/vaadin-button';

export class MyButton extends PolymerElement {
    constructor() {
        super();
        this.count = 0; 
    }

    static get properties() {
        return {
            count: {
                type: Number,
                readOnly: false,
                notify: false
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
    }

    static get template() {
        return html`
            <vaadin-button>{{count}}</vaadin-button>
        `;
    }
}




customElements.define('my-button', MyButton);