var Parser = require('htmlparser2/lib/Parser');
var DomHandler = require('domhandler');

var traversal = require('domutils/lib/traversal'),
    manipulation = require('domutils/lib/manipulation'),
    querying = require('domutils/lib/querying');

Object.assign(exports, {
    parse: function(data, options) {
        var handler = new DomHandler(options);
        new Parser(handler, options).end(data);
        return handler.dom;
    },
    serialize: require('dom-serializer'),
    Parser: Parser,
    DomHandler: DomHandler,

    getSiblings: traversal.getSiblings,
    getAttribValue: traversal.getAttributeValue,
    hasAttrib: traversal.hasAttrib,

    remove: manipulation.removeElement,
    replace: manipulation.replaceElement,
    appendChild: manipulation.appendChild,
    append: manipulation.append,
    prepend: manipulation.prepend,

    filter: querying.filter,
    findOne: querying.findOne,
    findAll: querying.findAll,

    create: require('./lib/util-create').create
});
