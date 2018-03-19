const extend = require('zhf.extend');
const qs = require('zhf.query-string');
module.exports = function (json) {
    const opts = extend({
        url: '',
        data: {},
        callback: function () {
        },
    }, json);
    const url = opts.url;
    const data = opts.data;
    const callback = opts.callback;
    if (url) {
        const random = ('' + Math.random()).substring(2);
        const fnName = `jsonpCallback${new Date().getTime()}${random}`;
        window[fnName] = function (dataInfo) {
            callback(dataInfo);
        };
        const script = document.createElement('script');
        script.addEventListener('error', function () {
            document.body.removeChild(script);
        });
        script.addEventListener('load', function () {
            document.body.removeChild(script);
        });
        const parameter = qs.queryStringify(data);
        // jsonp - jsonp只支持get请求,其他一概不支持
        if (parameter) {
            script.src = `${url}?${parameter}&callback=${fnName}`;
        } else {
            script.src = `${url}?callback=${fnName}`;
        }
        document.body.appendChild(script);
    }
};
