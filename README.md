# htmlparser2-20kb

[![npm](https://img.shields.io/npm/v/htmlparser2-20kb.svg)](https://www.npmjs.com/package/htmlparser2-20kb)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/htmlparser2-20kb.svg)](https://unpkg.com/htmlparser2-20kb)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://bundlephobia.com/result?p=htmlparser2-20kb)

> [Fast & forgiving HTML/XML parser](https://github.com/fb55/htmlparser2) bundled for the browser, < 20 KB, no dependencies

## Includes:

- [`htmlparser2`](https://github.com/fb55/htmlparser2) 3.x
- [`domhandler`](https://github.com/fb55/domhandler) 2.x
- [`dom-serializer`](https://github.com/cheeriojs/dom-serializer) with a fix for [#26](https://github.com/cheeriojs/dom-serializer/issues/26)
- The most useful parts of [`domutils`](https://github.com/fb55/domutils)
- A `create` utility function for simple DOM node creation
- [TypeScript type definitions](https://github.com/thorn0/htmlparser2-20kb/blob/master/dist/htmlparser2-20kb.d.ts)

## Excludes:

- The [`decodeEntities`](https://github.com/fb55/htmlparser2/wiki/Parser-options#option-decodeentities) option
- Support for async usage with streams
- [`FeedHandler`](https://github.com/fb55/htmlparser2/blob/master/lib/FeedHandler.js)
- Some functions from `domutils`
- [Automatic fix-up](https://github.com/cheeriojs/dom-serializer/commit/78093e974872c5250922b07542095785ea4637e9) of mixed-case tag and attribute names.
  Set the `lowerCaseTags` and `lowerCaseAttributeNames` options of the parser to `false` to retain the casing.

## Compare:

https://bundlephobia.com/result?p=htmlparser2
