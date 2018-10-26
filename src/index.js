const extend = require('zhf.extend');
const qs = require('zhf.query-string');
const typeOf = require('zhf.type-of');
module.exports = function (json) {
    const opts = extend({
        url: '',
        data: {},
        callbackName: null, // 自定义服务器接收的callback名称
        callback: function () {
        },
    }, json);
    const url = opts.url;
    const data = opts.data;
    const callbackName = opts.callbackName;
    const callbackFn = opts.callback;
    if (url) {
        const random = ('' + Math.random()).substring(2);
        let fnName = `jsonpCallback${new Date().getTime()}${random}`;
        if (callbackName && typeOf(callbackName) === 'string') {
            fnName = callbackName;
        }
        window[fnName] = function (dataInfo) {
            callbackFn(null, dataInfo);
        };
        const script = document.createElement('script');
        script.addEventListener('error', function () {
            document.body.removeChild(script);
            callbackFn({
                status: 'error',
                message: '接口出错',
            }, {});
        });
        script.addEventListener('load', function () {
            document.body.removeChild(script);
        });
        const parameter = qs.queryStringify(data);
        // jsonp - jsonp只支持GET请求,其他一概不支持
        if (parameter) {
            script.src = `${url}?${parameter}&callback=${fnName}`;
        } else {
            script.src = `${url}?callback=${fnName}`;
        }
        document.body.appendChild(script);
    }
};
