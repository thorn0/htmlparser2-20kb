exports.create = function (name) {
  const childDefinitions = Array.prototype.slice.call(arguments, 1);
  const children = [];
  const attribs = {};

  while (childDefinitions.length) {
    const def = childDefinitions.shift();
    if (!def) continue;
    if (typeof def === "string") {
      children.push({ type: "text", data: def });
    } else if (Array.isArray(def)) {
      childDefinitions.unshift.apply(childDefinitions, def);
    } else if (typeof def === "object") {
      if (objectIsDomNode(def)) {
        children.push(def);
      } else {
        for (const key in def) {
          if (Object.prototype.hasOwnProperty.call(def, key)) {
            attribs[key] = def[key];
          }
        }
      }
    }
  }

  const nameParts = name.split(".");
  name = nameParts[0] || "div";
  if (nameParts.length > 1) {
    const classes = nameParts.slice(1).join(" ");
    const attr = attribs.class;
    attribs.class = attr ? attr + " " + classes : classes;
  }

  const node = {
    type: name === "script" || name === "style" ? name : "tag",
    name,
    attribs,
    children,
    parent: null,
    next: null,
    prev: null,
  };

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const { parent, prev, next } = child;

    const oldSiblings = parent && parent.children;
    if (oldSiblings) {
      const pos = oldSiblings.lastIndexOf(child);
      if (pos !== -1) {
        oldSiblings.splice(pos, 1);
      }
    }
    child.parent = node;

    if (prev) prev.next = next || null;
    if (next) next.prev = prev || null;
    child.prev = children[i - 1] || null;
    child.next = children[i + 1] || null;
  }

  return node;
};

function objectIsDomNode(o) {
  const type = o.type;
  return (
    ((type === "text" || type === "comment") && typeof o.data === "string") ||
    ((type === "tag" || type === "script" || type === "style") &&
      typeof o.name === "string" &&
      o.name)
  );
}
