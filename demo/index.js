// 豆瓣的jsonp接口 https://api.douban.com/v2/book/search?q=javascript&count=1&callback=handleResponse
const jsonp = require('../dist/index.min');
const wrap = document.querySelector('.wrap');
// 测试成功状态
jsonp({
    url: `https://api.douban.com/v2/book/search`,
    data: {
        q: 'javascript',
        count: 100,
    },
    callback: function (error, dataInfo) {
        const div = document.createElement('div');
        div.innerHTML = `测试成功状态：<div>error：${JSON.stringify(error)}</div><div>dataInfo：${JSON.stringify(dataInfo)}</div>`;
        wrap.appendChild(div);
    },
});
// 测试失败状态
jsonp({
    url: `https://api.douban.com/v2/book/search2`,
    data: {
        obj: {
            a: 1,
            b: '2',
            c: [1, '2'],
        },
        array: [1, '2'],
        hello: 'world',
        num: 1,
    },
    callback: function (error, dataInfo) {
        const div = document.createElement('div');
        div.innerHTML = `测试失败状态：<div>error：${JSON.stringify(error)}</div><div>dataInfo：${JSON.stringify(dataInfo)}</div>`;
        wrap.appendChild(div);
    },
});
