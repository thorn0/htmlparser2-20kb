const Parser = require("htmlparser2/lib/Parser");
const DomHandler = require("domhandler");

const traversal = require("domutils/lib/traversal"),
  manipulation = require("domutils/lib/manipulation"),
  querying = require("domutils/lib/querying");

const parse = (data, options) => {
  const handler = new DomHandler(options);
  new Parser(handler, options).end(data);
  return handler.dom;
};

const remove = (node, dom) => {
  if (Array.isArray(node)) {
    let index = node.length;
    while (index) {
      remove(node[--index], dom);
    }
    return;
  }
  manipulation.removeElement(node);
  if (Array.isArray(dom)) {
    for (let index = dom.length - 1; index >= 0; index--) {
      if (dom[index] === node) {
        dom.splice(index, 1);
      }
    }
  }
};

module.exports = {
  parse,
  serialize: require("dom-serializer"),
  Parser: Parser,
  DomHandler: DomHandler,

  getSiblings: traversal.getSiblings,
  getAttribValue: traversal.getAttributeValue,
  hasAttrib: traversal.hasAttrib,

  remove,
  replace: manipulation.replaceElement,
  appendChild: manipulation.appendChild,
  append: manipulation.append,
  prepend: manipulation.prepend,

  filter: querying.filter,
  findOne: querying.findOne,
  findAll: querying.findAll,

  create: require("./lib/util-create").create,
};
