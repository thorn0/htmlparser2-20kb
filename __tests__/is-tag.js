const htmlparser = require("../dist/htmlparser2-20kb");

test("isTag", () => {
  const dom = htmlparser.parse("<p>text<!--c--><script></script><style></style></p>");
  const p = dom[0];
  expect(htmlparser.isTag(p)).toBe(true);

  const [text, comment, script, style] = p.children;
  expect(htmlparser.isTag(text)).toBe(false);
  expect(htmlparser.isTag(comment)).toBe(false);
  expect(htmlparser.isTag(script)).toBe(true);
  expect(htmlparser.isTag(style)).toBe(true);
});
