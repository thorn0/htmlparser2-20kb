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

  return ast.toSource();
};
