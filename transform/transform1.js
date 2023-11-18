module.exports = (fileInfo, { jscodeshift: j }) => {
  const ast = j(fileInfo.source);

  // tokenizer

  ast
    .find(j.AssignmentExpression, {
      left: {
        object: { type: "ThisExpression" },
        property: { name: (x) => x === "_decodeEntities" || x === "_running" },
      },
    })
    .remove();

  ast
    .find(j.MemberExpression, {
      object: { type: "ThisExpression" },
      property: { name: "_decodeEntities" },
    })
    .replaceWith(() => j.literal(false));

  ast
    .find(j.AssignmentExpression, {
      left: {
        object: {
          object: { name: (x) => /Tokenizer$/.test(x) },
          property: { name: "prototype" },
        },
        property: {
          name: (x) => /Entity/.test(x) || x === "pause" || x === "resume",
        },
      },
    })
    .remove();

  ast
    .find(j.MemberExpression, {
      object: { type: "ThisExpression" },
      property: { name: "_running" },
    })
    .replaceWith(() => j.literal(true));

  ast
    .find(j.BinaryExpression, {
      operator: "===",
      left: {
        object: { type: "ThisExpression" },
        property: { name: "_state" },
      },
      right: { name: (x) => /_ENTITY$/.test(x) },
    })
    .replaceWith(() => j.literal(false));

  const whileLoopInParse = ast
    .find(j.AssignmentExpression, {
      left: {
        object: {
          object: { name: (x) => /Tokenizer$/.test(x) },
          property: { name: "prototype" },
        },
        property: { name: "_parse" },
      },
      right: {
        type: "FunctionExpression",
      },
    })
    .find(j.WhileStatement);

  whileLoopInParse
    .find(j.MemberExpression, {
      object: { type: "ThisExpression" },
      property: { name: "_state" },
    })
    .replaceWith(() => j.identifier("state___"));

  whileLoopInParse.forEach((p) => {
    p.value.body.body.unshift(
      j.variableDeclaration("var", [
        j.variableDeclarator(
          j.identifier("state___"),
          j.memberExpression(j.thisExpression(), j.identifier("_state")),
        ),
      ]),
    );
  });

  // parser

  // deprecated aliases and async usage
  ast
    .find(j.AssignmentExpression, {
      left: {
        object: {
          object: { name: (x) => /Parser$/.test(x) },
          property: { name: "prototype" },
        },
        property: {
          name: (x) =>
            x === "parseChunk" ||
            x === "done" ||
            x === "pause" ||
            x === "resume",
        },
      },
    })
    .remove();

  ast
    .find(j.MemberExpression, {
      object: {
        object: { type: "ThisExpression" },
        property: { name: "_options" },
      },
      property: { name: "Tokenizer" },
    })
    .replaceWith(() => j.literal(false));

  // dom handler

  ast
    .find(j.MemberExpression, {
      object: {
        object: { type: "ThisExpression" },
        property: { name: "_options" },
      },
      property: {
        name: (x) => x === "withDomLvl1" || x === "ignoreWhitespace",
      },
    })
    .replaceWith(() => j.literal(false));

  ast
    .find(j.VariableDeclarator, {
      id: { name: (x) => /defaultOpts$/.test(x) },
    })
    .find(j.Property, { value: { value: false } })
    .remove();

  // serializer

  ast
    .find(j.MemberExpression, {
      object: { name: "opts" },
      property: { name: "decodeEntities" },
    })
    .replaceWith(() => j.literal(false));

  ast
    .find(j.MemberExpression, {
      object: { name: "dom" },
      property: { name: "cheerio" },
    })
    .replaceWith(() => j.literal(false));

  const dupe1 = ast
      .find(j.VariableDeclarator, {
        id: { name: (x) => /\$var\$singleTag$/.test(x) },
      })
      .nodes()[0],
    dupe2 = ast
      .find(j.VariableDeclarator, {
        id: { name: (x) => /\$var\$voidElements$/.test(x) },
      })
      .nodes()[0];

  if (dupe1.start > dupe2.start) {
    dupe1.init = j.identifier(dupe2.id.name);
  } else {
    dupe2.init = j.identifier(dupe1.id.name);
  }

  // common

  ast.find(j.Property, { key: { name: "decodeEntities" } }).remove();

  let result = ast.toSource();

  // utils/traverse

  result = result.replace(
    /&& hasOwnProperty\.call/,
    "&& Object.prototype.hasOwnProperty.call",
  );

  // util-create

  result = result.replace(/[\w$]+_typeof\(def\) ===/, "typeof def ===");

  return result;
};
