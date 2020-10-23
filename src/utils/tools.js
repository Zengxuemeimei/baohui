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
//打开摄像头
Tools.getCompetence=function(that,videoId,cancasId){
    //打开摄像头
    console.log("调用摄像头");
    var _this = that;
    _this.thisCancas = document.getElementById(cancasId);
    console.log("_this.thisCancas", _this.thisCancas);
    _this.thisContext = _this.thisCancas.getContext("2d");
    _this.thisVideo = document.getElementById(videoId);
    _this.thisVideo.style.display = "block";
    // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先获取现存的getUserMedia(如果存在)
        var getUserMedia =
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.getUserMedia;
        // 有些浏览器不支持，会返回错误信息
        // 保持接口一致
        if (!getUserMedia) {
          //不存在则报错
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }
        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    var constraints = {
      audio: false,
      video: {
        width: that.videoWidth,
        height: that.videoHeight,
        transform: "scaleX(-1)",
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in _this.thisVideo) {
          _this.thisVideo.srcObject = stream;
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream);
        }
        _this.thisVideo.onloadedmetadata = function (e) {
          _this.thisVideo.play();
        };
      })
      .catch((err) => {
        console.log(err);
      });
},
// 关闭摄像头
Tools.stopNavigator=function() {
  this.thisVideo.srcObject.getTracks()[0].stop();
},
Tools.dataURLtoFile=function(dataurl, filename) {
    var arr = dataurl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    //转换成file对象
    return new File([u8arr], filename, { type: mime });
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
},
//拍照
Tools.takePhoto=function(that){
    var _this = that;
    // canvas画图
    _this.thisContext.drawImage(
      _this.thisVideo,
      0,
      0,
      _this.videoWidth,
      _this.videoHeight
    );
    // 获取图片base64链接
    var image = _this.thisCancas.toDataURL("image/png");
    _this.imgSrc = image; //赋值并预览图片
    // _this.visitorInfo.image = Tools.dataURLtoFile(image,'file')
    return Tools.dataURLtoFile(image,'file')
},

module.exports = Tools