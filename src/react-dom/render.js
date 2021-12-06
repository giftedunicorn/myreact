// import Component from '../react/component'
// import { setAttribute } from './dom'
import { diff } from './diff'

// // make vitual DOM to be the real DOM
// function _render(vnode, container) {
//     if (vnode === undefined) return
//     // if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

//     // when vnode is number, convert to string
//     if (typeof vnode === 'number') vnode = String(vnode);

//     // when vnode is string, render text node
//     if (typeof vnode === 'string') {
//         let textNode = document.createTextNode(vnode);
//         return textNode;
//     }

//     // handle function components
//     if (typeof vnode.tag === 'function') {
//         const component = createComponent(vnode.tag, vnode.attrs);
//         setComponentProps(component, vnode.attrs);
//         return component.base;
//     }

//     const dom = document.createElement(vnode.tag);

//     if (vnode.attrs) {
//         Object.keys(vnode.attrs).forEach(key => {
//             const value = vnode.attrs[key];
//             setAttribute(dom, key, value);
//         });
//     }

//     if (vnode.children) {
//         vnode.children.forEach(child => render(child, dom));
//     }

//     return dom;
// }

export default function render(vnode, container, dom) {
    // return container.appendChild(_render(vnode));
    return diff(dom, vnode, container)
}
