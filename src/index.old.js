const React = {
    createElement,
    Component
}

const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = ''
        return render(vnode, container)
    }
}

// make vitual DOM from jsx
function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

class Component {
    constructor(props = {}) {
        this.state = {}
        this.props = props
    }

    setState(stateChange) {
        // merge this.state and stateChange
        Object.assign(this.state, stateChange)
        renderComponent(this)
    }
}

// make vitual DOM to be the real DOM
function render(vnode, container) {
    // when vnode is string, render text node
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)
        return container.appendChild(textNode)
    }

    const element = document.createElement(vnode.tag)

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key]
            setAttribute(element, key, value) // set attribute
        })
    }

    // render children with recursion
    vnode.children.forEach(child => render(child, element))

    return container.appendChild(element) // append the elements onto the real DOM
}

// there are some special case for setting the attributes, we need a funciotn to handle this
function setAttribute(dom, name, value) {
    if (name === 'className') name = 'class';

    // if name is onSomething, onClick, setup as an event handler
    if (/on\w+/.test(name)) {
        name = name.toLowerCase()
        dom[name] = value || ''
    // if name is style, then it's a style object
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                // if the value is number like this, width: 20, it will add px to the end
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
            }
        }
    // for the rest attributes 
    } else {
        if (name in dom) {
            dom[name] = value || ''
        }
        if (value) {
            dom.setAttribute(name, value)
        } else {
            dom.removeAttribute(name)
        }
    }
}

// const home = (
//  <div>
//      <div>home</div>
//      <div>hello world!</div>
//      <h2>It is {new Date().toLocaleTimeString()}.</h2>
//  </div>
// );

// ReactDOM.render(
//  home,
//  document.getElementById('root')
// )