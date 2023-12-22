const htmlparser = require("../dist/htmlparser2-20kb");

test("findAll", () => {
  const dom = htmlparser.parse("<a><b><c></c></b></a>");
  const result = htmlparser.findAll("b", dom);
  expect(result.length).toBe(1);
  expect(result[0].name).toBe("b");
});

test("findAll with predicate", () => {
  const dom = htmlparser.parse("<a><b><c></c></b></a>");
  const result = htmlparser.findAll((node) => node.name === "b", dom);
  expect(result.length).toBe(1);
  expect(result[0].name).toBe("b");
});

test("findAll with predicate and multiple matches", () => {
  const dom = htmlparser.parse("<a><b><c></c></b><b><c></c></b></a>");
  const result = htmlparser.findAll((node) => node.name === "b", dom);
  expect(result.length).toBe(2);
  expect(result[0].name).toBe("b");
  expect(result[1].name).toBe("b");
});
