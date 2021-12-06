import { Componet } from '../react'
import { setAttribute } from './dom'

/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @param {HTMLElement} container 容器
 * @returns {HTMLElement} 更新后的DOM
 */

export function diff(dom, vnode, container) {
    const ret = diffNode(dom, vnode)

    if (container && ret.parentNode !== container) {
        // call when initial rendering
        container.appendChild(ret)
    }

    return ret
}

function diffNode(dom, vnode) {

    let out = dom

    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

    if (typeof vnode === 'number') vnode = String( vnode );

    if (typeof vnode === 'string') {
        if (dom && dom.nodeType === 3) {
            if (dom.textContent !== vnode) {
                dom.textContent = vnode;
            }
        } else {
            out = document.createTextNode(vnode)
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(out, dom)
            }
        }

        return out
    }

    if (typeof vnode.tag === 'function') {
        return diffComponent(dom, vnode)
    }

    // if the real dom is not existed, this is new created virtual node
    if (!dom || !isSameNodeType(dom, vnode)) {
        out = document.createElement(vnode.tag)
        if (dom) {
            [...dom.childNodes].map(out.appendChild)
            if (dom.parentNode) {
                dom.parentNode.replaceChild(out, dom)
            }
        }
    }

    if (vnode.children && vnode.children.length > 0 || (out.childNodes && out.childNodes.length > 0)) {
        diffChildren(out, vnode.children)
    }

    diffAttributes(out, vnode)

    return out
}

function diffAttributes(dom, vnode) {
    const old = {} // real dom attrs
    const attrs = vnode.attrs // vdom attrs

    // get real dom attrs
    for (let i = 0; i < dom.attributes.length; i++) {
        const attr = dom.attributes[i]
        old[attr.name] = attr.value
    }

    // if the old attr is not in new attr, set as undefined and remove
    for (let name in old) {
        if (!(name in attrs)) {
            setAttribute(dom, name, undefined)
        }
    }

    // if the new attr is updated
    for (let name in attrs) {
        if (old[name] !== attrs[name]) {
            setAttribute(dom, name, attrs[name])
        }
    }
}

function isSameNodeType(dom, vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return dom.nodeType === 3
    }

    if (typeof vnode.tag === 'string') {
        return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase()
    }

    return dom && dom._component && dom._component.constructor === vnode.tag
}

function removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom)
    }
}

function diffChildren(dom, vchildren) {
    const domChildren = dom.childNodes
    const children = []
    const keyed = {}

    // group nodes by keyed and nokeyed
    if (domChildren.length > 0) {
        for (let i = 0; i < domChildren.length; i++) {
            const child = domChildren[i]
            const key = child.key
            if (key) {
                keyed[key] = child
            } else {
                children.push(child)
            }
        }
    }

    if (vchildren && vchildren.length > 0) {
        let min = 0
        let childrenLen = children.length

        for (let i = 0; i < vchildren.length; i++) {
            const vchild = vchildren[i]
            const key = vchild.key
            let child

            // if has key, then find the node with key
            if (key) {
                if (keyed[key]) {
                    child = keyed[key]
                    keyed[key] = undefined
                }
            // if no key, then find the same type node
            } else if (min < childrenLen) {
                for (let j = min; j < childrenLen; j++) {
                    let c = children[j]
                    if (c && isSameNodeType(c, vchild)) {
                        child = c
                        children[j] = undefined

                        if (j === childrenLen - 1) childrenLen--
                        if (j === min) min++
                        break
                    }
                }
            }

            // compare
            child = diffNode(child, vchild)

            // update dom
            const f = domChildren[i]
            if (child && child !== dom && child !== f) {
                // if the real node is not existed, then the it's new node
                if (!f) {
                    dom.appendChild(child)
                // if the real node's next node == new node, then it means real node is removed
                } else if (child === f.nextSibling) {
                    removeNode(f)
                // move the node to correct position
                } else {
                    dom.insertBefore(child, f)
                }
            }
        }
    }
}

function diffComponent(dom, vnode) {
    let c = dom && dom._component
    let oldDom = dom
    
    // if the component is not updated, reset props
    if (c && c.constructor === vnode.tag) {
        setComponentProps(c, vnode.attrs)
        dom = c.base
    } else { // if the component is updated, remove the old component, render the new component
        if (c) {
            unmountComponent(c)
            oldDom = null
        }

        c = createComponent(vnode.tag, vnode.attrs)

        setComponentProps(c, vnode.attrs)
        dom = c.base

        if (oldDom && dom !== oldDom) {
            oldDom._component = null
            removeNode(oldDom)
        }
    }

    return dom
}

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

    // base = _render(renderer);
    base = diffNode(component.base, renderer);

    component.base = base
    base._component = component

    // if view updating, componentDidUpdate is called
    if (component.base) {
        if (component.componentDidUpdate) component.componentDidUpdate();
    } else if (component.componentDidMount) {
        // if view initializing, componentDidMount is called
        component.componentDidMount();
    }

    // replace the view
    // if (component.base && component.base.parentNode) {
    //     component.base.parentNode.replaceChild(base, component.base);
    // }

    component.base = base;
    base._component = component;
}
