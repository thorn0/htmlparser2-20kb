# htmlparser2-20kb

[![npm](https://img.shields.io/npm/v/htmlparser2-20kb.svg)](https://www.npmjs.com/package/htmlparser2-20kb)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/htmlparser2-20kb.svg)](https://unpkg.com/htmlparser2-20kb)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react.svg)](https://bundlephobia.com/result?p=htmlparser2-20kb)

> [Fast & forgiving HTML/XML parser](https://github.com/fb55/htmlparser2) bundled for the browser, < 20 KB, no dependencies

## Includes:

-   [`htmlparser2`](https://github.com/fb55/htmlparser2)
-   [`domhandler`](https://github.com/fb55/domhandler)
-   [`dom-serializer`](https://github.com/cheeriojs/dom-serializer) (with a fix for [#26](https://github.com/cheeriojs/dom-serializer/issues/26))
-   [`domutils`](https://github.com/fb55/domutils)

## Excludes:

-   The [`decodeEntities`](https://github.com/fb55/htmlparser2/wiki/Parser-options#option-decodeentities) option
-   [`FeedHandler`](https://github.com/fb55/htmlparser2/blob/master/lib/FeedHandler.js)
-   Some functions from `domutils`

## Compare:

https://bundlephobia.com/result?p=htmlparser2
