module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "es6": true,
        "jquery": true
    },
    "extends":[
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": ["error", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false }],
        "no-var": "error",
        "semi": "error",
        "indent": "error",
        "no-multi-spaces": "error",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error",
        "no-use-before-define": "error"
    }
};