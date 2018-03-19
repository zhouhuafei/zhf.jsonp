const jsonp = require('../dist/index.min');
jsonp({
    url: 'http://www.suibianxiexie.top/phone/api/verify-code-register-random/',
    data: {
        isJsonp: true,
        username: '1123486116@qq.com',
    },
    callback: function (error, dataInfo) {
        console.log('error', error);
        console.log('dataInfo', dataInfo);
    },
});
jsonp({
    url: 'http://www.suibianxiexie.top/phone/api/verify-code-register-random2/',
    data: {
        isJsonp: true,
        username: '1123486116@qq.com',
    },
    callback: function (error, dataInfo) {
        console.log('error', error);
        console.log('dataInfo', dataInfo);
    },
});
