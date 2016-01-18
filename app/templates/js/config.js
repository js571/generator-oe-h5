var dev = 1;

require.config({
    baseUrl: '../js/',
    paths: {
        base: dev ? 'page' : 'dist',
        $: 'third/zepto.min'
    },
    map: {
        '*': {
            'css': ''
        }
    },
    shim: {
    },
    urlArgs: 'v=1'
});