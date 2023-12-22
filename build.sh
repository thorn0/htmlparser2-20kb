npx parcel build index.js --out-file htmlparser2-20kb.js --experimental-scope-hoisting --no-source-maps --no-minify --global HTMLPARSER2_TMP_GLOBAL
npx jscodeshift dist/htmlparser2-20kb.js -t transform/transform1.js
npx uglifyjs dist/htmlparser2-20kb.js -c passes=10,pure_getters=true,unsafe=true,drop_console=true,hoist_funs=true,hoist_vars=true,keep_fargs=false,unsafe_regexp=true -o dist/htmlparser2-20kb.js --timings
npx prepack dist/htmlparser2-20kb.js --out dist/htmlparser2-20kb.js
npx jscodeshift dist/htmlparser2-20kb.js -t transform/transform2.js
npx uglifyjs dist/htmlparser2-20kb.js -c passes=10,pure_getters=true,unsafe=true,hoist_funs=true,keep_fargs=false -m --mangle-props regex=/^_/ -o dist/htmlparser2-20kb.js --timings
cp README.md dist/
ls dist/htmlparser2-20kb.js -l
yarn run test
yarn run test-types
node -p "fs.readFileSync('dist/htmlparser2-20kb.js').length"