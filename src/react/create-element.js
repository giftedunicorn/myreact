import Component from './component.js'
	
// make vitual DOM from jsx
function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

export default createElement;
