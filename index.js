const Parser = require("htmlparser2/lib/Parser");
const DomHandler = require("domhandler");

const traversal = require("domutils/lib/traversal"),
  manipulation = require("domutils/lib/manipulation"),
  querying = require("domutils/lib/querying"),
  manipulationExtra = require("./lib/manipulation-extra");

const parse = (data, options) => {
  const handler = new DomHandler(options);
  new Parser(handler, options).end(data);
  return handler.dom;
};

module.exports = {
  parse,
  serialize: require("dom-serializer"),
  Parser,
  DomHandler,

  getSiblings: traversal.getSiblings,
  getAttribValue: traversal.getAttributeValue,
  hasAttrib: traversal.hasAttrib,

  remove: manipulationExtra.remove,
  replace: manipulationExtra.replace,
  appendChild: manipulationExtra.appendChild,
  prependChild: manipulationExtra.prependChild,
  append: manipulation.append,
  prepend: manipulation.prepend,

  filter: querying.filter,
  findOne: querying.findOne,
  findAll: querying.findAll,

  create: require("./lib/util-create").create,
};
