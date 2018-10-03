exports.create = function(name, attribs) {
    var childDefinitions = Array.prototype.slice.call(arguments, 2);
    var children = [];
    while (childDefinitions.length) {
        var def = childDefinitions.shift();
        if (typeof def === 'string') {
            children.push({ type: 'text', data: def });
        } else if (Array.isArray(def)) {
            childDefinitions.unshift.apply(childDefinitions, def);
        } else {
            children.push(def);
        }
    }
    return createTagNode(name, attribs, children);
};

function createTagNode(name, attribs, children) {
    children = children || [];
    var node = {
        type: name === 'script' || name === 'style' ? name : 'tag',
        name: name,
        attribs: attribs || {},
        children: children,
        parent: null,
        next: null,
        prev: null
    };
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var currentSiblings = child.parent && child.parent.children;
        if (currentSiblings) {
            var pos = currentSiblings.lastIndexOf(child);
            if (pos !== -1) {
                currentSiblings.splice(pos, 1);
            }
        }
        child.parent = node;
        if (child.prev) child.prev.next = child.next || null;
        if (child.next) child.next.prev = child.prev || null;
        child.prev = children[i - 1] || null;
        child.next = children[i + 1] || null;
    }
    return node;
}
