module.exports = (fileInfo, { jscodeshift: j }) => {
    const ast = j(fileInfo.source);

    // tokenizer

    ast.find(j.AssignmentExpression, {
        left: {
            object: { type: 'ThisExpression' },
            property: { name: '_decodeEntities' }
        }
    }).remove();

    ast.find(j.MemberExpression, {
        object: { type: 'ThisExpression' },
        property: { name: '_decodeEntities' }
    }).replaceWith(() => j.literal(false));

    ast.find(j.AssignmentExpression, {
        left: {
            object: {
                object: { name: x => /Tokenizer$/.test(x) },
                property: { name: 'prototype' }
            },
            property: { name: x => /Entity/.test(x) }
        }
    }).remove();

    // dom handler

    ast.find(j.MemberExpression, {
        object: {
            object: { type: 'ThisExpression' },
            property: { name: '_options' }
        },
        property: { name: 'withDomLvl1' }
    }).replaceWith(() => j.literal(false));

    // serializer

    ast.find(j.MemberExpression, {
        object: { name: 'opts' },
        property: { name: 'decodeEntities' }
    }).replaceWith(() => j.literal(false));

    // common

    ast.find(j.Property, { key: { name: 'decodeEntities' } }).remove();

    return ast.toSource();
};
