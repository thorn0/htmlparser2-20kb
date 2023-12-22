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

test("findOne", () => {
  const dom = htmlparser.parse("<a><b><c></c></b></a>");
  const result = htmlparser.findOne("b", dom);
  expect(result.name).toBe("b");
});

test("findOne with predicate", () => {
  const dom = htmlparser.parse("<a><b><c></c></b></a>");
  const result = htmlparser.findOne((node) => node.name === "b", dom);
  expect(result.name).toBe("b");
});

test("findOne with predicate and multiple matches", () => {
  const dom = htmlparser.parse(
    "<a><b id=1><c></c></b><d><b id=2></b></d><b id=3><c></c></b></a>",
  );
  const result = htmlparser.findOne((node) => node.name === "b", dom);
  expect(result.name).toBe("b");
  expect(result.attribs.id).toBe("1");
});
