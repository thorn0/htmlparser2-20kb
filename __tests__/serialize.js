const htmlparser = require('../dist/htmlparser2-20kb');

const roundTrip = s => htmlparser.serialize(htmlparser.parse(s));

test('basic use case', () => {
    expect(roundTrip('<div>z</div>')).toBe('<div>z</div>');
});

test('quotes in attributes', () => {
    expect(roundTrip('<div a=\'"\'>z</div>')).toBe('<div a="&quot;">z</div>');
});

test('unescaped less-than', () => {
    expect(roundTrip('a < b')).toBe('a &lt; b');
});
