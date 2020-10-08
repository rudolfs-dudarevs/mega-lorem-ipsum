import JavaScriptTemplater from '../../utility/javaScriptTemplater.js';
import UserDataModal from '../userDataModal/userDataModal.js';

export default class ModalOverlay extends HTMLDivElement {
    props;

    components = {
        UserDataModal
    }

    constructor(props) {
        super();
        this.props = props;
        this.$registerComponents(this.components);
        this.render();
    }

    handleKeyDown = (event) => {
        const isNotInput = !(event.target instanceof HTMLInputElement);

        if ((event.key == "x" && isNotInput) || event.key == "Escape") {
            this.closeOverlay();
        }
    }

    handleClick = (event) => {
        if (event.target === this) {
            this.closeOverlay();
        }
    }

    closeOverlay = async (event) => {
        document.body.classList.remove('no-scroll');

        this.animate([{
                opacity: '1'
            },
            {
                opacity: '0'
            }
        ], {
            duration: 100,
            iterations: 1
        }).onfinish = () => this.parentNode.removeChild(this);
    }

    render() {
        this.$root({
                className: 'modal-overlay'
            },
            this.$div({
                    className: 'modal-overlay__modal-container'
                },
                this.props.modalComponent
            )
        );
    }

    connectedCallback() {
        this.animate([{
                opacity: '0'
            },
            {
                opacity: '1'
            }
        ], {
            duration: 100,
            iterations: 1
        });

        this.props.modalComponent.animate([{
                height: '0'
            },
            {
                height: '100%'
            }
        ], {
            duration: 200,
            iterations: 1
        });

        this.addEventListener('click', this.handleClick);
        document.addEventListener('keydown', this.handleKeyDown);
        window.EventBus.addEventListener('close-modal-overlay', this.closeOverlay);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
        document.removeEventListener('keydown', this.handleKeyDown);
        window.EventBus.removeEventListener('close-modal-overlay', this.closeOverlay);
    }
}

Object.assign(ModalOverlay.prototype, JavaScriptTemplater);

customElements.define('modal-overlay', ModalOverlay, {
    extends: 'div'
});