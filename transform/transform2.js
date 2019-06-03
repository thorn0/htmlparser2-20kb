module.exports = (fileInfo, { jscodeshift: j }) => {
  const ast = j(fileInfo.source);

  ast
    .find(j.ConditionalExpression, {
      test: {
        type: 'BinaryExpression',
        operator: '===',
        left: { type: 'Literal' },
        right: { type: 'Identifier' }
      },
      consequent: { type: 'Literal' }
    })
    .filter(path => path.value.test.left.value === path.value.consequent.value)
    .replaceWith(path =>
      j.conditionalExpression(path.value.test, path.value.test.right, path.value.alternate)
    );

  ast
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: x => /^[A-Z]/.test(x) && /Error$/.test(x)
      },
      arguments: [
        {
          type: 'Literal',
          value: x => /!$/.test(x)
        }
      ]
    })
    .forEach(p => {
      p.value.arguments[0] = j.literal(p.value.arguments[0].value.replace(/!$/, ''));
    });

  // add UMD boilerplate

  const source = ast
    .toSource()
    .replace('\n', '\n  var hop = Object.prototype.hasOwnProperty, isArray = Array.isArray;\n')
    .replace(/Object\.prototype\.hasOwnProperty\./g, 'hop.')
    .replace(/Array\.isArray\(/g, 'isArray(')
    .replace(/([\w.]+) = (\w+);\s+([\w.]+) = \2;/g, '$1 = $3 = $2;')
    .replace(
      /[\w$]+\.HTMLPARSER2\$TMP\$GLOBAL = ([\w$]+);/,
      `if (typeof exports === "object" && typeof module !== "undefined") {
    // CommonJS
    module.exports = $1;
  } else if (typeof define === "function" && define.amd) {
    // RequireJS
    define(function() { return $1; });
  } else {
    // <script>
    this.htmlparser = $1;
  }`
    );

  return source;
};
