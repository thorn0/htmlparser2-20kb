const htmlparser = require("../dist/htmlparser2-20kb");

describe("htmlparser.replace", () => {
  test("root level (3 args)", () => {
    const dom = htmlparser.parse("<a></a><b></b><c></c>");
    htmlparser.replace(dom[1], htmlparser.create("x"), dom);
    expect(htmlparser.serialize(dom)).toBe("<a></a><x></x><c></c>");
  });
});
