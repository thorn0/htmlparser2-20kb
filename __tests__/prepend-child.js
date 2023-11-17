const htmlparser = require("../dist/htmlparser2-20kb");

describe("htmlparser.prependChild", () => {
  test("3 args", () => {
    const dom = htmlparser.parse("<a></a><b></b>");
    const b = dom[1];
    expect(b.prev).not.toBe(null);
    expect(b.prev).toBe(dom[0]);
    htmlparser.prependChild(b, dom[0], dom);
    expect(dom.length).toBe(1);
    expect(dom[0]).toBe(b);
    expect(b.prev).toBe(null);
    expect(b.children.length).toBe(1);
  });
});
