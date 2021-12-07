
// there are some special case for setting the attributes, we need a funciotn to handle this
export function setAttribute(dom, name, value) {
    // if name is className, rename to class
    if (name === 'className') name = 'class';

    // if the name is onSoehting, for example onClick, it's an event handler
    if (/on\w+/.test(name)) {
        name = name.toLowerCase();
        dom[name] = value || '';
    // if name is style, handle the style object
    } else if (name === 'style') {
        if (!value || typeof value === 'string') {
            node.style.cssText = value || '';
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                // convert style={width: 20} to 20px
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
            }
        }
    // if other attributes
    } else {
        if (name in dom) {
            dom[name] = value || '';
        }
        if (value) {
            dom.setAttribute(name, value);
        } else {
            dom.removeAttribute(name, value);
        }
    }
}
