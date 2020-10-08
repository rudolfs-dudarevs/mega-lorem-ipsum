import JavaScriptTemplater from '../../utility/javaScriptTemplater.js';
import UserDataModal from '../userDataModal/userDataModal.js';
import Cta from '../cta/cta.js';


export default class UserDataTable extends HTMLDivElement {
    props;
    rowData;

    components = {
        Cta,
        UserDataModal
    }

    constructor(props) {
        super();
        this.props = props;
        this.$registerComponents(this.components);
        this.fetchRowData().then(data => {
            this.rowData = data.reverse();
            this.handleShareUrl();
            this.render();
        });
    }

    fetchRowData() {
        return fetch("http://localhost:3000/mega-lorem-ipsum/user-data")
            .then(res => res.json())
    }

    handleShareUrl() {
        if (window.location.hash) {
            const rowId = window.location.hash.slice(1);

            this.rowData.forEach(rowItem => {
                if (rowItem._id === rowId) {
                    window.EventBus.dispatchEvent('open-modal-overlay', this.$userDataModal({
                        rowItem
                    }))
                }
            })
        }
    }

    handleEditCtaClick(rowItem) {
        const dispatchEvent = () => {
            window.EventBus.dispatchEvent('open-modal-overlay', this.$userDataModal({
                rowItem
            }))
        }

        return dispatchEvent
    }

    handleUserDataUpdate = () => {
        this.fetchRowData().then(data => {
            window.EventBus.dispatchEvent('close-modal-overlay');
            this.rowData = data.reverse();
            this.render();
        });
    }

    $columnHeadings() {
        let columnHeadings = [];

        this.props.columnNames.forEach(columnName => {
            columnHeadings.push(
                this.$th({
                        className: 'user-data-table__heading'
                    },
                    columnName
                )
            )
        })

        return (
            this.$tr({
                    className: "user-data-table__row"
                },
                columnHeadings
            )
        )
    }

    $tableRows() {
        let tableRows = [];

        this.rowData.forEach((rowItem, index) => {
            tableRows.push(
                this.$tr({
                        className: 'user-data-table__row'
                    },
                    this.$td({
                            className: 'user-data-table__cell'
                        },
                        (index + 1).toString()
                    ),
                    this.$td({
                            className: 'user-data-table__cell'
                        },
                        rowItem.first_name
                    ),
                    this.$td({
                            className: 'user-data-table__cell'
                        },
                        rowItem.last_name
                    ),
                    this.$td({
                            className: 'user-data-table__cell'
                        },
                        rowItem.email
                    ),
                    this.$td({
                            className: 'user-data-table__cell'
                        },
                        rowItem.country
                    ),
                    this.$td({
                            className: 'user-data-table__cell'
                        },
                        rowItem.company_name
                    ),
                    this.$div({
                            className: 'user-data-table__cta-container'
                        },
                        this.$cta({
                            text: "Edit",
                            type: "primary",
                            onClickAction: this.handleEditCtaClick(rowItem),
                        })
                    )
                )
            )
        })

        return tableRows
    }

    render() {
        this.$root({
                className: "user-data-table-container"
            },
            this.$table({
                    className: "user-data-table"
                },
                this.$columnHeadings(),
                this.$tableRows()
            )
        )
    }

    connectedCallback() {
        window.EventBus.addEventListener('user-data-updated', this.handleUserDataUpdate);
    }

    disconnectedCallback() {
        window.EventBus.addEventListener('user-data-updated', this.handleUserDataUpdate);
    }
}

Object.assign(UserDataTable.prototype, JavaScriptTemplater)

customElements.define('user-data-table', UserDataTable, {
    extends: "div"
});