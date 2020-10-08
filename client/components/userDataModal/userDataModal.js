import Cta from '../cta/cta.js'
import JavaScriptTemplater from '../../utility/javaScriptTemplater.js';

export default class UserDataModal extends HTMLDivElement {
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

    static get observedAttributes() {
        return ["edit"];
    }

    get isEditMode() {
        return this.hasAttribute("edit")
    }

    set isEditMode(isEditMode) {
        if (isEditMode) {
            this.setAttribute("edit", "")
        } else {
            this.removeAttribute("edit")
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    toggleEditState = () => {
        this.isEditMode = !this.isEditMode;
    }

    handleDelete = () => {
        const rowId = this.props.rowItem._id;

        fetch('/mega-lorem-ipsum/user-data?_id=' + rowId, {
                method: 'DELETE',
            })
            .then(() => {
                window.EventBus.dispatchEvent('user-data-updated')
            })
    }

    handleUpdate = (event) => {
        event.preventDefault()

        const rowId = this.props.rowItem._id;
        const formEl = event.target;

        const formDataToJson = (form) => {
            var dataObj = {};
            var formData = new FormData(form);

            for (let key of formData.keys()) {
                dataObj[key] = formData.get(key);
            }

            return JSON.stringify(dataObj);
        };

        fetch('/mega-lorem-ipsum/user-data?_id=' + rowId, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                method: 'PUT',
                body: formDataToJson(formEl)
            })
            .then(() => {
                window.EventBus.dispatchEvent('user-data-updated')
            })
    }

    closeOverlay() {
        window.EventBus.dispatchEvent('close-modal-overlay')
    }

    $dispalyField(data) {
        return (
            this.$div({
                    className: 'user-data-modal__input-container'
                },
                this.$label({
                    className: 'user-data-modal__label'
                }, data.label),
                this.$p({
                    className: 'user-data-modal__value-display'
                }, data.value)
            )
        )
    }

    $userDataDisplay() {
        return (
            this.$div({
                    className: `user-data-modal__data-display ${this.isEditMode}`
                },
                this.$dispalyField({
                    label: "First name",
                    value: this.props.rowItem.first_name
                }),
                this.$dispalyField({
                    label: "Last name",
                    value: this.props.rowItem.last_name
                }),
                this.$dispalyField({
                    label: "Email",
                    value: this.props.rowItem.email
                }),
                this.$dispalyField({
                    label: "Country",
                    value: this.props.rowItem.country
                }),
                this.props.rowItem.company_name && this.$dispalyField({
                    label: "Company",
                    value: this.props.rowItem.company_name
                }),
                this.$div({
                        className: "user-data-modal__cta-container"
                    },
                    this.$cta({
                        type: "primary",
                        text: "Edit",
                        onClickAction: this.toggleEditState
                    }),
                    this.$cta({
                        type: "secondary",
                        text: "Delete",
                        onClickAction: this.handleDelete
                    }),
                )
            )
        )
    }

    $inputField(input) {
        return (
            this.$div({
                    className: 'user-data-modal__input-container'
                },
                this.$label({
                        className: 'user-data-modal__label'
                    },
                    input.label
                ),
                this.$input({
                    className: 'user-data-modal__value-input',
                    name: input.name,
                    type: input.type,
                    value: input.value,
                    required: input.isRequired
                })
            )
        )
    }

    $userDataInput() {
        return (
            this.$form({
                    id: this.props.rowItem._id,
                    className: 'user-data-modal__form',
                    onsubmit: this.handleUpdate
                },
                this.$inputField({
                    label: "First name",
                    name: "first_name",
                    type: "text",
                    value: this.props.rowItem.first_name,
                    isRequired: true
                }),
                this.$inputField({
                    label: "Last name",
                    name: "last_name",
                    type: "text",
                    value: this.props.rowItem.last_name,
                    isRequired: true
                }),
                this.$inputField({
                    label: "Email",
                    name: "email",
                    type: "email",
                    value: this.props.rowItem.email,
                    isRequired: true
                }),
                this.$inputField({
                    label: "Country",
                    name: "country",
                    type: "text",
                    value: this.props.rowItem.country,
                    isRequired: true
                }),
                this.$inputField({
                    label: "Company",
                    name: "company_name",
                    type: "text",
                    value: this.props.rowItem.company_name,
                    isRequired: false
                }),
                this.$div({
                        className: "user-data-modal__cta-container"
                    },
                    this.$cta({
                        type: "primary",
                        text: "Save"
                    }),
                    this.$cta({
                        type: "secondary",
                        text: "Cancel",
                        onClickAction: this.toggleEditState
                    })
                )
            )
        )
    }

    $modalContent() {
        return this.isEditMode ? this.$userDataInput() : this.$userDataDisplay()
    }

    render() {
        this.$root({
                className: 'user-data-modal'
            },
            this.$cta({
                type: "close",
                onClickAction: this.closeOverlay
            }),
            this.$div({
                    className: 'user-data-modal__content'
                },
                this.$modalContent(),
                this.$p({
                        className: "user-data-modal__modal-url"
                    },
                    `${window.location.origin}/#${this.props.rowItem._id}`
                )
            )
        )
    }
}

Object.assign(UserDataModal.prototype, JavaScriptTemplater)

customElements.define('user-data-modal', UserDataModal, {
    extends: 'div'
});