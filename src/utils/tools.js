const Tools = {}
Tools.isEmpty = function (obj) {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
}
Tools.isPhone = function (str) {
    var reg = /^1[3456789]\d{9}$/;
    return reg.test(str);
  },
  Tools.verifyID = function (str) {
    var reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
    return reg.test(str);
  },
  Tools.isMobileUserAgent = function () { // 判断是pc端还是h5端
    return /iphone|ipod|android|windows.*phone|blackberry.*mobile/i.test(
      window.navigator.userAgent.toLowerCase()
    );
  }
//打开摄像头
Tools.getCompetence = function (that, videoId, cancasId) {
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
  Tools.stopNavigator = function () {
    this.thisVideo.srcObject.getTracks()[0].stop();
  },
  Tools.dataURLtoFile = function (dataurl, filename) {
    var arr = dataurl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    //转换成file对象
    return new File([u8arr], filename, {
      type: mime
    });
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
  },
  //拍照
  Tools.takePhoto = function (that) {
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
    return Tools.dataURLtoFile(image, 'file.png')
  },
  //上传图片格式
  Tools.beforeAvatarUpload = function (file) {
    let pic = file.name.substring(file.name.lastIndexOf('.') + 1)
    let ext = pic.toLowerCase()
    let flag = false;
    if (ext == 'png' || ext == 'jpg' || ext == 'jpeg') {
      flag = true;
    }
    return flag
  }
//rtsp视频播放
Tools.streamedian = function (Vid, url, that) {
    // url =
    //   "rtsp://admin:abcdef00@hlstest.tpddns.cn:10554/Streaming/Channels/102";
    //移除绑定事件
    
    if (that.timeLine) {
      that.timeLine.removeEventListener('change', timeChange, false);
      that.timeLine.removeEventListener("mousemove", timeShow, false);
      that.timeLine = null;
    }
    that.playerId = 'test_video';
    // $(`<video id="test_video" muted controls autoplay></video>
    //     <p class="errorTip">播放链接出错或网络带宽不足！</p>
    //     <div class="progressV">
    //         <input type="range" class="timeLine" min="0" max="100" value="100" style="width:100%;">
    //         <div class="timeFloat">11-20 / 04:20:50</div>
    //     </div>`).appendTo($(".video-box"));
    let errHandler = function (err) {};
    var playerOptions = {
      socket: "ws://192.168.10.250:9080/ws/",
      // socket: "ws://148.70.230.200:9640/ws/",
      redirectNativeMediaErrors: true,
      bufferDuration: 30,
      errorHandler: errHandler,
    };

    var html5Player = document.getElementById(Vid);
    html5Player.src = url;
    that.playerRTSP = Streamedian.player(Vid, playerOptions);

    var nativePlayer = document.getElementById(Vid);
    nativePlayer.addEventListener("play", function () {
      //监听播放
      console.log("开始播放");
      console.log(nativePlayer.currentTime, nativePlayer.buffered.end(0));
      setTimeout(function () {
        nativePlayer.currentTime = nativePlayer.buffered.end(0);
      }, 500);
    });
    //监听进度条
    that.changeLists = []
    that.mousemoveList = []
    that.timeLine = document.getElementsByClassName('timeLine')[0];
    that.timeLine.addEventListener("change", timeChange, false);
    that.changeLists.push(timeChange);

    that.timeLine.onmousedown = function () {
      that.isPlayback = true
      that.timeLine.addEventListener("mousemove", timeShow, false);
      // $('.timeFloat').first().css("visibility", 'visible');
      that.mousemoveList.push(timeShow)
    }
    that.timeLine.onmouseup = function () {
      that.isPlayback = true
      that.timeLine.removeEventListener("mousemove", timeShow, false);
      // $('.timeFloat').first().css("visibility", 'hidden');
    }
    // console.log('时间')
    function timeShow() {
      console.log('时间')
      let distanceTime, firstTime, startTime;
      nowTime = new Date().getTime();
      distanceTime = 24 * 60 * 60 * 1000;
      firstTime = nowTime - distanceTime;
      startTime = parseInt(distanceTime * (Number(that.timeLine.value))) / 100 + firstTime;
      let siderLeft = Number(that.timeLine.value) / 100 * that.timeLine.offsetWidth - 65;
      var date = new Date(startTime);
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ":";
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":";
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      var str = MM + DD + ' / ' + hh + mm + ss;
      $('.timeFloat').first().css("left", siderLeft + "px");
      // $('.timeFloat').html(str);
      that.progressTime = str
    }

    function timeChange() {
      let nowTime, distanceTime, firstTime, startTime, New_url, edit_url;
      nowTime = new Date().getTime();
      distanceTime = 24 * 60 * 60 * 1000;
      firstTime = nowTime - distanceTime;
      startTime = parseInt(distanceTime * (Number(that.timeLine.value))) / 100 + firstTime;
      startTime = Tools.formatDate(startTime);
      New_url = url.replace('Channels', 'tracks');
      edit_url = New_url + '?starttime=' + startTime
      console.log('edit_url', edit_url);

      that.playerRTSP.destroy();
      that.playerRTSP = null;
      html5Player.src = edit_url;
      that.playerRTSP = Streamedian.player(that.playerId, playerOptions);
    }

    if (!!window.chrome) {
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") {
          nativePlayer.pause();
        } else {
          setTimeout(function () {
            nativePlayer.currentTime = nativePlayer.buffered.end(0);
          }, 3000); // Delay for a few seconds is required for the player has time to update the timeline.
        }
      });
    }
  },
  Tools.formatDate = function (date) {
    var date = new Date(date);
    var YY = date.getFullYear();
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + 't';
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + 'z';
    return String(YY) + String(MM) + String(DD) + String(hh) + String(mm) + String(ss);
  },
  Tools.destroyRTSP = function (that) {
    that.playerRTSP.destroy()
    that.playerRTSP = null
  },
  //压缩图片，改变图片方向
  Tools.getImgData = function (img, dir, next) {
    var image = new Image();
    image.src = img
    image.onload = function () {
      var degree = 0,
        drawWidth, drawHeight, width, height;
      drawWidth = this.width;
      drawHeight = this.height;

      //以下改变一下图片大小
      var maxSide = Math.max(drawWidth, drawHeight);
      if (maxSide > 400) {
        var minSide = Math.min(drawWidth, drawHeight);
        minSide = minSide / maxSide * 400;
        maxSide = 400;
        if (drawWidth > drawHeight) {
          drawWidth = maxSide;
          drawHeight = minSide;
        } else {
          drawWidth = minSide;
          drawHeight = maxSide;
        }
      }
      var canvas = document.createElement('canvas');

      canvas.width = drawWidth;
      canvas.height = drawHeight;
      width = drawWidth;
      height = drawHeight
      var context = canvas.getContext('2d');
      if (dir.Orientation && dir.Orientation != 1) {
        switch (dir.Orientation) {
          case 3:
            context.rotate(Math.PI);
            context.drawImage(this, -drawWidth, -drawHeight, drawWidth, drawHeight);
            break;
          case 6:
            if (width > height) {
              canvas.width = height;
              canvas.height = width;
              context.rotate(Math.PI / 2);
              context.drawImage(this, 0, -drawHeight, drawWidth, drawHeight)
            } else {
              context.drawImage(this, 0, 0, drawWidth, drawHeight);
            }
            break;
          case 8:
            canvas.width = drawHeight;
            canvas.height = drawWidth;
            context.rotate(3 * Math.PI / 2);
            context.drawImage(this, -drawWidth, 0, drawWidth, drawHeight);
            break;
        }
      } else {
        context.drawImage(this, 0, 0, drawWidth, drawHeight);
      }
      next(canvas.toDataURL("image/png", .8));
    }
  }
module.exports = Tools
