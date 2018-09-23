const hp = require('../dist/htmlparser2-20kb');

const f = s => hp.serialize(hp.parse(s));

test('basic use case', () => {
    expect(f('<div>z</div>')).toBe('<div>z</div>');
});

test('quotes in attributes', () => {
    expect(f(`<div a='"'>z</div>`)).toBe('<div a="&quot;">z</div>');
});

test('unescaped less-than', () => {
    expect(f('a < b')).toBe('a &lt; b');
});
