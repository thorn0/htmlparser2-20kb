const isTag = require("domelementtype").isTag;

exports.findOne = (test, nodes) => find(test, nodes, 1);
exports.findAll = find;

function find(test, nodes, one) {
  const predicate =
    typeof test === "string" ? (node) => node.name === test : test;

  const result = one ? null : [];
  const stack = [];

  let i = nodes.length;

  while (i--) stack.push(nodes[i]);

  while (stack.length) {
    const elem = stack.pop();
    if (isTag(elem)) {
      if (predicate(elem)) {
        if (one) return elem;
        result.push(elem);
      }

      const { children } = elem;
      i = children && children.length;
      while (i--) stack.push(children[i]);
    }
  }

  return result;
}
