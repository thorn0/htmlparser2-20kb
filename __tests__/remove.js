const htmlparser = require("../dist/htmlparser2-20kb");

describe("htmlparser.remove", () => {
  test("with 2 args", () => {
    const dom = htmlparser.parse("<a></a><b></b>");
    const b = dom[1];
    expect(b.prev).not.toBe(null);
    expect(b.prev).toBe(dom[0]);
    htmlparser.remove(dom[0], dom);
    expect(dom.length).toBe(1);
    expect(dom[0]).toBe(b);
    expect(b.prev).toBe(null);
  });

  test("can be passed to Array.prototype.forEach", () => {
    const dom = htmlparser.parse("<p><a></a><b></b><a></a>");
    const links = htmlparser.findAll((n) => n.name === "a", dom);
    const b = htmlparser.findOne((n) => n.name === "b", dom);
    expect(links.length).toBe(2);
    expect(b.prev).not.toBe(null);
    links.forEach(htmlparser.remove);
    expect(b.prev).toBe(null);
    expect(dom[0].children.length).toBe(1);
  });

  test("can remove multiple nodes", () => {
    const dom = htmlparser.parse("<a></a><b></b><a></a>");
    expect(dom.length).toBe(3);
    const links = htmlparser.findAll((n) => n.name === "a", dom);
    expect(dom[1].prev).not.toBe(null);
    htmlparser.remove(links, dom);
    expect(dom[0].prev).toBe(null);
    expect(dom.length).toBe(1);
  });

  test("can remove multiple nodes when passed array is `children` array of parent node", () => {
    const dom = htmlparser.parse(
      /* HTML */ `<section name="section_phase">
        <field name="title" />
        <field name="description" />
      </section>`,
      { xmlMode: true },
    );
    expect(dom.length).toBe(1);
    const nodesToRemove = dom[0].children;
    expect(nodesToRemove.length).toBe(5);
    htmlparser.remove(nodesToRemove, dom);
    expect(htmlparser.serialize(dom, { xmlMode: true })).toBe(
      `<section name="section_phase"/>`,
    );
  });
});
