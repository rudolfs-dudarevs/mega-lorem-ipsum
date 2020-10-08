import JavaScriptTemplater from '../../utility/javaScriptTemplater.js'


export default class Cta extends HTMLButtonElement {
    props;

    constructor(props) {
        super();
        this.props = props;
        this.render();
    }

    render() {
        this.$root({
                className: `cta cta--${this.props.type}`,
                type: this.props.type
            },
            this.$span({
                    classname: 'cta__content'
                },
                this.props.text,
                this.props.svgIcon
            )
        )
    }

    connectedCallback() {
        this.addEventListener('click', this.props.onClickAction);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.props.onClickAction);
    }
}

Object.assign(Cta.prototype, JavaScriptTemplater)

customElements.define('custom-cta', Cta, {
    extends: 'button'
});