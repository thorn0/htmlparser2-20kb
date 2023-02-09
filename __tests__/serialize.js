const htmlparser = require("../dist/htmlparser2-20kb");

const roundTrip = (s, parserOptions) =>
  htmlparser.serialize(htmlparser.parse(s, parserOptions));

test("basic use case", () => {
  expect(roundTrip("<div>z</div>")).toBe("<div>z</div>");
});

test("quotes in attributes", () => {
  expect(roundTrip("<div a='\"'>z</div>")).toBe('<div a="&quot;">z</div>');
});

test("unescaped less-than", () => {
  expect(roundTrip("a < b")).toBe("a &lt; b");
});

test("recognizeSelfClosing", () => {
  expect(roundTrip("<x1/><x2/>", { recognizeSelfClosing: true })).toBe(
    "<x1></x1><x2></x2>"
  );
});

test("misc HTML", () => {
  expect(
    roundTrip(
      "<div></div   ><p>&lt;</p><!--<x>--><input    type=checkbox checked/>"
    )
  ).toBe('<div></div><p>&lt;</p><!--<x>--><input type="checkbox" checked>');
});
