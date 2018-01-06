var Utils = (function () {
    function Utils() {
    }
    Utils.randomHash = function () {
        var text = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i <= 10; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    return Utils;
}());
export default Utils;
