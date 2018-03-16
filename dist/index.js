'use strict';

var extend = require('zhf.extend');
var qs = require('zhf.query-string');
module.exports = function (json) {
    var opts = extend({
        url: '',
        data: {},
        isHandleError: true, // 是否处理错误
        isHandleFailure: true, // 是否处理失败
        callback: function callback() {}
    }, json);
    var url = opts.url;
    var data = opts.data;
    var callback = opts.callback;

    function fnError() {
        var dataInfo = {
            status: 'error',
            message: '接口出错',
            error: 'Request failed with status code 404'
        };
        callback(dataInfo);
        if (opts.isHandleError) {
            alert('Error: ' + dataInfo.error);
        }
    }

    if (url) {
        var random = ('' + Math.random()).substring(2);
        var fnName = 'jsonpCallback' + new Date().getTime() + random;
        window[fnName] = function (dataInfo) {
            callback(dataInfo);
            if (dataInfo.status === 'failure' && opts.isHandleFailure) {
                alert('\u5931\u8D25: ' + dataInfo.message);
            }
        };
        var script = document.createElement('script');
        script.addEventListener('error', function () {
            document.body.removeChild(script);
            fnError();
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
    } else {
        fnError();
    }
};