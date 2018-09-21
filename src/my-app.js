import { PolymerElement, html } from '@polymer/polymer';
import { connect } from 'pwa-helpers/connect-mixin.js';
import './my-button.js';
import { persistentStore } from 'redux-pouchdb';
import { persistentReducer } from 'redux-pouchdb';




const db = new PouchDB(`redux${user}`);     

var couchDB = new PouchDB(`https://plex:1111111111@www.sitemakr.se/couchdb/redux${user}`);

//couchDB.info().then(info => console.log(info));



db
.replicate
.from(couchDB)
.on('complete', (info) => {
    // console.log('info');
    // console.log(info);    
    db.sync(couchDB, { live: true, retry: true })
    let myApp = document.createElement('my-app');
    document.body.appendChild(myApp);
})
.on('error', (info) => {
    console.log('error');
    console.log(info);
})
.on('change', (info) => {
    console.log('change');
    console.log(info);
});









function counter(state, action) {
    switch (action.type) {
    case 'ONE_INCREMENT':
        return {...state, one: state.one + 1}
    case 'TWO_INCREMENT':
        return {...state, two: state.two + 1}
    default:
        return state
    }
}

let initialState = {
    one: 74,
    two: 47
}

var logger = reduxLogger.logger;


const applyMiddlewares = Redux.applyMiddleware(
    logger
  );

const createStoreWithMiddleware = Redux.compose(
    applyMiddlewares,
    persistentStore(db)
)(Redux.createStore);


const store = createStoreWithMiddleware(persistentReducer(counter), initialState);





export class MyApp extends connect(store)(PolymerElement) {
    constructor() {
        super();
    }

    static get properties() {
        return {
            countOne: {
                type: Number,
                readOnly: false,
                notify: true
            },
            countTwo: {
                type: Number,
                readOnly: false,
                notify: true
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
    }

    _stateChanged(state) {
        console.log('stateChanged');
        console.log(state);
        

        this.countOne = state.one;
        this.countTwo = state.two;
    }

    static get template() {
        return html`
            <my-button on-click="dispatchOne" count="{{countOne}}"></my-button>
            <my-button on-click="dispatchTwo" count="{{countTwo}}"></my-button>
        `;
    }

    dispatchOne() {
        store.dispatch({ type: 'ONE_INCREMENT' })
    }

    dispatchTwo() {
        store.dispatch({ type: 'TWO_INCREMENT' })
    }
}




customElements.define('my-app', MyApp);