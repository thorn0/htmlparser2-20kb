var Parser = require('htmlparser2/lib/Parser');
var DomHandler = require('domhandler');

exports.parse = (data, options) => {
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
        findOne: require('domutils/lib/querying').findOne,
        findAll: require('domutils/lib/querying').findAll
    },
    require('domutils/lib/helpers')
);

exports.Parser = Parser;
