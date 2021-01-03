import * as htmlparser from 'htmlparser2-20kb';
const dom = htmlparser.parse('<p><b>1</b>');
const x = dom[0];
if (x.attribs) {
  console.log(x.children);
}
