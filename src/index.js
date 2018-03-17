const extend = require('zhf.extend');
const qs = require('zhf.query-string');
module.exports = function (json) {
    const opts = extend({
        url: '',
        data: {},
        isHandleError: false, // 是否处理错误
        isHandleFailure: false, // 是否处理失败
        callback: function () {
        },
    }, json);
    const url = opts.url;
    const data = opts.data;
    const callback = opts.callback;

    function fnError() {
        const dataInfo = {
            status: 'error',
            message: '接口出错',
            error: 'Request failed with status code 404',
        };
        callback(dataInfo);
        if (opts.isHandleError) {
            alert(`Error: ${dataInfo.error}`);
        }
    }

    if (url) {
        const random = ('' + Math.random()).substring(2);
        const fnName = `jsonpCallback${new Date().getTime()}${random}`;
        window[fnName] = function (dataInfo) {
            callback(dataInfo);
            if (dataInfo.status === 'failure' && opts.isHandleFailure) {
                alert(`失败: ${dataInfo.message}`);
            }
        };
        const script = document.createElement('script');
        script.addEventListener('error', function () {
            document.body.removeChild(script);
            fnError();
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
    } else {
        fnError();
    }
};
