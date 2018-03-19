const jsonp = require('../dist/index.min');
const wrap = document.querySelector('.wrap');
jsonp({
    url: 'http://www.suibianxiexie.top/phone/api/verify-code-register-random/',
    data: {
        isJsonp: true,
        username: '1123486116@qq.com',
    },
    callback: function (error, dataInfo) {
        const div = document.createElement('div');
        div.innerHTML = `<div>error：${JSON.stringify(error)}</div><div>dataInfo：${JSON.stringify(dataInfo)}</div>`;
        wrap.appendChild(div);
    },
});
jsonp({
    url: 'http://www.suibianxiexie.top/phone/api/verify-code-register-random2/',
    data: {
        isJsonp: true,
        username: '1123486116@qq.com',
    },
    callbackName: 'hello',
    callback: function (error, dataInfo) {
        const div = document.createElement('div');
        div.innerHTML = `<div>error：${JSON.stringify(error)}</div><div>dataInfo：${JSON.stringify(dataInfo)}</div>`;
        wrap.appendChild(div);
    },
});
