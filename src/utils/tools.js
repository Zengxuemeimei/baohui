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
Tools.verifyID=function(str) {
    var reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
    return reg.test(str);
},
module.exports = Tools