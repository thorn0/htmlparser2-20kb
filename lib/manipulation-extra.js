const { removeElement } = require("domutils/lib/manipulation");

const remove = (node, dom) => {
  let index;

  if (Array.isArray(node)) {
    index = node.length;
    while (index) {
      remove(node[--index], dom);
    }
    return;
  }

  removeElement(node);

  if (Array.isArray(dom)) {
    for (index = dom.length - 1; index >= 0; index--) {
      if (dom[index] === node) {
        dom.splice(index, 1);
      }
    }
  }
};

exports.remove = remove;

exports.prependChild = (elem, child, dom) => {
  const newSiblings = elem.children;
  const sibling = newSiblings[0];
  if (dom) remove(child, dom);
  child.parent = elem;
  newSiblings.unshift(child);
  if ((child.next = sibling || null)) {
    sibling.prev = child;
  }
  child.prev = null;
};

exports.appendChild = (elem, child, dom) => {
  const newSiblings = elem.children;
  const sibling = newSiblings[newSiblings.length - 1];
  if (dom) remove(child, dom);
  child.parent = elem;
  newSiblings.push(child);
  if ((child.prev = sibling || null)) {
    sibling.next = child;
  }
  child.next = null;
};

exports.replace = (elem, replacement, dom) => {
  const prev = (replacement.prev = elem.prev);
  if (prev) {
    prev.next = replacement;
  }

  const next = (replacement.next = elem.next);
  if (next) {
    next.prev = replacement;
  }

  const parent = (replacement.parent = elem.parent);
  const arr = parent ? parent.children : dom;
  if (arr) {
    const index = arr.lastIndexOf(elem);
    if (index !== -1) arr[index] = replacement;
  }
};
