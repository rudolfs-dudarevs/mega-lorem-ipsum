import JavaScriptTemplater from '../../utility/javaScriptTemplater.js';
import AddUserModal from '../addUserModal/addUserModal.js';
import Cta from '../cta/cta.js'

export default class IntroBlock extends HTMLDivElement {
    props;

    components = {
        AddUserModal,
        Cta
    }

    constructor(props) {
        super();
        this.props = props;
        this.$registerComponents(this.components)
        this.render();
    }

    handleAddCtaClick = () => {
        window.EventBus.dispatchEvent('open-modal-overlay', this.$addUserModal())
    }

    render() {
        this.$root({
                className: 'intro-block'
            },
            this.$div({
                    className: "intro-block__content"
                },
                this.$h1({
                        className: "intro-block__heading"
                    },
                    this.props.title
                ),
                this.$div({
                        className: "intro-block__description-container"
                    },
                    this.$p({
                            className: "intro-block__description"
                        },
                        this.props.description
                    ),
                    this.$cta({
                        className: "intro-block__add-user-cta",
                        text: "Add user",
                        type: "primary",
                        onClickAction: this.handleAddCtaClick
                    })
                )
            )
        );
    }
}

Object.assign(IntroBlock.prototype, JavaScriptTemplater)

customElements.define('intro-block', IntroBlock, {
    extends: 'div'
});