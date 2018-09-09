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

    ast.find(j.BinaryExpression, {
        operator: '===',
        left: {
            object: { type: 'ThisExpression' },
            property: { name: '_state' }
        },
        right: { name: x => /_ENTITY$/.test(x) }
    }).replaceWith(() => j.literal(false));

    // parser

    // deprecated aliases
    ast.find(j.AssignmentExpression, {
        left: {
            object: {
                object: { name: x => /Parser$/.test(x) },
                property: { name: 'prototype' }
            },
            property: { name: x => x === 'parseChunk' || x === 'done' }
        }
    }).remove();

    ast.find(j.MemberExpression, {
        object: {
            object: { type: 'ThisExpression' },
            property: { name: '_options' }
        },
        property: { name: 'Tokenizer' }
    }).replaceWith(() => j.literal(false));

    // dom handler

    ast.find(j.MemberExpression, {
        object: {
            object: { type: 'ThisExpression' },
            property: { name: '_options' }
        },
        property: { name: x => x === 'withDomLvl1' || x === 'ignoreWhitespace' }
    }).replaceWith(() => j.literal(false));

    ast.find(j.VariableDeclarator, { id: { name: x => /defaultOpts$/ } })
        .find(j.Property, { value: { value: false } })
        .remove();

    // serializer

    ast.find(j.MemberExpression, {
        object: { name: 'opts' },
        property: { name: 'decodeEntities' }
    }).replaceWith(() => j.literal(false));

    ast.find(j.MemberExpression, {
        object: { name: 'dom' },
        property: { name: 'cheerio' }
    }).replaceWith(() => j.literal(false));

    // common

    ast.find(j.Property, { key: { name: 'decodeEntities' } }).remove();

    return ast.toSource();
};
