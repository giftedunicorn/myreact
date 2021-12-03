import Component from '../react/component'
import { setAttribute } from './dom'

function createComponent(component, props) {
    let instance;
    // todo, which one is funciton and which one is class?
    if (component.prototype && component.prototype.render) {
        instance = new component(props);
    } else {
        instance = new Component(props);
        instance.constructor = component;
        instance.render = function() {
            return this.constructor(props);
        }
    }

    return instance;
}

function unmountComponent(component) {
    if (component.componentWillUnmount) component.componentWillUnmount();
    removeNode(component.base);
}

function setComponentProps(component, props) {
    // if view initializing, componentWillMount is called
    if (!component.base) {
        if (component.componentWillMount) component.componentWillMount();
    } else if (component.componentWillReceiveProps) {
        // if view updating, componentWillReceiveProps is called, pass props
        component.componentWillReceiveProps(props);
    }

    component.props = props;
    renderComponent(component);
}

export function renderComponent(component) {
    let base;
    const renderer = component.render();

    // if view updating, componentWillUpdate is called
    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate();
    }

    base = _render(renderer);

    // if view updating, componentDidUpdate is called
    if (component.base) {
        if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
        // if view initializing, componentDidMount is called
        component.componentDidMount();
    }

    // replace the view
    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }

    component.base = base;
    base._component = component;
}

// make vitual DOM to be the real DOM
function _render(vnode) {
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    // when vnode is number, convert to string
    if (typeof vnode === 'number') vnode = String(vnode);

    // when vnode is string, render text node
    if (typeof vnode === 'string') {
        let textNode = document.createTextNode(vnode);
        return textNode;
    }

    // handle function components
    if (typeof vnode.tag === 'function') {
        const component = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }

    const dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            setAttribute(dom, key, value);
        });
    }

    if (vnode.children) {
        vnode.children.forEach(child => render(child, dom));
    }

    return dom;
}

export function render(vnode, container) {
    // console.log(vnode)
    return container.appendChild(_render(vnode));
}
