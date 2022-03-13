module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'import/no-webpack-loader-syntax': 'on',
    },
    globals: {
        __dirname: false,
        $: false,
        API_VERSION: false,
        ARDOQ: true,
        Backbone: false,
        DOMParser: false,
        Element: true,
        FileReader: true,
        FormData: false,
        Handsontable: false,
        Image: false,
        Intercom: false,
        plantrack: false,
        LOG: false,
        Promise: false,
        Request: false,
        URL: false,
        alert: false,
        analytics: true,
        buster: false,
        clearInterval: false,
        clearTimeout: false,
        confirm: false,
        console: false,
        crypto: false,
        dagreD3: false,
        define: false,
        document: false,
        error: false,
        fail: false,
        jQuery: false,
        jasmine: false,
        localStorage: false,
        markdown: false,
        module: false,
        moment: false,
        navigator: false,
        nv: false,
        prettyPrint: false,
        process: false,
        require: false,
        setInterval: false,
        setTimeout: false,
        version: false,
        window: false,
    },
};
