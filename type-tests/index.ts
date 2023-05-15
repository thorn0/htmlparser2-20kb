import * as htmlparser from "htmlparser2-20kb";
const dom = htmlparser.parse("<b>1</b><p><b>2</b>");
const x = dom[0];
if (x.attribs) {
  console.log(x.children);
}
htmlparser.remove(
  htmlparser.findAll((n) => n.name === "b", dom),
  dom
);
