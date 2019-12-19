const htmlparser = require('../dist/htmlparser2-20kb');

describe('htmlparser.remove', () => {
  test('with 2 args', () => {
    const dom = htmlparser.parse('<a></a><b></b>');
    const b = dom[1];
    expect(b.prev).not.toBe(null);
    expect(b.prev).toBe(dom[0]);
    htmlparser.remove(dom[0], dom);
    expect(dom.length).toBe(1);
    expect(dom[0]).toBe(b);
    expect(b.prev).toBe(null);
  });

  test('can be passed to Array.prototype.forEach', () => {
    const dom = htmlparser.parse('<a></a><b></b><a></a>');
    const links = htmlparser.findAll(n => n.name === 'a', dom);
    expect(dom[1].prev).not.toBe(null);
    links.forEach(htmlparser.remove);
    expect(dom[1].prev).toBe(null);
  });
});
