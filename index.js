var Parser = require('htmlparser2/lib/Parser');
var DomHandler = require('domhandler');

exports.parse = function(data, options) {
    var handler = new DomHandler(options);
    new Parser(handler, options).end(data);
    return handler.dom;
};

exports.serialize = require('dom-serializer');

exports.utils = Object.assign(
    {},
    require('domutils/lib/traversal'),
    require('domutils/lib/manipulation'),
    {
        filter: require('domutils/lib/querying').filter,
        findOne: require('domutils/lib/querying').findOne,
        findAll: require('domutils/lib/querying').findAll
    },
    require('domutils/lib/helpers'),
    require('./lib/util-create')
);
exports.utils.remove = exports.utils.removeElement;
exports.utils.replace = exports.utils.replaceElement;

exports.Parser = Parser;

exports.DomHandler = DomHandler;
