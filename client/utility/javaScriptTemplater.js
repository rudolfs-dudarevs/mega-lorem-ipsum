const JavaScriptTemplater = {
    $root(...args) {
        this.innerHTML = '';

        return this.createElement(this, ...args)
    },

    $div(...args) {
        return this.createElement('div', ...args)
    },

    $h1(...args) {
        return this.createElement('h1', ...args)
    },

    $h2(...args) {
        return this.createElement('h2', ...args)
    },

    $h3(...args) {
        return this.createElement('h3', ...args)
    },

    $p(...args) {
        return this.createElement('p', ...args);
    },

    $a(...args) {
        return this.createElement('a', ...args)
    },

    $span(...args) {
        return this.createElement('span', ...args)
    },

    $form(...args) {
        return this.createElement('form', ...args)
    },

    $label(...args) {
        return this.createElement('label', ...args)
    },

    $input(...args) {
        return this.createElement('input', ...args)
    },

    $button(...args) {
        return this.createElement('button', ...args)
    },

    $table(...args) {
        return this.createElement('table', ...args)
    },

    $tr(...args) {
        return this.createElement('tr', ...args)
    },

    $th(...args) {
        return this.createElement('th', ...args)
    },

    $td(...args) {
        return this.createElement('td', ...args)
    },

    $registerComponents(components) {
        const methodName = (componentName) => {
            return "$" + componentName.charAt(0).toLowerCase() + componentName.slice(1);
        }

        Object.keys(components).forEach(key => {
            this[methodName(key)] = (props, ...args) => {
                const htmlEl = new components[key](props);

                return this.createElement(htmlEl, ...args)
            }
        })
    },

    appendTextNode(el, text) {
        const textNode = document.createTextNode(text);
        el.appendChild(textNode);
    },

    appendNestedItem(el, nestedEl) {
        nestedEl.forEach((item) => {
            switch (true) {
                case Array.isArray(item):
                    this.appendNestedItem(el, item);
                    break;
                case item instanceof window.Element:
                    el.appendChild(item);
                    break;
                case typeof item === 'string':
                    this.appendTextNode(el, item);
                    break;
                default:
                    break;
            }
        });
    },

    createElement(htmlEl, unsortedItem, ...nestedEl) {
        const el = typeof htmlEl === 'string' ? document.createElement(htmlEl) : htmlEl;

        switch (true) {
            case Array.isArray(unsortedItem):
                this.appendNestedEl(el, unsortedItem)
                break;
            case unsortedItem instanceof window.Element:
                el.appendChild(unsortedItem);
                break;
            case typeof unsortedItem === 'string':
                this.appendTextNode(el, unsortedItem)
                break;
            case typeof unsortedItem === 'object':
                Object.keys(unsortedItem).forEach((key) => {
                    const value = unsortedItem[key];

                    if (value) {
                        el[key] = value;
                    }
                });
                break;
            default:
                break;
        }

        if (nestedEl) {
            this.appendNestedItem(el, nestedEl);
        }

        return el
    }
}

export default JavaScriptTemplater