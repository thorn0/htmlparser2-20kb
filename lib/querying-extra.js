const isTag = require("domelementtype").isTag;

exports.findAll = (test, nodes) => {
  const predicate =
    typeof test === "string" ? (node) => node.name === test : test;

  const result = [];
  const stack = [];

  let i = nodes.length;

  while (i--) stack.push(nodes[i]);

  while (stack.length) {
    const elem = stack.pop();
    if (isTag(elem)) {
      const { children } = elem;
      i = children && children.length;
      while (i--) stack.push(children[i]);
      if (predicate(elem)) result.push(elem);
    }
  }

  return result;
};
