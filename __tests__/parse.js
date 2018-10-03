const htmlparser = require('../dist/htmlparser2-20kb');

test('basic use case', () => {
    const dom = htmlparser.parse('<div>z</div>');
    expect(dom.length).toBe(1);
    expect(dom[0].type).toBe('tag');
    expect(dom[0].name).toBe('div');
    expect(dom[0].attribs).toEqual({});
    expect(dom[0].children.length).toBe(1);
    expect(dom[0].children[0].type).toBe('text');
    expect(dom[0].children[0].data).toBe('z');
});
