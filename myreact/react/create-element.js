import Component from './component.js'
	
// make vitual DOM from jsx
function createElement(tag, attrs, ...children) {

	attrs = attrs || {};
	
    return {
        tag,
        attrs,
        children,
        key: attrs.key || null
    }
}

export default createElement;
