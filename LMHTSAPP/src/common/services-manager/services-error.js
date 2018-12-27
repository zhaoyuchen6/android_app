export default function(scope, opts) {
    scope.$aui.message.show({
        type: 'error',
        message: '这是一条错误信息：' + opts
    });
}
