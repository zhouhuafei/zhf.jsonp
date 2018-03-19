'use strict';

var extend = require('zhf.extend');
var qs = require('zhf.query-string');
module.exports = function (json) {
    var opts = extend({
        url: '',
        data: {},
        callback: function callback() {}
    }, json);
    var url = opts.url;
    var data = opts.data;
    var callbackFn = opts.callback;
    if (url) {
        var random = ('' + Math.random()).substring(2);
        var fnName = 'jsonpCallback' + new Date().getTime() + random;
        window[fnName] = function (dataInfo) {
            callbackFn(null, dataInfo);
        };
        var script = document.createElement('script');
        script.addEventListener('error', function () {
            document.body.removeChild(script);
            callbackFn({
                status: 'error',
                message: '接口出错'
            }, {});
        });
        script.addEventListener('load', function () {
            document.body.removeChild(script);
        });
        var parameter = qs.queryStringify(data);
        // jsonp - jsonp只支持get请求,其他一概不支持
        if (parameter) {
            script.src = url + '?' + parameter + '&callback=' + fnName;
        } else {
            script.src = url + '?callback=' + fnName;
        }
        document.body.appendChild(script);
    }
};