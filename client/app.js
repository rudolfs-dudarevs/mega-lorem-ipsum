import EventBus from './utility/eventBus.js';
import JavaScriptTemplater from './utility/javaScriptTemplater.js';
import UserDataTable from './components/userDataTable/userDataTable.js';
import ModalOverlay from './components/modalOverlay/modalOverlay.js';
import IntroBlock from './components/introBlock/introBlock.js';

export default class App extends HTMLElement {
    components = {
        IntroBlock,
        UserDataTable,
        ModalOverlay
    }

    constructor() {
        super();
        this.$registerComponents(this.components);
        this.render();
    }

    openModalOverlay = (event) => {
        document.body.classList.add('no-scroll');
        this.appendChild(
            this.$modalOverlay({
                modalComponent: event.detail
            })
        )
    }

    render() {
        this.$root({
                className: "app-root"
            },
            this.$introBlock({
                title: "Mega Lorem Ipsum",
                description: "Add users, update existing users. Even remove them - knock yourself out!"
            }),
            this.$userDataTable({
                columnNames: [
                    "",
                    "First name",
                    "Last name",
                    "Email",
                    "Country",
                    "Company"
                ]
            })
        );
    }

    connectedCallback() {
        window.EventBus.addEventListener('open-modal-overlay', this.openModalOverlay);
    }
}

Object.assign(App.prototype, JavaScriptTemplater);

customElements.define('app-root', App);