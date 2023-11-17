const htmlparser = require("../dist/htmlparser2-20kb");

describe("htmlparser.appendChild", () => {
  test("3 args", () => {
    const dom = htmlparser.parse("<a></a><b></b>");
    const a = dom[0];
    expect(a.next).not.toBe(null);
    expect(a.next).toBe(dom[1]);
    htmlparser.appendChild(a, dom[1], dom);
    expect(dom.length).toBe(1);
    expect(dom[0]).toBe(a);
    expect(a.next).toBe(null);
    expect(a.children.length).toBe(1);
  });
});
