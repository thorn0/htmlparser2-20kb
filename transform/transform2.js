module.exports = fileInfo => {
    return `
        (function() {
            var originalObjectDefineProperty = Object.defineProperty;
            Object.defineProperty = function(obj, name, desc) {
                // ignore function names that Prepack tries to keep
                if (name === 'name' && typeof obj === 'function') return;
                return originalObjectDefineProperty.apply(Object, arguments);
            };
            ${fileInfo.source};
            Object.defineProperty = originalObjectDefineProperty;
        })();
    `;
};
