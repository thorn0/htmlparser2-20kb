var Parser = require('htmlparser2/lib/Parser');
var serializer = require('dom-serializer');
var DomHandler = require('domhandler');

function parseDOM(data, options) {
    var handler = new DomHandler(options);
    new Parser(handler, options).end(data);
    return handler.dom;
}

window.html1 = s => {
    const options = { recognizeSelfClosing: true };
    return serializer(parseDOM(s, options), options);
};
