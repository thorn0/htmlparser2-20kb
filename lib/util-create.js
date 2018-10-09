exports.create = function(name) {
    var childDefinitions = Array.prototype.slice.call(arguments, 1);
    var children = [];
    var attribs = {};

    while (childDefinitions.length) {
        var def = childDefinitions.shift();
        if (!def) continue;
        if (typeof def === 'string') {
            children.push({ type: 'text', data: def });
        } else if (Array.isArray(def)) {
            childDefinitions.unshift.apply(childDefinitions, def);
        } else if (typeof def === 'object') {
            if (objectIsDomNode(def)) {
                children.push(def);
            } else {
                Object.assign(attribs, def);
            }
        }
    }

    var nameParts = name.split('.');
    name = nameParts[0] || 'div';
    if (nameParts.length > 1) {
        var classes = nameParts.slice(1).join(' ');
        if (attribs.class) {
            attribs.class += ' ' + classes;
        } else {
            attribs.class = classes;
        }
    }

    var node = {
        type: name === 'script' || name === 'style' ? name : 'tag',
        name: name,
        attribs: attribs,
        children: children,
        parent: null,
        next: null,
        prev: null
    };

    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        var oldSiblings = child.parent && child.parent.children;
        if (oldSiblings) {
            var pos = oldSiblings.lastIndexOf(child);
            if (pos !== -1) {
                oldSiblings.splice(pos, 1);
            }
        }
        child.parent = node;

        if (child.prev) child.prev.next = child.next || null;
        if (child.next) child.next.prev = child.prev || null;
        child.prev = children[i - 1] || null;
        child.next = children[i + 1] || null;
    }

    return node;
};

function objectIsDomNode(o) {
    var type = o.type;
    return (
        ((type === 'text' || type === 'comment') &&
            typeof o.data === 'string') ||
        ((type === 'tag' || type === 'script' || type === 'style') &&
            typeof o.name === 'string' &&
            o.name !== '')
    );
}
