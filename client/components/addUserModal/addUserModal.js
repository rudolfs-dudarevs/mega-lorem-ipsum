import Cta from '../cta/cta.js'
import JavaScriptTemplater from '../../utility/javaScriptTemplater.js';

export default class AddUserModal extends HTMLDivElement {
    props;

    components = {
        Cta
    }

    constructor(props) {
        super();
        this.props = props;
        this.$registerComponents(this.components);
        this.render();
    }


    handleAdd = (event) => {
        event.preventDefault()

        const formEl = event.target;

        const formDataToJson = (form) => {
            var dataObj = {};
            var formData = new FormData(form);

            for (let key of formData.keys()) {
                dataObj[key] = formData.get(key);
            }

            return JSON.stringify(dataObj);
        };

        fetch('/mega-lorem-ipsum/user-data', {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                method: 'POST',
                body: formDataToJson(formEl)
            })
            .then(() => {
                window.EventBus.dispatchEvent('user-data-updated')
            })
    }

    closeOverlay() {
        window.EventBus.dispatchEvent('close-modal-overlay')
    }

    $inputField(input) {
        return (
            this.$div({
                    className: 'add-user-modal__input-container'
                },
                this.$label({
                        className: 'add-user-modal__label'
                    },
                    input.label
                ),
                this.$input({
                    className: 'add-user-modal__value-input',
                    name: input.name,
                    type: input.type,
                    value: null,
                    required: input.isRequired
                })
            )
        )
    }

    $userDataInput() {
        return (
            this.$form({
                    className: 'add-user-modal__form',
                    onsubmit: this.handleAdd
                },
                this.$inputField({
                    label: "First name",
                    name: "first_name",
                    type: "text",
                    isRequired: true
                }),
                this.$inputField({
                    label: "Last name",
                    name: "last_name",
                    type: "text",
                    isRequired: true
                }),
                this.$inputField({
                    label: "Email",
                    name: "email",
                    type: "email",
                    isRequired: true
                }),
                this.$inputField({
                    label: "Country",
                    name: "country",
                    type: "text",
                    isRequired: true
                }),
                this.$inputField({
                    label: "Company",
                    name: "company_name",
                    type: "text",
                    isRequired: false
                }),
                this.$div({
                        className: "add-user-modal__cta-container"
                    },
                    this.$cta({
                        type: "primary",
                        text: "Submit"
                    }))
            )
        )
    }

    render() {
        this.$root({
                className: 'add-user-modal'
            },
            this.$cta({
                type: "close",
                onClickAction: this.closeOverlay
            }),
            this.$div({
                    className: 'add-user-modal__content'
                },
                this.$userDataInput()
            )
        )
    }
}

Object.assign(AddUserModal.prototype, JavaScriptTemplater)

customElements.define('add-user-modal', AddUserModal, {
    extends: 'div'
});