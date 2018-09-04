module.exports = (fileInfo, { jscodeshift: j }) => {
    const ast = j(fileInfo.source);

    ast.find(j.AssignmentExpression, {
        left: { property: { name: 'defineProperty' } }
    }).remove();

    return ast.toSource();
};
