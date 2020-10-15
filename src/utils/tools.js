const Tools={}
Tools.isEmpty = function(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}
Tools.isPhone=function(str) {
    var reg = /^1[3456789]\d{9}$/;
    return reg.test(str);
},
module.exports = Tools