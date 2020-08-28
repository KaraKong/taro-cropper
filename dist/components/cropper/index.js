(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["components/cropper/index"],{

/***/ "./src/components/cropper/index.scss":
/*!*******************************************!*\
  !*** ./src/components/cropper/index.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/cropper/index.tsx":
/*!******************************************!*\
  !*** ./src/components/cropper/index.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

__webpack_require__(/*! ./index.scss */ "./src/components/cropper/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = false;
var fnLog = function fnLog(msg) {};

var Cropper = function (_Taro$Component) {
  _inherits(Cropper, _Taro$Component);

  function Cropper() {
    _classCallCheck(this, Cropper);

    var _this = _possibleConstructorReturn(this, (Cropper.__proto__ || Object.getPrototypeOf(Cropper)).apply(this, arguments));

    _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "hideBox", "scrollTop", "imgSrc", "clipStyle", "imgStyle", "imgStyle1", "stageWidth", "stageHeight", "stageLeft", "isHeightLarge", "stageTop", "boxWidth", "boxHeight", "boxLeft", "boxTop", "boxHideStyle", "canvasHeight", "canvasWidth", "tempImgSrc", "outputFileType", "quality", "aspectRatio", "minBoxWidthRatio", "minBoxHeightRatio", "initialBoxWidthRatio", "initialBoxHeightRatio"];
    _this.onEnterCrop = function (e) {
      e.stopPropagation();
      var onCropCallback = _this.props.onCropCallback;

      _this.fnCrop({
        success: function success(res) {
          if (onCropCallback) {
            _this.props.onCropCallback(true, res.tempFilePath);
          }
        },
        fail: function fail(err) {
          if (onCropCallback) {
            _this.props.onCropCallback(false, err);
          }
        }
      });
    };
    _this.customComponents = [];
    return _this;
  }

  _createClass(Cropper, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Cropper.prototype.__proto__ || Object.getPrototypeOf(Cropper.prototype), "_constructor", this).call(this, props);
      this._minBoxWidth = 0;
      this._minBoxHeight = 0;
      this._touchStartBoxLeft = 0;
      this._touchStartBoxTop = 0;
      this._touchStartBoxWidth = 0;
      this._touchStartBoxHeight = 0;
      this._touchStartX = 0;
      this._touchStartY = 0;
      this._touchScrollStartY = 0;
      this._touchScrollEndY = 0;
      this._imageStageRatio = 1; //图片实际尺寸与剪裁舞台大小的比值，用于尺寸换算。
      this._pixelRatio = 1; //todo设备像素密度//暂不使用//
      this.state = {
        hideBox: !!props.hideBox,
        imgSrc: props.imgSrc,
        tempImgSrc: '',
        outputFileType: props.outputFileType || 'jpg',
        quality: props.quality || 1,
        aspectRatio: props.aspectRatio,
        minBoxWidthRatio: props.minBoxWidthRatio || 0.1,
        minBoxHeightRatio: props.minBoxHeightRatio || 0.1,
        initialBoxWidthRatio: props.initialBoxWidthRatio || 0.5,
        initialBoxHeightRatio: props.initialBoxHeightRatio || 0.5,
        stageLeft: 0,
        stageTop: 0,
        stageWidth: 0,
        stageHeight: 0,
        boxWidth: 0,
        boxHeight: 0,
        boxLeft: 0,
        boxTop: 0,
        canvasWidth: 0,
        canvasHeight: 0,
        scrollTop: 0
      };
      this.$$refs = new _taroWeapp2.default.RefsArray();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fnInit();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.hideBox === this.state.hideBox) {
        return;
      }
      this.setState({
        hideBox: !!nextProps.hideBox
      });
    }
  }, {
    key: "fnInit",
    value: function fnInit() {
      var _this2 = this;

      var _state = this.state,
          imgSrc = _state.imgSrc,
          minBoxWidthRatio = _state.minBoxWidthRatio,
          minBoxHeightRatio = _state.minBoxHeightRatio,
          initialBoxWidthRatio = _state.initialBoxWidthRatio,
          initialBoxHeightRatio = _state.initialBoxHeightRatio,
          aspectRatio = _state.aspectRatio;

      var _self = this;
      _taroWeapp2.default.createSelectorQuery().in(this.$scope).select('.crop-layout').context(function (res) {
        _this2._canvasContext = res.context || _taroWeapp2.default.createCanvasContext('cropCanvas', _this2.$scope);
        _taroWeapp2.default.createSelectorQuery().in(_this2.$scope).select('.crop-layout').boundingClientRect(function (rect) {
          fnLog(rect);
          // const layoutLeft = rect.left;
          // const layoutTop = rect.top;
          var layoutWidth = rect.width;
          var layoutHeight = rect.height;
          fnLog(imgSrc);
          _taroWeapp2.default.getImageInfo({
            src: imgSrc,
            success: function success(imageInfo) {
              fnLog(imageInfo);
              var fileType = imageInfo.type;
              var tempImgSrc = imageInfo.path;
              var imageWidth = imageInfo.width;
              var imageHeight = imageInfo.height;
              var imageWH = imageWidth / imageHeight;
              var stageWidth = 0;
              var stageHeight = 0;
              //stageWidth宽始终是layout的宽度
              stageWidth = layoutWidth;
              stageHeight = layoutWidth / imageWH;
              _self._imageStageRatio = imageHeight / stageHeight;
              var stageLeft = (layoutWidth - stageWidth) / 2;
              var stageTop = (layoutHeight - stageHeight) / 2;
              _self._minBoxWidth = stageWidth * minBoxWidthRatio;
              _self._minBoxHeight = stageHeight * minBoxHeightRatio;
              var boxWidth = stageWidth * initialBoxWidthRatio;
              var boxHeight = stageHeight * initialBoxHeightRatio;
              if (aspectRatio) {
                boxHeight = boxWidth / aspectRatio;
                if (boxHeight > stageHeight) {
                  boxHeight = stageHeight;
                  boxWidth = boxHeight * aspectRatio;
                }
              }
              var boxLeft = (stageWidth - boxWidth) / 2;
              var boxTop = (stageHeight - boxHeight) / 2;
              _self.setState({
                tempImgSrc: tempImgSrc,
                canvasWidth: imageWidth * _self._pixelRatio,
                canvasHeight: imageHeight * _self._pixelRatio,
                stageLeft: stageLeft,
                stageTop: stageTop,
                stageWidth: stageWidth,
                stageHeight: stageHeight,
                boxWidth: boxWidth,
                boxHeight: boxHeight,
                boxLeft: boxLeft,
                boxTop: boxTop,
                outputFileType: _self.props.outputFileType || fileType
              });
            }
          });
        }).exec();
      }).exec();
    }
  }, {
    key: "fnTouchStart",
    value: function fnTouchStart(e) {
      fnLog('start');
      fnLog(e);
      var _self = this;
      var touch = e.touches[0];
      var pageX = touch.pageX;
      var pageY = touch.pageY;
      this._touchStartX = pageX;
      this._touchStartY = pageY;
      this._touchScrollStartY = pageY;
      this._touchStartBoxLeft = _self.state.boxLeft;
      this._touchStartBoxTop = _self.state.boxTop;
      this._touchStartBoxWidth = _self.state.boxWidth;
      this._touchStartBoxHeight = _self.state.boxHeight;
    }
  }, {
    key: "fnTouchMove",
    value: function fnTouchMove(e) {
      var _this3 = this;

      fnLog('move');
      fnLog(e);
      e.stopPropagation();
      var _self = this;
      var _state2 = this.state,
          stageWidth = _state2.stageWidth,
          stageHeight = _state2.stageHeight,
          aspectRatio = _state2.aspectRatio,
          scrollTop = _state2.scrollTop;

      var targetId = e.target.id;
      var touch = e.touches[0];
      var pageX = touch.pageX;
      var pageY = touch.pageY;
      var offsetX = pageX - this._touchStartX;
      var offsetY = pageY - this._touchStartY;
      if (targetId === 'box') {
        var newBoxLeft = this._touchStartBoxLeft + offsetX;
        var newBoxTop = this._touchStartBoxTop + offsetY;
        if (newBoxLeft < 0) {
          newBoxLeft = 0;
        }
        if (newBoxTop < 0) {
          newBoxTop = 0;
        }
        if (newBoxLeft + this._touchStartBoxWidth > stageWidth) {
          newBoxLeft = stageWidth - this._touchStartBoxWidth;
        }
        if (newBoxTop + this._touchStartBoxHeight > stageHeight) {
          newBoxTop = stageHeight - this._touchStartBoxHeight;
        }
        _self.setState({
          boxLeft: newBoxLeft,
          boxTop: newBoxTop
        });
      } else if (targetId === 'lt') {
        if (aspectRatio) {
          offsetY = offsetX / aspectRatio;
        }
        var _newBoxLeft = this._touchStartBoxLeft + offsetX;
        var _newBoxTop = this._touchStartBoxTop + offsetY;
        if (_newBoxLeft < 0) {
          _newBoxLeft = 0;
        }
        if (_newBoxTop < 0) {
          _newBoxTop = 0;
        }
        if (this._touchStartBoxLeft + this._touchStartBoxWidth - _newBoxLeft < this._minBoxWidth) {
          _newBoxLeft = this._touchStartBoxLeft + this._touchStartBoxWidth - this._minBoxWidth;
        }
        if (this._touchStartBoxTop + this._touchStartBoxHeight - _newBoxTop < this._minBoxHeight) {
          _newBoxTop = this._touchStartBoxTop + this._touchStartBoxHeight - this._minBoxHeight;
        }
        var newBoxWidth = this._touchStartBoxWidth - (_newBoxLeft - this._touchStartBoxLeft);
        var newBoxHeight = this._touchStartBoxHeight - (_newBoxTop - this._touchStartBoxTop);
        //约束比例
        if (aspectRatio) {
          if (_newBoxTop === 0 && _newBoxLeft !== 0) {
            newBoxWidth = newBoxHeight * aspectRatio;
            _newBoxLeft = this._touchStartBoxWidth - newBoxWidth + this._touchStartBoxLeft;
          }
          if (_newBoxLeft === 0) {
            newBoxHeight = newBoxWidth / aspectRatio;
            _newBoxTop = this._touchStartBoxHeight - newBoxHeight + this._touchStartBoxTop;
          }
          if (newBoxWidth === this._minBoxWidth) {
            newBoxHeight = newBoxWidth / aspectRatio;
            _newBoxTop = this._touchStartBoxHeight - newBoxHeight + this._touchStartBoxTop;
          }
        }
        _self.setState({
          boxTop: _newBoxTop,
          boxLeft: _newBoxLeft,
          boxWidth: newBoxWidth,
          boxHeight: newBoxHeight
        });
      } else if (targetId === 'rt') {
        if (aspectRatio) {
          offsetY = -offsetX / aspectRatio;
        }
        var _newBoxWidth = this._touchStartBoxWidth + offsetX;
        if (_newBoxWidth < this._minBoxWidth) {
          _newBoxWidth = this._minBoxWidth;
        }
        if (this._touchStartBoxLeft + _newBoxWidth > stageWidth) {
          _newBoxWidth = stageWidth - this._touchStartBoxLeft;
        }
        var _newBoxTop2 = this._touchStartBoxTop + offsetY;
        if (_newBoxTop2 < 0) {
          _newBoxTop2 = 0;
        }
        if (this._touchStartBoxTop + this._touchStartBoxHeight - _newBoxTop2 < this._minBoxHeight) {
          _newBoxTop2 = this._touchStartBoxTop + this._touchStartBoxHeight - this._minBoxHeight;
        }
        var _newBoxHeight = this._touchStartBoxHeight - (_newBoxTop2 - this._touchStartBoxTop);
        //约束比例
        if (aspectRatio) {
          if (_newBoxTop2 === 0 && _newBoxWidth !== stageWidth - this._touchStartBoxLeft) {
            _newBoxWidth = _newBoxHeight * aspectRatio;
          }
          if (_newBoxWidth === stageWidth - this._touchStartBoxLeft) {
            _newBoxHeight = _newBoxWidth / aspectRatio;
            _newBoxTop2 = this._touchStartBoxHeight - _newBoxHeight + this._touchStartBoxTop;
          }
          if (_newBoxWidth === this._minBoxWidth) {
            _newBoxHeight = _newBoxWidth / aspectRatio;
            _newBoxTop2 = this._touchStartBoxHeight - _newBoxHeight + this._touchStartBoxTop;
          }
        }
        _self.setState({
          boxTop: _newBoxTop2,
          boxHeight: _newBoxHeight,
          boxWidth: _newBoxWidth
        });
      } else if (targetId === 'lb') {
        if (aspectRatio) {
          offsetY = -offsetX / aspectRatio;
        }
        var _newBoxLeft2 = this._touchStartBoxLeft + offsetX;
        if (_newBoxLeft2 < 0) {
          _newBoxLeft2 = 0;
        }
        if (this._touchStartBoxLeft + this._touchStartBoxWidth - _newBoxLeft2 < this._minBoxWidth) {
          _newBoxLeft2 = this._touchStartBoxLeft + this._touchStartBoxWidth - this._minBoxWidth;
        }
        var _newBoxWidth2 = this._touchStartBoxWidth - (_newBoxLeft2 - this._touchStartBoxLeft);
        var _newBoxHeight2 = this._touchStartBoxHeight + offsetY;
        if (_newBoxHeight2 < this._minBoxHeight) {
          _newBoxHeight2 = this._minBoxHeight;
        }
        if (this._touchStartBoxTop + _newBoxHeight2 > stageHeight) {
          _newBoxHeight2 = stageHeight - this._touchStartBoxTop;
        }
        //约束比例
        if (aspectRatio) {
          if (_newBoxHeight2 === stageHeight - this._touchStartBoxTop && _newBoxLeft2 !== 0) {
            _newBoxWidth2 = _newBoxHeight2 * aspectRatio;
            _newBoxLeft2 = this._touchStartBoxWidth - _newBoxWidth2 + this._touchStartBoxLeft;
          }
          if (_newBoxLeft2 === 0) {
            _newBoxHeight2 = _newBoxWidth2 / aspectRatio;
          }
          if (_newBoxWidth2 === this._minBoxWidth) {
            _newBoxHeight2 = _newBoxWidth2 / aspectRatio;
          }
        }
        _self.setState({
          boxLeft: _newBoxLeft2,
          boxWidth: _newBoxWidth2,
          boxHeight: _newBoxHeight2
        });
      } else if (targetId === 'rb') {
        if (aspectRatio) {
          offsetY = offsetX / aspectRatio;
        }
        var _newBoxWidth3 = this._touchStartBoxWidth + offsetX;
        if (_newBoxWidth3 < this._minBoxWidth) {
          _newBoxWidth3 = this._minBoxWidth;
        }
        if (this._touchStartBoxLeft + _newBoxWidth3 > stageWidth) {
          _newBoxWidth3 = stageWidth - this._touchStartBoxLeft;
        }
        var _newBoxHeight3 = this._touchStartBoxHeight + offsetY;
        if (_newBoxHeight3 < this._minBoxHeight) {
          _newBoxHeight3 = this._minBoxHeight;
        }
        if (this._touchStartBoxTop + _newBoxHeight3 > stageHeight) {
          _newBoxHeight3 = stageHeight - this._touchStartBoxTop;
        }
        //约束比例
        if (aspectRatio) {
          if (_newBoxHeight3 === stageHeight - this._touchStartBoxTop && _newBoxWidth3 !== stageWidth - this._touchStartBoxLeft) {
            _newBoxWidth3 = _newBoxHeight3 * aspectRatio;
          }
          if (_newBoxWidth3 === stageWidth - this._touchStartBoxLeft) {
            _newBoxHeight3 = _newBoxWidth3 / aspectRatio;
          }
          if (_newBoxWidth3 === this._minBoxWidth) {
            _newBoxHeight3 = _newBoxWidth3 / aspectRatio;
          }
        }
        _self.setState({
          boxWidth: _newBoxWidth3,
          boxHeight: _newBoxHeight3
        });
      } else if (targetId === 'stage') {
        //滚动画布
        var _touch = e.touches[0];
        var _pageY = _touch.pageY;
        var _offsetY = _pageY - this._touchScrollStartY;
        var newScrollTop = scrollTop - _offsetY;
        var minScrollTop = 0;
        var maxScrollTop = stageHeight - stageWidth;
        this.setState({
          scrollTop: newScrollTop < minScrollTop ? minScrollTop : newScrollTop > maxScrollTop ? maxScrollTop : newScrollTop
        }, function () {
          _this3._touchScrollStartY = _pageY;
        });
      }
    }
  }, {
    key: "fnTouchEnd",
    value: function fnTouchEnd(e) {
      e.stopPropagation();
      fnLog('end');
    }
  }, {
    key: "fnTouchCancel",
    value: function fnTouchCancel(e) {
      fnLog('cancel');
      e.stopPropagation();
    }
  }, {
    key: "fnCrop",
    value: function fnCrop(opts) {
      var _self = this;
      var _success = function _success() {};
      var _fail = function _fail() {};
      var _complete = function _complete() {};
      if (opts.success !== null) {
        _success = opts.success;
      }
      if (opts.fail !== null) {
        _fail = opts.fail;
      }
      if (opts.complete !== null) {
        _complete = opts.complete;
      }
      var imagePath = _self.state.tempImgSrc;
      var boxLeft = _self.state.boxLeft;
      var boxTop = _self.state.boxTop;
      var boxWidth = _self.state.boxWidth;
      var boxHeight = _self.state.boxHeight;
      var sx = Math.ceil(boxLeft * this._imageStageRatio);
      var sy = Math.ceil(boxTop * this._imageStageRatio);
      var sWidth = Math.ceil(boxWidth * this._imageStageRatio);
      var sHeight = Math.ceil(boxHeight * this._imageStageRatio);
      var dx = 0;
      var dy = 0;
      var dWidth = Math.ceil(sWidth * this._pixelRatio);
      var dHeight = Math.ceil(sHeight * this._pixelRatio);
      var outputFileType = this.state.outputFileType;
      var quality = this.state.quality;
      fnLog({ imagePath: imagePath, sx: sx, sy: sy, sWidth: sWidth, sHeight: sHeight, dx: dx, dy: dy, dWidth: dWidth, dHeight: dHeight });
      this._canvasContext.drawImage(imagePath, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      this._canvasContext.draw(true, function () {
        _taroWeapp2.default.canvasToTempFilePath({
          x: dx,
          y: dy,
          width: dWidth,
          height: dHeight,
          destWidth: sWidth,
          destHeight: sHeight,
          canvasId: 'cropCanvas',
          fileType: outputFileType,
          quality: quality,
          success: _success,
          fail: _fail,
          complete: _complete
        }, _self.$scope);
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var onCropCallback = this.__props.onCropCallback;
      var _state3 = this.__state,
          imgSrc = _state3.imgSrc,
          stageWidth = _state3.stageWidth,
          stageHeight = _state3.stageHeight,
          stageLeft = _state3.stageLeft,
          stageTop = _state3.stageTop,
          canvasWidth = _state3.canvasWidth,
          canvasHeight = _state3.canvasHeight,
          boxWidth = _state3.boxWidth,
          boxHeight = _state3.boxHeight,
          boxLeft = _state3.boxLeft,
          boxTop = _state3.boxTop,
          hideBox = _state3.hideBox,
          scrollTop = _state3.scrollTop;

      var borderWidth = 2;
      var lTop = { x: (boxLeft + borderWidth) / stageWidth, y: (boxTop + borderWidth) / stageHeight };
      var rTop = { x: (boxLeft + boxWidth - borderWidth) / stageWidth, y: (boxTop + borderWidth) / stageHeight };
      var lBottom = { x: (boxLeft + borderWidth) / stageWidth, y: (boxTop + boxHeight - borderWidth) / stageHeight };
      var rBottom = { x: (boxLeft + boxWidth - borderWidth) / stageWidth, y: (boxTop + boxHeight - borderWidth) / stageHeight };
      var imgStyle = "width:100vw;height:" + 100 / (stageWidth / stageHeight) + "vw;";
      var clipStyle = hideBox ? 'opacity: 0.5;' : "clip-path: polygon(" + lTop.x * 100 + "% " + lTop.y * 100 + "%, " + rTop.x * 100 + "% " + rTop.y * 100 + "%, " + rBottom.x * 100 + "% " + rBottom.y * 100 + "%, " + lBottom.x * 100 + "% " + lBottom.y * 100 + "%);";
      var enterStyle = "display:" + (onCropCallback ? 'block' : 'none');
      var boxHideStyle = "z-index:" + (hideBox ? '-1' : '0');
      var isHeightLarge = stageHeight > stageWidth;
      var imgStyle1 = isHeightLarge ? 'top: 0;' : "top: " + stageTop + "px;";
      fnLog({ stageWidth: stageWidth, stageHeight: stageHeight });
      var anonymousState__temp = (0, _taroWeapp.internal_inline_style)(imgStyle1);
      var anonymousState__temp2 = (0, _taroWeapp.internal_inline_style)(enterStyle);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        clipStyle: clipStyle,
        imgStyle: imgStyle,
        imgStyle1: imgStyle1,
        isHeightLarge: isHeightLarge,
        boxHideStyle: boxHideStyle
      });
      return this.__state;
    }
  }]);

  return Cropper;
}(_taroWeapp2.default.Component);

Cropper.$$events = ["fnTouchStart", "fnTouchMove", "fnTouchEnd", "fnTouchCancel", "onEnterCrop"];
Cropper.$$componentPath = "components/cropper/index";
exports.default = Cropper;

Component(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createComponent(Cropper));

/***/ })

},[["./src/components/cropper/index.tsx","runtime","vendors"]]]);